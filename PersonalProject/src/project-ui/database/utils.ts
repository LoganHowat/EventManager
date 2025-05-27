import { createClient } from '@supabase/supabase-js';

const setupSupabase = async (token: any) => {;

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  return supabase;
};

// Usage example
export const addEvent = async (token: any) => {
  const supabase = await setupSupabase(token);

  const { data: Event, error } = await supabase
    .from('Events')
    .upsert({
      title: 'Test Event',
      description: 'This is a test event',
      host: 'Test Host',
    })
    .select();

  if (error) console.error(error);
  console.log(Event);
};