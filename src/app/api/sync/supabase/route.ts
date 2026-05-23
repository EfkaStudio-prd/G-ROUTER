import { NextResponse } from "next/server";
import { cloudSyncService, type SyncResult } from "@/lib/supabase/syncService";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

const syncActionSchema = z.object({
  action: z.enum(["sync", "fetch", "register-device", "resolve-conflict"]),
  deviceName: z.string().optional(),
  deviceType: z.string().optional(),
  providers: z.record(z.unknown()).optional(),
  combos: z.record(z.unknown()).optional(),
  settings: z.record(z.unknown()).optional(),
  conflictId: z.string().optional(),
  resolution: z.enum(["local", "remote"]).optional(),
});

/**
 * GET /api/sync/supabase
 * Returns current Supabase sync status
 */
export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const conflicts = await cloudSyncService.fetchConflicts();
    return NextResponse.json({
      authenticated: true,
      userId: user.id,
      hasConflicts: conflicts.length > 0,
      conflictCount: conflicts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sync/supabase
 * Handle Supabase sync operations
 */
export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const rawBody = await request.json();
    const validation = syncActionSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { action, deviceName, deviceType, providers, combos, settings, conflictId, resolution } =
      validation.data;

    let result: SyncResult;

    switch (action) {
      case "register-device": {
        if (!deviceName || !deviceType) {
          return NextResponse.json(
            { error: "deviceName and deviceType are required" },
            { status: 400 }
          );
        }
        result = await cloudSyncService.registerDevice(deviceName, deviceType);
        break;
      }

      case "sync": {
        if (!providers || !combos || !settings) {
          return NextResponse.json(
            { error: "providers, combos, and settings are required" },
            { status: 400 }
          );
        }
        result = await cloudSyncService.fullSync(providers, combos, settings);
        break;
      }

      case "fetch": {
        const data = await cloudSyncService.fullFetch();
        return NextResponse.json({ success: true, data });
      }

      case "resolve-conflict": {
        if (!conflictId || !resolution) {
          return NextResponse.json(
            { error: "conflictId and resolution are required" },
            { status: 400 }
          );
        }
        result = await cloudSyncService.resolveConflict(conflictId, resolution);
        break;
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, syncedItems: result.syncedItems });
  } catch (error) {
    console.error("Supabase sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
