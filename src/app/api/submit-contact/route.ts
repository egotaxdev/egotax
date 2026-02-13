import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, ContactRequest } from '@/lib/supabase';
import { sendTelegramMessage, formatContactRequestMessage } from '@/lib/telegram';
import { sendPushNotification } from '@/lib/push';

// Force Node.js runtime for better compatibility with external APIs
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Numele, emailul și mesajul sunt obligatorii' },
        { status: 400 }
      );
    }

    // Get client info
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Prepare data for database
    const contactRequest: ContactRequest = {
      name: body.name.trim(),
      phone: body.phone?.trim() || null,
      email: body.email.trim(),
      company_name: body.companyName?.trim() || null,
      subject: body.subject?.trim() || null,
      message: body.message.trim(),
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
      page_url: body.pageUrl || null,
    };

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_requests')
      .insert([contactRequest])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Eroare la salvarea datelor' },
        { status: 500 }
      );
    }

    // Send Telegram notification
    const telegramMessage = formatContactRequestMessage({
      name: body.name,
      phone: body.phone,
      email: body.email,
      companyName: body.companyName,
      subject: body.subject,
      message: body.message,
      pageUrl: body.pageUrl,
    });

    // Wait for Telegram to complete
    const telegramSent = await sendTelegramMessage({ text: telegramMessage });
    if (!telegramSent) {
      console.error('Telegram notification failed but data was saved');
    }

    // Send push notification
    sendPushNotification({
      title: 'Mesaj nou de contact',
      body: `${body.name} — ${body.subject || body.message?.substring(0, 80) || ''}`,
      tag: 'contact-request',
      url: '/admin',
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: 'Mesajul a fost trimis cu succes',
      id: data.id,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Eroare internă a serverului' },
      { status: 500 }
    );
  }
}
