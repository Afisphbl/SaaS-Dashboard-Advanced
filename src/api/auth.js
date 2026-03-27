import { supabase } from "./supabase";

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const googleSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  return { data, error };
};

export const githubSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  return { data, error };
};
