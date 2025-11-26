-- EgoTax - SQL Schema for Supabase
-- Run this script in Supabase SQL Editor

-- Create enum for request status
CREATE TYPE request_status AS ENUM ('new', 'in_progress', 'completed', 'cancelled');

-- Create enum for request source
CREATE TYPE request_source AS ENUM ('oc_form', 'calculator', 'contact_page', 'other');

-- Main table for OC requests (commercial offers)
CREATE TABLE oc_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact information
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    company_name VARCHAR(255),

    -- Request details
    services TEXT[] DEFAULT '{}',
    message TEXT,

    -- Metadata
    source request_source DEFAULT 'oc_form',
    status request_status DEFAULT 'new',

    -- Additional info
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_url TEXT,

    -- Admin notes
    admin_notes TEXT,
    assigned_to VARCHAR(255)
);

-- Create table for calculator requests
CREATE TABLE calculator_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact information
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    company_name VARCHAR(255),

    -- Calculator data
    business_type VARCHAR(100),
    employee_count INTEGER,
    monthly_operations INTEGER,
    has_vat BOOLEAN DEFAULT FALSE,
    has_foreign_operations BOOLEAN DEFAULT FALSE,
    additional_services TEXT[] DEFAULT '{}',

    -- Calculated price
    estimated_price DECIMAL(10, 2),

    -- Message
    message TEXT,

    -- Metadata
    status request_status DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,

    -- Admin notes
    admin_notes TEXT,
    assigned_to VARCHAR(255)
);

-- Create table for contact form submissions
CREATE TABLE contact_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact information
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),

    -- Message
    subject VARCHAR(255),
    message TEXT NOT NULL,

    -- Metadata
    status request_status DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_url TEXT,

    -- Admin notes
    admin_notes TEXT,
    assigned_to VARCHAR(255)
);

-- Create indexes for better query performance
CREATE INDEX idx_oc_requests_created_at ON oc_requests(created_at DESC);
CREATE INDEX idx_oc_requests_status ON oc_requests(status);
CREATE INDEX idx_oc_requests_phone ON oc_requests(phone);

CREATE INDEX idx_calculator_requests_created_at ON calculator_requests(created_at DESC);
CREATE INDEX idx_calculator_requests_status ON calculator_requests(status);

CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);
CREATE INDEX idx_contact_requests_status ON contact_requests(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_oc_requests_updated_at
    BEFORE UPDATE ON oc_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calculator_requests_updated_at
    BEFORE UPDATE ON calculator_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_requests_updated_at
    BEFORE UPDATE ON contact_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE oc_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for service role (full access)
CREATE POLICY "Service role has full access to oc_requests"
    ON oc_requests
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to calculator_requests"
    ON calculator_requests
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role has full access to contact_requests"
    ON contact_requests
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create view for dashboard statistics
CREATE OR REPLACE VIEW request_statistics AS
SELECT
    'oc_requests' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE status = 'new') as new_count,
    COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d_count
FROM oc_requests
UNION ALL
SELECT
    'calculator_requests' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE status = 'new') as new_count,
    COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d_count
FROM calculator_requests
UNION ALL
SELECT
    'contact_requests' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE status = 'new') as new_count,
    COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d_count
FROM contact_requests;

-- Grant permissions
GRANT ALL ON oc_requests TO service_role;
GRANT ALL ON calculator_requests TO service_role;
GRANT ALL ON contact_requests TO service_role;
GRANT SELECT ON request_statistics TO service_role;
