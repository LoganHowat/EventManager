import { createClient } from '@supabase/supabase-js';
const claimUrl = import.meta.env.VITE_AUTH0_CLAIM_URL;

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

export const addEvent = async (
  token: any,
  title: string,
  description: string,
  user?: any,
) => {
  const supabase = await setupSupabase(token);

  // Insert a new event into the Events table
  const { data: Event, error } = await supabase
    .from('Events')
    .upsert({
      title: title,
      description: description,
      host: user?.[`${claimUrl}/username`],
    })
    .select();
  
  if (error) console.error(error);

  // Update the joining table with the event ID and user
  await supabase
    .from('EventsUser')
    .upsert({
      event_id: Event![0].id,
      username: user?.[`${claimUrl}/username`],
      user_id: user?.sub
    })
    .select();
};

export const getEvents = async (token: any, user?: any, userOnlyEvents: boolean = false) => {
  const supabase = await setupSupabase(token);
  // Fetch all events from the Events table
  if (userOnlyEvents) {
    var { data: events, error } = await supabase
    .from('Events')
    .select('*') // Specify columns to retrieve
    .eq('host', user?.[`${claimUrl}/username`]); // Filter rows;

  } else {
    var { data: events, error } = await supabase
      .from('Events')
      .select('*') // Specify columns to retrieve
      .not('host', 'eq', user?.[`${claimUrl}/username`]) // Filter rows
      .order('created_at', { ascending: false }); // Order by created_at in descending order
  }

  if (error) console.error(error);
  return events;
};