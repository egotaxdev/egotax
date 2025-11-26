import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, CalculatorRequest } from '@/lib/supabase';
import { sendTelegramMessage, formatCalculatorRequestMessage } from '@/lib/telegram';

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
    const calculatorRequest: CalculatorRequest = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      company_name: body.companyName?.trim() || null,
      business_type: body.legalForm || null,
      employee_count: body.employeeCount || 0,
      monthly_operations: body.monthlyOperations || 0,
      has_vat: body.hasVat || false,
      has_foreign_operations: body.hasForeignOperations || false,
      additional_services: body.additionalServices || [],
      estimated_price: body.estimatedPrice || 0,
      message: body.message?.trim() || null,
      status: 'new',
      ip_address: ip,
      user_agent: userAgent,
    };

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('calculator_requests')
      .insert([calculatorRequest])
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
    const telegramMessage = formatCalculatorRequestMessage({
      name: body.name,
      phone: body.phone,
      email: body.email,
      companyName: body.companyName,
      businessType: body.legalFormLabel,
      employeeCount: body.employeeCount,
      monthlyOperations: body.monthlyOperations,
      hasVat: body.hasVat,
      hasForeignOperations: body.hasForeignOperations,
      additionalServices: body.additionalServices,
      estimatedPrice: body.estimatedPrice,
      message: body.message,
    });

    // Don't wait for Telegram, send in background
    sendTelegramMessage({ text: telegramMessage }).catch(err => {
      console.error('Telegram notification failed:', err);
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
