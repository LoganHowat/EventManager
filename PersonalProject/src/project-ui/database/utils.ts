import { createClient } from '@supabase/supabase-js';


if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_KEY) {
	throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
}

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const upsertUser = async (userEmail: string,) => {
	const { data: User } = await supabase
  .from('User')
  .upsert({ email: userEmail })
  .select()

  return User;
}