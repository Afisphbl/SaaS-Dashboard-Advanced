import { supabase } from "./supabase";

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("Data:", data);
  console.log("Error:", error);

  return { data, error };
};
