import { useSyncExternalStore } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { createLocalStore } from "./localStore";
import { createSupabaseStore } from "./supabaseStore";

// One store for the whole app: Supabase when configured, otherwise the in-browser demo.
export const store = isSupabaseConfigured ? createSupabaseStore(supabase) : createLocalStore();

export const useStore = () => useSyncExternalStore(store.subscribe, store.getState);
