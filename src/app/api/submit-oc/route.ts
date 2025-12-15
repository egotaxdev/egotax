import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, OCRequest } from '@/lib/supabase';
import { sendTelegramMessage, formatOCRequestMessage } from '@/lib/telegram';
import { notifyNewOCRequest } from '@/lib/push-notifications';

// Force Node.js runtime for better compatibility with external APIs
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Numele și telefonul sunt obligatorii' },
        { status: 400 }
      );
    }

    // Get client info
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    // Prepare data for database
    const ocRequest: OCRequest = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      company_name: body.companyName?.trim() || null,
      services: body.services || [],
      message: body.message?.trim() || null,
      source: 'oc_form',
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
      page_url: body.pageUrl || null,
    };

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('oc_requests')
      .insert([ocRequest])
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
    const telegramMessage = formatOCRequestMessage({
      name: body.name,
      phone: body.phone,
      email: body.email,
      companyName: body.companyName,
      services: body.services || [],
      message: body.message,
      pageUrl: body.pageUrl,
    });

    // Wait for Telegram to complete
    const telegramSent = await sendTelegramMessage({ text: telegramMessage });
    if (!telegramSent) {
      console.error('Telegram notification failed but data was saved');
    }

    // Send push notification to admins (don't wait for it)
    notifyNewOCRequest(body.name, body.services || []).catch(err => {
      console.error('Push notification failed:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Solicitarea a fost trimisă cu succes',
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
