import { redirect } from "@remix-run/node";
import supabase from "~/config/db";

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
  const respanse = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (respanse.error) {
    return respanse.error.message;
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
