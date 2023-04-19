import { redirect } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
) {
  const respanse = await supabase.auth.signUp({
    phone: name,
    email: email,
    password: password,
  });
  if (respanse.error) {
    return respanse.error.message;
  }
  return redirect("/");
}

export async function signInWithEmail(email: string, password: string) {
  const {
    error,
    data: { session },
  } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return error.message;
  }
  if (session) {
    await supabase.auth.setSession({
      refresh_token: session.refresh_token,
      access_token: session.access_token,
    });
  }
  return redirect("/dashboard");
}

export async function signOut() {
  const respanse = await supabase.auth.signOut();
  if (respanse.error) {
    return respanse.error.message;
  }
  return redirect("/");
}

export async function signInWithPlatform(
  provider: "github" | "google" | "discord"
) {
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });
  if (error) {
    throw error.message;
  }
  return redirect(data.url);
}

export async function checkAuth() {
  const user = await supabase.auth.getUser();
  console.log(user, "user ------------");
}
