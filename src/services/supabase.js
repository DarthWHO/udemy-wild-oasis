import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wioeoqkvzdrzynpavdvv.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "sb_publishable_yALyISsHnxd4Hst0FOQnCQ_hz5OpvgZ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
