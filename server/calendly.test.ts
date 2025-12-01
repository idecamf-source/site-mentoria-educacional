import { describe, it, expect } from 'vitest';
import { getCurrentUser, getScheduledEvents } from './calendly';

describe('Calendly API Integration', () => {
  it('should successfully authenticate and fetch current user', async () => {
    const user = await getCurrentUser();
    
    expect(user).toBeDefined();
    expect(user.uri).toBeDefined();
    expect(user.email).toBeDefined();
    console.log('✓ Calendly user authenticated:', user.email);
  }, 30000);

  it('should fetch scheduled events', async () => {
    const events = await getScheduledEvents({
      count: 5,
    });
    
    expect(Array.isArray(events)).toBe(true);
    console.log(`✓ Found ${events.length} scheduled events`);
    
    if (events.length > 0) {
      const firstEvent = events[0];
      expect(firstEvent.uri).toBeDefined();
      expect(firstEvent.start_time).toBeDefined();
      expect(firstEvent.status).toBe('active');
      console.log('✓ First event:', {
        start_time: firstEvent.start_time,
        status: firstEvent.status,
      });
    }
  }, 30000);
});
