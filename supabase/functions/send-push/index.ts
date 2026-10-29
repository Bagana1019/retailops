// Sends a Web Push message for a newly inserted notification row.
//
// Wire it up as a Database Webhook (Dashboard → Database → Webhooks):
//   table: public.notifications, events: INSERT, type: Supabase Edge Function → send-push
//
// Secrets (supabase secrets set ...):
//   VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY   from `npx web-push generate-vapid-keys`
//   VAPID_SUBJECT                          "mailto:you@example.com"
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are provided automatically.
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3";

const TITLE: Record<string, string> = { task: "Шинэ даалгавар", shift: "Ээлж", schedule: "Хуваарь" };

Deno.serve(async (req) => {
  try {
    const pub = Deno.env.get("VAPID_PUBLIC_KEY"), priv = Deno.env.get("VAPID_PRIVATE_KEY");
    if (!pub || !priv) return new Response("VAPID keys not configured", { status: 500 });
    webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT") ?? "mailto:admin@example.com", pub, priv);

    // Database webhook payload: { type: "INSERT", table, record, ... }
    const body = await req.json();
    const rec = body.record ?? body;
    if (!rec?.user_id || !rec?.message) return new Response("no record", { status: 400 });

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: subs, error } = await admin.from("push_subscriptions").select("id, endpoint, p256dh, auth").eq("user_id", rec.user_id);
    if (error) return new Response(error.message, { status: 500 });

    const payload = JSON.stringify({ title: TITLE[rec.type] ?? "Btech Store", body: rec.message, tag: `notif-${rec.id}`, url: "/" });
    let sent = 0;
    const stale: number[] = [];
    await Promise.all((subs ?? []).map(async (s) => {
      try {
        await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload, { TTL: 60 * 60 });
        sent++;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        if (code === 404 || code === 410) stale.push(s.id); // subscription expired or unsubscribed
      }
    }));
    if (stale.length) await admin.from("push_subscriptions").delete().in("id", stale);
    return new Response(JSON.stringify({ sent, removed: stale.length }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
});
