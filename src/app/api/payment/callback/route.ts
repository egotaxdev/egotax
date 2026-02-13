import { NextRequest, NextResponse } from 'next/server';
import { verifySignature } from '@/lib/maib';
import { supabaseAdmin } from '@/lib/supabase';
import { sendTelegramMessage } from '@/lib/telegram';
import { sendPushNotification } from '@/lib/push';
import { sendPaymentSuccessEmail } from '@/lib/resend';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface MaibCallbackResult {
  payId: string;
  orderId: string;
  status: 'OK' | 'FAILED' | 'CREATED' | 'PENDING' | 'DECLINED' | 'TIMEOUT';
  statusCode: string;
  statusMessage: string;
  threeDs?: string;
  rrn?: string;
  approval?: string;
  cardNumber?: string;
  amount: number;
  currency: string;
  billerId?: string;
  billerExpiry?: string;
}

interface MaibCallback {
  result: MaibCallbackResult;
  signature: string;
}

const statusEmoji: Record<string, string> = {
  OK: '✅',
  FAILED: '❌',
  CREATED: '🔄',
  PENDING: '⏳',
  DECLINED: '🚫',
  TIMEOUT: '⏰',
};

const statusText: Record<string, string> = {
  OK: 'Plată reușită',
  FAILED: 'Plată eșuată',
  CREATED: 'În așteptare',
  PENDING: 'În procesare',
  DECLINED: 'Refuzată',
  TIMEOUT: 'Expirată',
};

/**
 * Verify maib callback signature
 */
function verifyMaibSignature(result: MaibCallbackResult, signature: string): boolean {
  const signatureKey = process.env.MAIB_SIGNATURE_KEY;

  if (!signatureKey) {
    console.warn('MAIB_SIGNATURE_KEY not set, skipping signature verification');
    return true; // Skip verification if no key (for testing)
  }

  // Sort keys alphabetically and get values
  const sortedKeys = Object.keys(result).sort() as (keyof MaibCallbackResult)[];
  const values: (string | number)[] = [];

  for (const key of sortedKeys) {
    const value = result[key];
    if (value !== undefined && value !== null) {
      values.push(value);
    }
  }

  // Add signature key to the end
  values.push(signatureKey);

  // Join with colons
  const signString = values.join(':');

  // Generate hash (SHA256 in binary, then base64)
  const hash = crypto.createHash('sha256').update(signString).digest('base64');

  return hash === signature;
}

export async function POST(request: NextRequest) {
  try {
    const body: MaibCallback = await request.json();
    const { result, signature } = body;

    console.log('Received maib callback:', JSON.stringify(body, null, 2));

    // Verify signature
    if (!verifyMaibSignature(result, signature)) {
      console.error('Invalid signature for callback:', result.payId);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      );
    }

    // Map maib status to our status
    const statusMap: Record<string, string> = {
      OK: 'ok',
      FAILED: 'failed',
      CREATED: 'created',
      PENDING: 'pending',
      DECLINED: 'declined',
      TIMEOUT: 'timeout',
    };

    const dbStatus = statusMap[result.status] || 'failed';

    // Update transaction in database
    const { error: dbError } = await supabaseAdmin
      .from('payment_transactions')
      .update({
        status: dbStatus,
        status_code: result.statusCode,
        status_message: result.statusMessage,
        card_number: result.cardNumber,
        rrn: result.rrn,
        approval: result.approval,
        three_ds: result.threeDs,
        callback_received_at: new Date().toISOString(),
      })
      .eq('pay_id', result.payId);

    if (dbError) {
      console.error('Database update error:', dbError);
    }

    // Get transaction details for notification
    const { data: transaction } = await supabaseAdmin
      .from('payment_transactions')
      .select('*')
      .eq('pay_id', result.payId)
      .single();

    // Send email notification on successful payment
    if (result.status === 'OK' && transaction?.client_email) {
      await sendPaymentSuccessEmail({
        to: transaction.client_email,
        clientName: transaction.client_name || 'Client',
        amount: result.amount,
        currency: result.currency,
        orderId: result.orderId,
        serviceType: transaction.service_type || 'other',
        paymentDate: new Date(),
        cardNumber: result.cardNumber,
      }).catch(err => console.error('Failed to send payment email:', err));
    }

    // Send Telegram notification
    const emoji = statusEmoji[result.status] || '❓';
    const statusDescription = statusText[result.status] || result.status;

    await sendTelegramMessage({
      text: `${emoji} <b>Actualizare plată</b>\n\n` +
        `📊 <b>Status:</b> ${statusDescription}\n` +
        `💰 <b>Sumă:</b> ${result.amount} ${result.currency}\n` +
        `🔖 <b>Order ID:</b> <code>${result.orderId}</code>\n` +
        `🆔 <b>Pay ID:</b> <code>${result.payId}</code>\n` +
        (result.cardNumber ? `💳 <b>Card:</b> ${result.cardNumber}\n` : '') +
        (result.rrn ? `🔢 <b>RRN:</b> ${result.rrn}\n` : '') +
        (result.approval ? `✓ <b>Approval:</b> ${result.approval}\n` : '') +
        (result.threeDs ? `🔐 <b>3DS:</b> ${result.threeDs}\n` : '') +
        (result.statusMessage ? `📝 <b>Mesaj:</b> ${result.statusMessage}\n` : '') +
        (transaction?.service_type ? `📋 <b>Serviciu:</b> ${transaction.service_type}\n` : '') +
        (transaction?.client_name ? `👤 <b>Client:</b> ${transaction.client_name}\n` : '') +
        (transaction?.client_email ? `📧 <b>Email:</b> ${transaction.client_email}\n` : '') +
        (transaction?.client_phone ? `📞 <b>Telefon:</b> ${transaction.client_phone}\n` : '') +
        `\n⏰ ${new Date().toLocaleString('ro-MD', { timeZone: 'Europe/Chisinau' })}`,
      parse_mode: 'HTML',
    }).catch(console.error);

    // Send push notification
    const pushStatusText = statusText[result.status] || result.status;
    sendPushNotification({
      title: `Plată: ${pushStatusText}`,
      body: `${result.amount} ${result.currency} — ${result.orderId}`,
      tag: `payment-${result.payId}`,
      url: '/admin',
    }).catch(console.error);

    // Return 200 OK to acknowledge receipt
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Callback processing error:', error);
    // Still return 200 to prevent maib from retrying
    // Log the error for investigation
    return NextResponse.json({ ok: true, error: 'Processing error logged' });
  }
}
