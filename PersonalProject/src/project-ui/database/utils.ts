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

export const addEvent = async (token: any) => {
  const supabase = await setupSupabase(token);

  // Insert a new event into the Events table
  const { data: Event, error } = await supabase
    .from('Events')
    .upsert({
      title: 'Test Event',
      description: 'This is a test event',
      host: 'Test Host',
    })
    .select();
  
  if (error) console.error(error);

  // Update the joining table with the event ID and user
  await supabase
    .from('EventsUser')
    .upsert({
      event_id: Event![0].id,
      user: 'Test User',
    })
    .select();
};

export const getEvents = async (token: any) => {
  const supabase = await setupSupabase(token);

  // Fetch all events from the Events table
  const { data: events, error } = await supabase
    .from('Events')
    .select('*');

  if (error) console.error(error);

  return events;
};