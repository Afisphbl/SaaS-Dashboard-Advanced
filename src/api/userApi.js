import { supabase } from './supabaseClient';

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const uploadAvatar = async (userId, file) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/avatar-${Math.random()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return data.publicUrl;
};

// Admin Functions
export const getAllUsers = async (page = 1, limit = 10, search = '') => {
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' });

  if (search) {
    query = query.ilike('email', `%${search}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return { users: data, total: count };
};

export const deleteUser = async (userId) => {
  // Edge function or RPC needed if deleting auth via profiles is restricted
  // Here we just delete profile for demonstration. Real deletion often needs elevated roles.
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) throw error;
  return true;
};
