import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAccessToken, getProxyOptions } from '@/lib/maib';
import { sendTelegramMessage } from '@/lib/telegram';
import { sendPushNotification } from '@/lib/push';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAIB_API_URL = 'https://api.maibmerchants.md/v1';

interface SessionData {
  userId: string;
  username: string;
  role: string;
  exp: number;
}

function verifyToken(request: NextRequest): SessionData | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.substring(7);
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString()) as SessionData;

    if (decoded.exp < Date.now()) return null;

    return decoded;
  } catch {
    return null;
  }
}

interface RefundResponse {
  result?: {
    payId: string;
    orderId: string;
    status: string;
    statusCode: string;
    statusMessage: string;
    refundAmount: number;
  };
  ok: boolean;
  errors?: Array<{
    errorCode: string;
    errorMessage: string;
  }>;
}

export async function POST(request: NextRequest) {
  const session = verifyToken(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payId, amount } = await request.json();

    if (!payId) {
      return NextResponse.json({ error: 'payId is required' }, { status: 400 });
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Build refund payload
    const payload: { payId: string; refundAmount?: number } = { payId };
    if (amount && amount > 0) {
      payload.refundAmount = Number(amount.toFixed(2));
    }

    // Call maib refund API
    const response = await fetch(`${MAIB_API_URL}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      ...getProxyOptions(),
    });

    const data: RefundResponse = await response.json();

    if (!data.ok || !data.result) {
      const errorMessage = data.errors?.[0]?.errorMessage || 'Refund failed';
      console.error('maib refund error:', data.errors);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Update transaction status in database
    const { error: dbError } = await supabaseAdmin
      .from('payment_transactions')
      .update({
        status: 'refunded',
        admin_notes: `Refund: ${data.result.refundAmount} MDL by ${session.username} at ${new Date().toISOString()}`,
      })
      .eq('pay_id', payId);

    if (dbError) {
      console.error('Database update error:', dbError);
    }

    // Send Telegram notification
    sendTelegramMessage({
      text: `🔄 <b>Returnare efectuată</b>\n\n` +
        `🔖 <b>Order ID:</b> <code>${data.result.orderId}</code>\n` +
        `🆔 <b>Pay ID:</b> <code>${payId}</code>\n` +
        `💰 <b>Sumă returnată:</b> ${data.result.refundAmount} MDL\n` +
        `📋 <b>Status:</b> ${data.result.status}\n` +
        `👤 <b>Admin:</b> ${session.username}\n` +
        `\n⏰ ${new Date().toLocaleString('ro-MD', { timeZone: 'Europe/Chisinau' })}`,
      parse_mode: 'HTML',
    }).catch(console.error);

    // Send push notification
    sendPushNotification({
      title: 'Returnare efectuată',
      body: `${data.result.refundAmount} MDL — ${data.result.orderId}`,
      tag: 'refund',
      url: '/admin',
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      refundAmount: data.result.refundAmount,
      orderId: data.result.orderId,
    });

  } catch (error) {
    console.error('Refund error:', error);
    return NextResponse.json({ error: 'Refund processing failed' }, { status: 500 });
  }
}
