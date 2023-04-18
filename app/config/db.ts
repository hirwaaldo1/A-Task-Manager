import { createServerClient } from "@supabase/auth-helpers-remix";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseKey);

export async function connectDb(obj: any) {
  const supabaseServer = await createServerClient(
    supabaseUrl,
    supabaseKey,
    obj
  );
  return supabaseServer;
}
