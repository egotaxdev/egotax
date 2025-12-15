-- Create payment_transactions table for maib e-commerce integration
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Order identification
  order_id TEXT NOT NULL UNIQUE,
  pay_id TEXT UNIQUE,

  -- Service info
  service_type TEXT NOT NULL CHECK (service_type IN ('contabilitate', 'consultanta', 'instruire')),

  -- Amount
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'MDL',
  description TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'ok', 'failed', 'declined', 'timeout', 'refunded')),
  status_code TEXT,
  status_message TEXT,

  -- Client info
  client_ip TEXT,
  company_name TEXT,
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,

  -- Payment details (from maib callback)
  card_number TEXT,
  rrn TEXT,
  approval TEXT,
  three_ds TEXT,

  -- Timestamps
  callback_received_at TIMESTAMPTZ,

  -- Admin
  admin_notes TEXT
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id ON payment_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_pay_id ON payment_transactions(pay_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at ON payment_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_service_type ON payment_transactions(service_type);

-- Enable RLS (Row Level Security)
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (full access)
CREATE POLICY "Service role has full access" ON payment_transactions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_payment_transactions_updated_at
  BEFORE UPDATE ON payment_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON payment_transactions TO service_role;
GRANT SELECT ON payment_transactions TO anon;
