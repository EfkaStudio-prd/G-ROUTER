import { supabase, type Database } from "./client";
import type { User } from "@clerk/nextjs/server";

export interface SyncResult {
  success: boolean;
  error?: string;
  syncedItems?: number;
}

export interface SyncConflict {
  id: string;
  conflictType: string;
  entityId: string;
  localData: Record<string, unknown>;
  remoteData: Record<string, unknown>;
}

export class CloudSyncService {
  private userId: string | null = null;

  constructor() {
    this.initializeUserId();
  }

  private async initializeUserId(): Promise<void> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        this.userId = user.id;
      }
    } catch (error) {
      console.error("Failed to initialize user ID:", error);
    }
  }

  private ensureUserId(): string {
    if (!this.userId) {
      throw new Error("User not authenticated. Cloud sync requires authentication.");
    }
    return this.userId;
  }

  async registerDevice(deviceName: string, deviceType: string): Promise<SyncResult> {
    try {
      const userId = this.ensureUserId();
      const { error } = await supabase.from("devices").upsert(
        {
          user_id: userId,
          device_name: deviceName,
          device_type: deviceType,
          last_synced_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,device_name",
        }
      );

      if (error) throw error;
      return { success: true, syncedItems: 1 };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async syncProviders(providers: Record<string, unknown>): Promise<SyncResult> {
    try {
      const userId = this.ensureUserId();
      let syncedCount = 0;

      for (const [providerId, providerData] of Object.entries(providers)) {
        const { error } = await supabase.from("synced_providers").upsert(
          {
            user_id: userId,
            provider_id: providerId,
            provider_data: providerData as Record<string, unknown>,
            is_encrypted: true,
          },
          {
            onConflict: "user_id,provider_id",
          }
        );

        if (error) throw error;
        syncedCount++;
      }

      return { success: true, syncedItems: syncedCount };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async syncCombos(combos: Record<string, unknown>): Promise<SyncResult> {
    try {
      const userId = this.ensureUserId();
      let syncedCount = 0;

      for (const [comboId, comboData] of Object.entries(combos)) {
        const { error } = await supabase.from("synced_combos").upsert(
          {
            user_id: userId,
            combo_id: comboId,
            combo_data: comboData as Record<string, unknown>,
          },
          {
            onConflict: "user_id,combo_id",
          }
        );

        if (error) throw error;
        syncedCount++;
      }

      return { success: true, syncedItems: syncedCount };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async syncSettings(settings: Record<string, unknown>): Promise<SyncResult> {
    try {
      const userId = this.ensureUserId();
      let syncedCount = 0;

      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase.from("synced_settings").upsert(
          {
            user_id: userId,
            settings_key: key,
            settings_value: value as Record<string, unknown>,
          },
          {
            onConflict: "user_id,settings_key",
          }
        );

        if (error) throw error;
        syncedCount++;
      }

      return { success: true, syncedItems: syncedCount };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async syncAnalytics(
    period: "daily" | "weekly" | "monthly",
    periodStart: Date,
    analyticsData: Record<string, unknown>
  ): Promise<SyncResult> {
    try {
      const userId = this.ensureUserId();
      const { error } = await supabase.from("synced_analytics").upsert(
        {
          user_id: userId,
          period,
          period_start: periodStart.toISOString(),
          analytics_data: analyticsData,
        },
        {
          onConflict: "user_id,period,period_start",
        }
      );

      if (error) throw error;
      return { success: true, syncedItems: 1 };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async fetchProviders(): Promise<Record<string, unknown>> {
    try {
      const userId = this.ensureUserId();
      const { data, error } = await supabase
        .from("synced_providers")
        .select("provider_id, provider_data")
        .eq("user_id", userId);

      if (error) throw error;

      const providers: Record<string, unknown> = {};
      for (const item of data || []) {
        providers[item.provider_id] = item.provider_data;
      }
      return providers;
    } catch (error) {
      console.error("Failed to fetch providers:", error);
      return {};
    }
  }

  async fetchCombos(): Promise<Record<string, unknown>> {
    try {
      const userId = this.ensureUserId();
      const { data, error } = await supabase
        .from("synced_combos")
        .select("combo_id, combo_data")
        .eq("user_id", userId);

      if (error) throw error;

      const combos: Record<string, unknown> = {};
      for (const item of data || []) {
        combos[item.combo_id] = item.combo_data;
      }
      return combos;
    } catch (error) {
      console.error("Failed to fetch combos:", error);
      return {};
    }
  }

  async fetchSettings(): Promise<Record<string, unknown>> {
    try {
      const userId = this.ensureUserId();
      const { data, error } = await supabase
        .from("synced_settings")
        .select("settings_key, settings_value")
        .eq("user_id", userId);

      if (error) throw error;

      const settings: Record<string, unknown> = {};
      for (const item of data || []) {
        settings[item.settings_key] = item.settings_value;
      }
      return settings;
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      return {};
    }
  }

  async fetchConflicts(): Promise<SyncConflict[]> {
    try {
      const userId = this.ensureUserId();
      const { data, error } = await supabase
        .from("sync_conflicts")
        .select("*")
        .eq("user_id", userId)
        .eq("resolved", false);

      if (error) throw error;

      return (data || []).map((conflict) => ({
        id: conflict.id,
        conflictType: conflict.conflict_type,
        entityId: conflict.entity_id,
        localData: conflict.local_data as Record<string, unknown>,
        remoteData: conflict.remote_data as Record<string, unknown>,
      }));
    } catch (error) {
      console.error("Failed to fetch conflicts:", error);
      return [];
    }
  }

  async resolveConflict(conflictId: string, resolution: "local" | "remote"): Promise<SyncResult> {
    try {
      const userId = this.ensureUserId();
      const { error } = await supabase
        .from("sync_conflicts")
        .update({
          resolved: true,
          resolved_at: new Date().toISOString(),
        })
        .eq("id", conflictId)
        .eq("user_id", userId);

      if (error) throw error;
      return { success: true, syncedItems: 1 };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async fullSync(
    providers: Record<string, unknown>,
    combos: Record<string, unknown>,
    settings: Record<string, unknown>
  ): Promise<SyncResult> {
    try {
      const results = await Promise.all([
        this.syncProviders(providers),
        this.syncCombos(combos),
        this.syncSettings(settings),
      ]);

      const failed = results.filter((r) => !r.success);
      if (failed.length > 0) {
        return {
          success: false,
          error: `Failed to sync ${failed.length} items: ${failed.map((f) => f.error).join(", ")}`,
        };
      }

      const totalSynced = results.reduce((sum, r) => sum + (r.syncedItems || 0), 0);
      return { success: true, syncedItems: totalSynced };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  async fullFetch(): Promise<{
    providers: Record<string, unknown>;
    combos: Record<string, unknown>;
    settings: Record<string, unknown>;
  }> {
    const [providers, combos, settings] = await Promise.all([
      this.fetchProviders(),
      this.fetchCombos(),
      this.fetchSettings(),
    ]);

    return { providers, combos, settings };
  }
}

export const cloudSyncService = new CloudSyncService();
