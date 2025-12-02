import axios from 'axios';

const CALENDLY_API_BASE = 'https://api.calendly.com';
const CALENDLY_API_TOKEN = process.env.CALENDLY_API_TOKEN;
const CALENDLY_EVENT_URL = process.env.CALENDLY_EVENT_URL;

if (!CALENDLY_API_TOKEN) {
  throw new Error('CALENDLY_API_TOKEN is not configured');
}

if (!CALENDLY_EVENT_URL) {
  throw new Error('CALENDLY_EVENT_URL is not configured');
}

const calendlyClient = axios.create({
  baseURL: CALENDLY_API_BASE,
  headers: {
    'Authorization': `Bearer ${CALENDLY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface CalendlyEvent {
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  event_type: string;
  location: {
    type: string;
    location?: string;
  };
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
}

export interface CalendlyInvitee {
  uri: string;
  email: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  event: string;
  questions_and_answers: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Get current user information
 */
export async function getCurrentUser() {
  try {
    const response = await calendlyClient.get('/users/me');
    return response.data.resource;
  } catch (error: any) {
    console.error('Error fetching Calendly user:', error.response?.data || error.message);
    throw new Error('Failed to fetch Calendly user');
  }
}

/**
 * Get event type URI from event URL
 */
async function getEventTypeUri(): Promise<string> {
  try {
    const user = await getCurrentUser();
    const response = await calendlyClient.get('/event_types', {
      params: {
        organization: user.current_organization,
      },
    });
    
    const eventTypes = response.data.collection;
    const eventType = eventTypes.find((et: any) => 
      et.scheduling_url === CALENDLY_EVENT_URL
    );
    
    if (!eventType) {
      throw new Error(`Event type not found for URL: ${CALENDLY_EVENT_URL}`);
    }
    
    return eventType.uri;
  } catch (error: any) {
    console.error('Error fetching event type:', error.response?.data || error.message);
    throw new Error('Failed to fetch event type');
  }
}

/**
 * Get scheduled events for the configured event type
 */
export async function getScheduledEvents(params?: {
  minStartTime?: string;
  maxStartTime?: string;
  count?: number;
}): Promise<CalendlyEvent[]> {
  try {
    const user = await getCurrentUser();
    const eventTypeUri = await getEventTypeUri();
    
    const response = await calendlyClient.get('/scheduled_events', {
      params: {
        organization: user.current_organization,
        event_type: eventTypeUri,
        min_start_time: params?.minStartTime,
        max_start_time: params?.maxStartTime,
        count: params?.count || 100,
        status: 'active',
      },
    });
    
    return response.data.collection;
  } catch (error: any) {
    console.error('Error fetching scheduled events:', error.response?.data || error.message);
    throw new Error('Failed to fetch scheduled events');
  }
}

/**
 * Get invitee information for a specific event
 */
export async function getEventInvitees(eventUri: string): Promise<CalendlyInvitee[]> {
  try {
    const response = await calendlyClient.get(`${eventUri}/invitees`);
    return response.data.collection;
  } catch (error: any) {
    console.error('Error fetching event invitees:', error.response?.data || error.message);
    throw new Error('Failed to fetch event invitees');
  }
}

/**
 * Sync Calendly events to database
 * Returns array of events with invitee information
 */
export async function syncCalendlyEvents(minStartTime?: string) {
  try {
    const events = await getScheduledEvents({
      minStartTime: minStartTime || new Date().toISOString(),
    });
    
    const eventsWithInvitees = await Promise.all(
      events.map(async (event) => {
        const invitees = await getEventInvitees(event.uri);
        return {
          event,
          invitees,
        };
      })
    );
    
    return eventsWithInvitees;
  } catch (error: any) {
    console.error('Error syncing Calendly events:', error.message);
    throw error;
  }
}
