import { createClient } from "@supabase/supabase-js";

// Your Supabase project URL
const supabaseUrl = "https://kbnyyfneoocolgyrdevd.supabase.co";

// Your Publishable / anon key (safe for frontend)
const supabaseAnonKey = "sb_publishable_2uN-AiV9KNDgwmKnItDbeA_B8HHx1zq";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
