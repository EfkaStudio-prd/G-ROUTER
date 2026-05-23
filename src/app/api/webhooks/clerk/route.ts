import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { supabase } from "@/lib/supabase/client";

const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!clerkWebhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(clerkWebhookSecret);
  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = evt.type;
  const { data } = evt;

  try {
    switch (eventType) {
      case "user.created": {
        // Create user in Supabase
        const { error } = await supabase.from("users").insert({
          clerk_user_id: data.id,
          email: data.email_addresses?.[0]?.email_address || null,
        });

        if (error) throw error;
        break;
      }

      case "user.updated": {
        // Update user in Supabase
        const { error } = await supabase
          .from("users")
          .update({
            email: data.email_addresses?.[0]?.email_address || null,
          })
          .eq("clerk_user_id", data.id);

        if (error) throw error;
        break;
      }

      case "user.deleted": {
        // Delete user and all their data from Supabase
        const { error } = await supabase.from("users").delete().eq("clerk_user_id", data.id);

        if (error) throw error;
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
