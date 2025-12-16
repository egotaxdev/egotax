-- Calculator Prices Table
-- Run this in Supabase SQL Editor

-- Drop existing table if needed (uncomment if you want to reset)
-- DROP TABLE IF EXISTS calculator_prices CASCADE;

-- Create table for calculator prices
CREATE TABLE IF NOT EXISTS calculator_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Category of the price (legal_form, activity_type, operations, additional, per_unit, equipment)
  category text NOT NULL,

  -- Key identifier (e.g., 'srl', 'ii', 'it', 'cash_registers')
  key text NOT NULL,

  -- Display label in Romanian
  label text NOT NULL,

  -- Description (optional, for legal forms)
  description text,

  -- Price in MDL
  price integer NOT NULL DEFAULT 0,

  -- Whether this is a per-unit price (for employees, bank accounts, etc.)
  is_per_unit boolean DEFAULT false,

  -- Sort order for display
  sort_order integer DEFAULT 0,

  -- Whether this item is active
  is_active boolean DEFAULT true,

  UNIQUE(category, key)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_calculator_prices_category ON calculator_prices(category);
CREATE INDEX IF NOT EXISTS idx_calculator_prices_active ON calculator_prices(is_active);

-- Enable RLS
ALTER TABLE calculator_prices ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active prices
DROP POLICY IF EXISTS "Allow public read access to calculator prices" ON calculator_prices;
CREATE POLICY "Allow public read access to calculator prices" ON calculator_prices
  FOR SELECT
  USING (is_active = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_calculator_prices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_calculator_prices_updated_at ON calculator_prices;
CREATE TRIGGER trigger_update_calculator_prices_updated_at
  BEFORE UPDATE ON calculator_prices
  FOR EACH ROW
  EXECUTE FUNCTION update_calculator_prices_updated_at();

-- Clear existing data
DELETE FROM calculator_prices;

-- Insert correct prices

-- Legal Forms (base prices)
INSERT INTO calculator_prices (category, key, label, description, price, sort_order) VALUES
  ('legal_form', 'srl', 'SRL', 'Societate cu Răspundere Limitată', 500, 1),
  ('legal_form', 'ii', 'I.I.', 'Întreprinzător Individual', 500, 2),
  ('legal_form', 'ics', 'ICS', 'Întreprindere cu Capital Străin', 1000, 3),
  ('legal_form', 'ao', 'AO', 'Asociație Obștească', 1000, 4),
  ('legal_form', 'sa', 'SA', 'Societate pe Acțiuni', 2500, 5),
  ('legal_form', 'parc-it', 'Parc IT', 'Rezident al Parcului IT', 1000, 6),
  ('legal_form', 'apc', 'APC', 'Asociația de Proprietari', 1000, 7)
ON CONFLICT (category, key) DO UPDATE SET
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sort_order = EXCLUDED.sort_order;

-- Activity Types (each has its own price)
INSERT INTO calculator_prices (category, key, label, price, sort_order) VALUES
  ('activity_type', 'servicii', 'Servicii', 500, 1),
  ('activity_type', 'logistics', 'Logistică/Transport/Expediții', 3000, 2),
  ('activity_type', 'import-export', 'Import/export', 1000, 3),
  ('activity_type', 'trade', 'Comerț', 1000, 4),
  ('activity_type', 'production', 'Producere', 1000, 5),
  ('activity_type', 'construction', 'Construcții', 1000, 6),
  ('activity_type', 'tourism', 'Turism', 2000, 7),
  ('activity_type', 'agriculture', 'Agricultură', 1000, 8),
  ('activity_type', 'horeca', 'Alimentație Publică (HoReCa)', 1500, 9)
ON CONFLICT (category, key) DO UPDATE SET
  label = EXCLUDED.label,
  price = EXCLUDED.price,
  sort_order = EXCLUDED.sort_order;

-- Operations pricing (fixed ranges, not per-10)
-- Key format: operations_min_max
INSERT INTO calculator_prices (category, key, label, price, sort_order) VALUES
  ('operations', '1-10', '1–10 operații', 500, 1),
  ('operations', '11-20', '11–20 operații', 1000, 2),
  ('operations', '21-40', '21–40 operații', 1500, 3),
  ('operations', '41-60', '41–60 operații', 2000, 4),
  ('operations', '61-80', '61–80 operații', 2500, 5),
  ('operations', '81-100', '81–100 operații', 3000, 6),
  ('operations', '101-120', '101–120 operații', 3500, 7),
  ('operations', '121-140', '121–140 operații', 4000, 8)
ON CONFLICT (category, key) DO UPDATE SET
  label = EXCLUDED.label,
  price = EXCLUDED.price,
  sort_order = EXCLUDED.sort_order;

-- Additional parameters (toggles)
INSERT INTO calculator_prices (category, key, label, price, sort_order) VALUES
  ('additional', 'additional_activity', 'Activitate suplimentară', 1000, 1),
  ('additional', 'vat_payer', 'Plătitor TVA', 1000, 2)
ON CONFLICT (category, key) DO UPDATE SET
  label = EXCLUDED.label,
  price = EXCLUDED.price,
  sort_order = EXCLUDED.sort_order;

-- Per-unit prices (employees, bank accounts, etc.)
INSERT INTO calculator_prices (category, key, label, price, is_per_unit, sort_order) VALUES
  ('per_unit', 'employees', 'Angajați', 150, true, 1),
  ('per_unit', 'bank_accounts', 'Conturi bancare', 100, true, 2)
ON CONFLICT (category, key) DO UPDATE SET
  label = EXCLUDED.label,
  price = EXCLUDED.price,
  is_per_unit = EXCLUDED.is_per_unit,
  sort_order = EXCLUDED.sort_order;

-- Equipment prices (per unit)
INSERT INTO calculator_prices (category, key, label, price, is_per_unit, sort_order) VALUES
  ('equipment', 'cash_registers', 'Case de marcat', 300, true, 1),
  ('equipment', 'pos_terminals', 'Terminale POS', 150, true, 2),
  ('equipment', 'vehicles', 'Automobile', 300, true, 3),
  ('equipment', 'individual_rentals', 'Închiriere de la pers. fizice', 100, true, 4),
  ('equipment', 'credits', 'Credite', 250, true, 5),
  ('equipment', 'leasing', 'Leasing', 200, true, 6),
  ('equipment', 'business_trips', 'Delegații', 100, true, 7)
ON CONFLICT (category, key) DO UPDATE SET
  label = EXCLUDED.label,
  price = EXCLUDED.price,
  is_per_unit = EXCLUDED.is_per_unit,
  sort_order = EXCLUDED.sort_order;

-- Grant access
GRANT SELECT ON calculator_prices TO anon;
GRANT SELECT ON calculator_prices TO authenticated;
