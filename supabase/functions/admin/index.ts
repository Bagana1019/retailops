// Admin operations that need the service-role key and therefore cannot run in the browser:
// creating a login for an employee, resetting someone's password, deleting an employee.
// Deploy with:  supabase functions deploy admin
//
// The caller must be signed in. Directors may do everything; Managers may only create
// Employee-role accounts (matching what the UI lets them do).
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Who is calling? Validate the user's JWT with the anon client.
    const authHeader = req.headers.get("Authorization") ?? "";
    const caller = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: userErr } = await caller.auth.getUser();
    if (userErr || !user) return json({ error: "Нэвтрээгүй байна" }, 401);

    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data: me } = await admin.from("profiles").select("role, active").eq("id", user.id).single();
    if (!me?.active) return json({ error: "Бүртгэл идэвхгүй" }, 403);
    const isDirector = me.role === "Director";
    const isManager = isDirector || me.role === "Manager";
    if (!isManager) return json({ error: "Эрх хүрэхгүй" }, 403);

    const body = await req.json();
    switch (body.action) {
      case "create_user": {
        const { email, password, profile } = body;
        if (!email || !password || !profile?.username || !profile?.name) return json({ error: "Дутуу мэдээлэл" }, 400);
        if (password.length < 4) return json({ error: "Нууц үг хамгийн багадаа 4 тэмдэгт" }, 400);
        const role = isDirector ? (profile.role ?? "Employee") : "Employee";
        const { data, error } = await admin.auth.admin.createUser({
          email, password, email_confirm: true,
          user_metadata: { username: profile.username, name: profile.name, phone: profile.phone ?? "", contact_email: profile.email ?? "", position: profile.position ?? "", joined: profile.joined ?? "", role, active: true },
        });
        if (error) return json({ error: error.message }, 400);
        return json({ id: data.user.id });
      }
      case "reset_password": {
        if (!isDirector) return json({ error: "Зөвхөн Дээд Админ" }, 403);
        const { userId, password } = body;
        if (!userId || !password || password.length < 4) return json({ error: "Нууц үг хамгийн багадаа 4 тэмдэгт" }, 400);
        const { error } = await admin.auth.admin.updateUserById(userId, { password });
        if (error) return json({ error: error.message }, 400);
        return json({ ok: true });
      }
      case "delete_user": {
        if (!isDirector) return json({ error: "Зөвхөн Дээд Админ" }, 403);
        const { userId } = body;
        if (!userId || userId === user.id) return json({ error: "Өөрийгөө устгах боломжгүй" }, 400);
        // profiles / attendance / shifts cascade from auth.users; tasks are set to unassigned by FK.
        const { error } = await admin.auth.admin.deleteUser(userId);
        if (error) return json({ error: error.message }, 400);
        return json({ ok: true });
      }
      default:
        return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
