import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

// Verify admin token
function verifyToken(request: NextRequest): { userId: string; role: string } | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.slice(7);
    const data = JSON.parse(Buffer.from(token, 'base64').toString());
    if (data.exp < Date.now()) return null;
    return { userId: data.userId, role: data.role };
  } catch {
    return null;
  }
}

// GET - Fetch all prices (admin only for full list including inactive)
export async function GET(request: NextRequest) {
  const auth = verifyToken(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('calculator_prices')
      .select('*')
      .order('category')
      .order('sort_order');

    if (error) throw error;

    // Group by category
    const grouped = (data || []).reduce((acc: Record<string, typeof data>, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    return NextResponse.json({ prices: data, grouped });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 });
  }
}

// PUT - Update a price
export async function PUT(request: NextRequest) {
  const auth = verifyToken(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, price, label, description, is_active, sort_order } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (price !== undefined) updates.price = price;
    if (label !== undefined) updates.label = label;
    if (description !== undefined) updates.description = description;
    if (is_active !== undefined) updates.is_active = is_active;
    if (sort_order !== undefined) updates.sort_order = sort_order;

    const { error } = await supabaseAdmin
      .from('calculator_prices')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating price:', error);
    return NextResponse.json({ error: 'Failed to update price' }, { status: 500 });
  }
}

// POST - Create a new price item
export async function POST(request: NextRequest) {
  const auth = verifyToken(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { category, key, label, description, price, is_per_unit, sort_order } = await request.json();

    if (!category || !key || !label || price === undefined) {
      return NextResponse.json({ error: 'Category, key, label and price are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('calculator_prices')
      .insert({
        category,
        key,
        label,
        description,
        price,
        is_per_unit: is_per_unit || false,
        sort_order: sort_order || 0,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, price: data });
  } catch (error) {
    console.error('Error creating price:', error);
    return NextResponse.json({ error: 'Failed to create price' }, { status: 500 });
  }
}

// DELETE - Delete a price item
export async function DELETE(request: NextRequest) {
  const auth = verifyToken(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Price ID required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('calculator_prices')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting price:', error);
    return NextResponse.json({ error: 'Failed to delete price' }, { status: 500 });
  }
}
