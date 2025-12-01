import { describe, it, expect } from 'vitest';
import { syncCalendlyToDatabase } from './calendlySync';
import { getDb } from './db';
import { appointments } from '../drizzle/schema';

describe('Calendly Integration - Full Sync', () => {
  it('should sync Calendly events to database', async () => {
    const result = await syncCalendlyToDatabase();
    
    expect(result.success).toBe(true);
    console.log('✓ Sync result:', result);
    
    // Verify appointments were created/updated in database
    const db = await getDb();
    if (db) {
      const allAppointments = await db.select().from(appointments);
      console.log(`✓ Total appointments in database: ${allAppointments.length}`);
      
      const calendlyAppointments = allAppointments.filter(
        (apt) => apt.source === 'calendly'
      );
      console.log(`✓ Calendly appointments: ${calendlyAppointments.length}`);
      
      if (calendlyAppointments.length > 0) {
        const firstAppointment = calendlyAppointments[0];
        expect(firstAppointment.calendlyEventUri).toBeDefined();
        expect(firstAppointment.userName).toBeDefined();
        expect(firstAppointment.userEmail).toBeDefined();
        console.log('✓ First Calendly appointment:', {
          name: firstAppointment.userName,
          email: firstAppointment.userEmail,
          date: firstAppointment.calendlyStartTime,
          status: firstAppointment.status,
        });
      }
    }
  }, 60000);
});
