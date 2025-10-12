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

export const upsertEvent = async (
  token: any,
  title: string,
  description: string,
  user?: any,
  eventId?: string,
) => {
  const supabase = await setupSupabase(token);

  // Upsert event into the Events table
  const { data: Event, error } = await supabase
    .from('Events')
    .upsert({
      id: eventId,
      title: title,
      description: description,
      host: user?.[`${claimUrl}/username`],
    })
    .select();
  
  if (error) console.error(error);

  if (!eventId) {
    // Update the joining table with the event ID and user if the event is new
    await supabase
    .from('EventsUser')
    .upsert({
      event_id: Event![0].id,
      username: user?.[`${claimUrl}/username`],
      user_id: user?.sub
    })
  }

  // Return ID on new event creation
  return(Event![0]);


}

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