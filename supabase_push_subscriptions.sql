-- Push Subscriptions table for Web Push notifications
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup of active subscriptions
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_active ON push_subscriptions (is_active) WHERE is_active = true;

-- Index for user lookup
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user ON push_subscriptions (admin_user_id);

-- Enable RLS
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: service role can do everything
CREATE POLICY "Service role full access" ON push_subscriptions
  FOR ALL USING (true) WITH CHECK (true);
