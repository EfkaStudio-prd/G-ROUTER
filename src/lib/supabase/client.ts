import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key not configured. Cloud sync will be disabled.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      devices: {
        Row: {
          id: string;
          user_id: string;
          device_name: string;
          device_type: string;
          last_synced_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          device_name: string;
          device_type: string;
          last_synced_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          device_name?: string;
          device_type?: string;
          last_synced_at?: string;
          created_at?: string;
        };
      };
      synced_providers: {
        Row: {
          id: string;
          user_id: string;
          provider_id: string;
          provider_data: Record<string, unknown>;
          is_encrypted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider_id: string;
          provider_data: Record<string, unknown>;
          is_encrypted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider_id?: string;
          provider_data?: Record<string, unknown>;
          is_encrypted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      synced_combos: {
        Row: {
          id: string;
          user_id: string;
          combo_id: string;
          combo_data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          combo_id: string;
          combo_data: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          combo_id?: string;
          combo_data?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      synced_settings: {
        Row: {
          id: string;
          user_id: string;
          settings_key: string;
          settings_value: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          settings_key: string;
          settings_value: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          settings_key?: string;
          settings_value?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      synced_analytics: {
        Row: {
          id: string;
          user_id: string;
          period: string;
          period_start: string;
          analytics_data: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          period: string;
          period_start: string;
          analytics_data: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          period?: string;
          period_start?: string;
          analytics_data?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      sync_conflicts: {
        Row: {
          id: string;
          user_id: string;
          conflict_type: string;
          entity_id: string;
          local_data: Record<string, unknown>;
          remote_data: Record<string, unknown>;
          resolved: boolean;
          created_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          conflict_type: string;
          entity_id: string;
          local_data: Record<string, unknown>;
          remote_data: Record<string, unknown>;
          resolved?: boolean;
          created_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          conflict_type?: string;
          entity_id?: string;
          local_data?: Record<string, unknown>;
          remote_data?: Record<string, unknown>;
          resolved?: boolean;
          created_at?: string;
          resolved_at?: string | null;
        };
      };
    };
  };
};
