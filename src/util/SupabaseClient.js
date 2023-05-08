import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const options = {
  db: { schema: "properties" },
};

export const supabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  options
);
