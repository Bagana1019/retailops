import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);
export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

// Supabase Auth needs an e-mail; staff sign in with a short username, so we map it onto a fixed domain.
export const AUTH_EMAIL_DOMAIN = import.meta.env.VITE_AUTH_EMAIL_DOMAIN || "btech.local";
export const usernameToEmail = (id) => (id.includes("@") ? id.trim() : `${id.trim().toLowerCase()}@${AUTH_EMAIL_DOMAIN}`);
