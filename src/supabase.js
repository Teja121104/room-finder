import { createClient } from "@supabase/supabase-js";

// Your Supabase project URL
const supabaseUrl = "https://zwmabpoglsjnmblckdkv.supabase.co";

// Your Publishable / anon key (safe for frontend)
const supabaseAnonKey = "sb_publishable_Sk6wLQEAauEQxAxn7C4qWQ_O_7s5JTz";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
