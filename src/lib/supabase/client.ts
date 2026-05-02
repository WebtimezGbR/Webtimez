import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Im Build (z. B. Cloudflare ohne Env-Vars) nur warnen statt crashen.
  // Zur Laufzeit schlagen die API-Calls dann mit einer klaren Fehlermeldung fehl.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase-Umgebungsvariablen fehlen. NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY müssen gesetzt sein."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
