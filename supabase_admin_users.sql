-- Create admin_users table for admin panel authentication
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,

  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'viewer')),

  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,

  -- Permissions
  can_view_transactions BOOLEAN DEFAULT true,
  can_refund BOOLEAN DEFAULT true,
  can_view_requests BOOLEAN DEFAULT true,
  can_manage_users BOOLEAN DEFAULT false
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for service role only (no public access)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_users' AND policyname = 'Service role has full access to admin_users') THEN
    CREATE POLICY "Service role has full access to admin_users" ON admin_users
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Trigger for updated_at (reuse existing function or create it)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
    CREATE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $func$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $func$ language 'plpgsql';
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (service role only, no anon access)
GRANT ALL ON admin_users TO service_role;

-- =====================================================
-- PUSH SUBSCRIPTIONS TABLE
-- For Web Push Notifications
-- =====================================================

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON push_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);

-- Enable RLS
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy for service role only
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'push_subscriptions' AND policyname = 'Service role has full access to push_subscriptions') THEN
    CREATE POLICY "Service role has full access to push_subscriptions" ON push_subscriptions
      FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_push_subscriptions_updated_at ON push_subscriptions;
CREATE TRIGGER update_push_subscriptions_updated_at
  BEFORE UPDATE ON push_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON push_subscriptions TO service_role;

-- =====================================================
-- ENABLE REALTIME FOR TABLES
-- This allows live updates without polling
-- =====================================================

-- Enable realtime for requests tables (ignore errors if already added)
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE oc_requests;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE calculator_requests;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE contact_requests;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE payment_transactions;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- =====================================================
-- SETUP INSTRUCTIONS:
--
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Go to: https://your-site.com/admin/setup
-- 3. Create your first admin user through the web form
--
-- For Push Notifications:
-- 4. Generate VAPID keys: npx web-push generate-vapid-keys
-- 5. Add to .env.local:
--    NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
--    VAPID_PRIVATE_KEY=your_private_key
--    VAPID_SUBJECT=mailto:your@email.com
--
-- That's it! No manual password hashing needed.
-- =====================================================
