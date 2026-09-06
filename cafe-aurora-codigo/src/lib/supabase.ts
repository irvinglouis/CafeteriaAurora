import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const MISSING_SUPABASE_ENV = "MISSING_SUPABASE_ENV";

let client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(MISSING_SUPABASE_ENV);
  }

  client = createClient<Database>(url, anonKey);
  return client;
}

export function isMissingSupabaseEnv(error: unknown): boolean {
  return error instanceof Error && error.message === MISSING_SUPABASE_ENV;
}
