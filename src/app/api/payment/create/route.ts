import { NextRequest, NextResponse } from 'next/server';
import { createPayment } from '@/lib/maib';
import { supabaseAdmin } from '@/lib/supabase';
import { sendTelegramMessage } from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface PaymentRequest {
  service: 'contabilitate' | 'consultanta' | 'instruire';
  amount: number;
  description?: string;
  companyName?: string;
  clientName?: string;
  email?: string;
  phone?: string;
}

const serviceNames: Record<string, string> = {
  contabilitate: 'Servicii contabilitate',
  consultanta: 'Servicii consultanță',
  instruire: 'Servicii instruire',
};

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    const { service, amount, description, companyName, clientName, email, phone } = body;

    // Validation
    if (!service || !['contabilitate', 'consultanta', 'instruire'].includes(service)) {
      return NextResponse.json(
        { error: 'Serviciu invalid' },
        { status: 400 }
      );
    }

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Suma trebuie să fie cel puțin 1 MDL' },
        { status: 400 }
      );
    }

    if (amount > 100000) {
      return NextResponse.json(
        { error: 'Suma maximă este 100,000 MDL' },
        { status: 400 }
      );
    }

    // Get client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Generate unique order ID
    const orderId = `EGO-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Build URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://egotax.md';
    const okUrl = `${baseUrl}/plata-online/succes`;
    const failUrl = `${baseUrl}/plata-online/esuat`;
    const callbackUrl = `${baseUrl}/api/payment/callback`;

    // Create payment in maib
    const paymentDescription = description || `${serviceNames[service]} - EgoTax`;
    const fullClientName = companyName && clientName
      ? `${companyName} (${clientName})`.substring(0, 128)
      : companyName
        ? companyName.substring(0, 128)
        : clientName
          ? clientName.substring(0, 128)
          : undefined;

    const maibResponse = await createPayment({
      amount: Number(amount.toFixed(2)),
      currency: 'MDL',
      clientIp,
      language: 'ro',
      description: paymentDescription.substring(0, 124), // maib limit
      clientName: fullClientName || undefined,
      email: email ? email.substring(0, 40) : undefined,
      phone: phone ? phone.substring(0, 40) : undefined,
      orderId,
      items: [
        {
          id: service,
          name: serviceNames[service],
          price: Number(amount.toFixed(2)),
          quantity: 1,
        },
      ],
      callbackUrl,
      okUrl,
      failUrl,
    });

    if (!maibResponse.ok || !maibResponse.result) {
      const errorMessage = maibResponse.errors?.[0]?.errorMessage || 'Eroare la crearea plății';
      console.error('maib payment error:', maibResponse.errors);
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    // Save transaction to database
    const { error: dbError } = await supabaseAdmin
      .from('payment_transactions')
      .insert({
        order_id: orderId,
        pay_id: maibResponse.result.payId,
        service_type: service,
        amount: Number(amount.toFixed(2)),
        currency: 'MDL',
        description: paymentDescription,
        status: 'created',
        client_ip: clientIp,
        client_name: clientName,
        client_email: email,
        client_phone: phone,
        company_name: companyName,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Don't fail the request, payment was already created in maib
    }

    // Send Telegram notification (async, don't wait)
    sendTelegramMessage({
      text: `💳 <b>Nouă plată inițiată</b>\n\n` +
        `📋 <b>Serviciu:</b> ${serviceNames[service]}\n` +
        `💰 <b>Sumă:</b> ${amount} MDL\n` +
        `📝 <b>Descriere:</b> ${paymentDescription}\n` +
        `🔖 <b>Order ID:</b> <code>${orderId}</code>\n` +
        `🆔 <b>Pay ID:</b> <code>${maibResponse.result.payId}</code>\n` +
        (companyName ? `🏢 <b>Companie:</b> ${companyName}\n` : '') +
        (clientName ? `👤 <b>Client:</b> ${clientName}\n` : '') +
        (email ? `📧 <b>Email:</b> ${email}\n` : '') +
        (phone ? `📞 <b>Telefon:</b> ${phone}\n` : '') +
        `\n⏰ ${new Date().toLocaleString('ro-MD', { timeZone: 'Europe/Chisinau' })}`,
      parse_mode: 'HTML',
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      orderId,
      payId: maibResponse.result.payId,
      paymentUrl: maibResponse.result.payUrl,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Eroare la crearea plății. Vă rugăm să încercați din nou.' },
      { status: 500 }
    );
  }
}
