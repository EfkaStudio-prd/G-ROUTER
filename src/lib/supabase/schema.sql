-- Supabase Database Schema for Golden Router Cloud Sync
-- This schema enables syncing providers, combos, settings, and analytics across devices

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (linked to Clerk auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Devices table (track user devices)
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(255) NOT NULL,
  device_type VARCHAR(50) NOT NULL, -- 'desktop', 'laptop', 'mobile', 'server'
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, device_name)
);

-- Providers sync table
CREATE TABLE IF NOT EXISTS synced_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id VARCHAR(255) NOT NULL,
  provider_data JSONB NOT NULL, -- encrypted provider configuration
  is_encrypted BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, provider_id)
);

-- Combos sync table
CREATE TABLE IF NOT EXISTS synced_combos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  combo_id VARCHAR(255) NOT NULL,
  combo_data JSONB NOT NULL, -- combo configuration
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, combo_id)
);

-- Settings sync table
CREATE TABLE IF NOT EXISTS synced_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  settings_key VARCHAR(255) NOT NULL,
  settings_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, settings_key)
);

-- Usage analytics sync table
CREATE TABLE IF NOT EXISTS synced_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  period VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  analytics_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, period, period_start)
);

-- Sync conflicts table
CREATE TABLE IF NOT EXISTS sync_conflicts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conflict_type VARCHAR(50) NOT NULL, -- 'provider', 'combo', 'settings'
  entity_id VARCHAR(255) NOT NULL,
  local_data JSONB NOT NULL,
  remote_data JSONB NOT NULL,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_devices_user_id ON devices(user_id);
CREATE INDEX IF NOT EXISTS idx_synced_providers_user_id ON synced_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_synced_combos_user_id ON synced_combos(user_id);
CREATE INDEX IF NOT EXISTS idx_synced_settings_user_id ON synced_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_synced_analytics_user_id ON synced_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_conflicts_user_id ON sync_conflicts(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_conflicts_resolved ON sync_conflicts(resolved);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE synced_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE synced_combos ENABLE ROW LEVEL SECURITY;
ALTER TABLE synced_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE synced_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_conflicts ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (clerk_user_id = auth.uid()::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (clerk_user_id = auth.uid()::text);

CREATE POLICY "Devices can view own data" ON devices FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Devices can insert own data" ON devices FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Devices can update own data" ON devices FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Providers can view own data" ON synced_providers FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Providers can insert own data" ON synced_providers FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Providers can update own data" ON synced_providers FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Providers can delete own data" ON synced_providers FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Combos can view own data" ON synced_combos FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Combos can insert own data" ON synced_combos FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Combos can update own data" ON synced_combos FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Combos can delete own data" ON synced_combos FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Settings can view own data" ON synced_settings FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Settings can insert own data" ON synced_settings FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Settings can update own data" ON synced_settings FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Settings can delete own data" ON synced_settings FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Analytics can view own data" ON synced_analytics FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Analytics can insert own data" ON synced_analytics FOR INSERT WITH CHECK (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Analytics can update own data" ON synced_analytics FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Analytics can delete own data" ON synced_analytics FOR DELETE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Conflicts can view own data" ON sync_conflicts FOR SELECT USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));
CREATE POLICY "Conflicts can update own data" ON sync_conflicts FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.uid()::text));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_synced_providers_updated_at BEFORE UPDATE ON synced_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_synced_combos_updated_at BEFORE UPDATE ON synced_combos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_synced_settings_updated_at BEFORE UPDATE ON synced_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_synced_analytics_updated_at BEFORE UPDATE ON synced_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
