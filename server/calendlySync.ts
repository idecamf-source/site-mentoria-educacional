import { getDb } from "./db";
import { appointments } from "../drizzle/schema";
import { syncCalendlyEvents } from "./calendly";
import { eq } from "drizzle-orm";
import { addAttendanceToSheet } from "./googleSheets";

/**
 * Sync Calendly events to database
 * Creates new appointment records for events that don't exist yet
 */
export async function syncCalendlyToDatabase() {
  try {
    console.log('[Calendly Sync] Starting sync...');
    
    const db = await getDb();
    if (!db) {
      console.warn('[Calendly Sync] Database not available');
      return { success: false, error: 'Database not available' };
    }
    
    // Get events from now onwards
    const eventsWithInvitees = await syncCalendlyEvents();
    
    let newCount = 0;
    let updatedCount = 0;
    
    for (const { event, invitees } of eventsWithInvitees) {
      // Check if event already exists
      const existing = await db
        .select()
        .from(appointments)
        .where(eq(appointments.calendlyEventUri, event.uri))
        .limit(1);
      
      if (existing.length === 0 && invitees.length > 0) {
        // Create new appointment for each invitee
        const invitee = invitees[0]; // Usually one invitee per event
        
        // Get next appointment number - count all existing appointments
        const allAppointments = await db.select().from(appointments);
        const nextNumber = allAppointments.length + 1;
        
        await db.insert(appointments).values({
          userName: invitee.name,
          userEmail: invitee.email,
          scheduledAt: new Date(event.start_time),
          status: event.status === 'active' ? 'confirmed' : 'cancelled',
          source: 'calendly',
          calendlyEventUri: event.uri,
          calendlyInviteeUri: invitee.uri,
          calendlyStatus: event.status,
          calendlyStartTime: new Date(event.start_time),
          calendlyEndTime: new Date(event.end_time),
        });
        
        // Sync to Google Sheets
        try {
          // Extract course, semester and student notes from questions if available
          let course = 'Não informado';
          let semester = 'Não informado';
          let studentInfo = '';
          
          if (invitee.questions_and_answers) {
            const courseAnswer = invitee.questions_and_answers.find(
              qa => qa.question.toLowerCase().includes('curso')
            );
            const semesterAnswer = invitee.questions_and_answers.find(
              qa => qa.question.toLowerCase().includes('semestre')
            );
            // Get the last question (usually the open-ended one with student notes)
            const notesAnswer = invitee.questions_and_answers.find(
              qa => !qa.question.toLowerCase().includes('curso') && 
                    !qa.question.toLowerCase().includes('semestre') &&
                    !qa.question.toLowerCase().includes('telefone')
            );
            
            if (courseAnswer) course = courseAnswer.answer;
            if (semesterAnswer) semester = semesterAnswer.answer;
            if (notesAnswer) studentInfo = notesAnswer.answer;
          }
          
          await addAttendanceToSheet({
            attendanceNumber: nextNumber,
            attendanceDate: new Date(event.start_time),
            studentName: invitee.name,
            course,
            semester,
            studentInfo, // Observações do aluno do formulário
            observedAspects: `Agendamento via Calendly - Email: ${invitee.email}`,
            directivesTaken: null,
          });
          
          console.log(`[Calendly Sync] Added to Google Sheets: ${invitee.name}`);
        } catch (sheetsError) {
          console.error(`[Calendly Sync] Failed to sync to Google Sheets:`, sheetsError);
        }
        
        newCount++;
        console.log(`[Calendly Sync] Created appointment for ${invitee.name} at ${event.start_time}`);
      } else if (existing.length > 0) {
        // Update existing appointment status if changed
        const existingAppointment = existing[0];
        const newStatus = event.status === 'active' ? 'confirmed' : 'cancelled';
        
        if (existingAppointment.status !== newStatus) {
          await db
            .update(appointments)
            .set({
              status: newStatus,
              calendlyStatus: event.status,
            })
            .where(eq(appointments.id, existingAppointment.id));
          
          updatedCount++;
          console.log(`[Calendly Sync] Updated appointment ${existingAppointment.id} status to ${newStatus}`);
        }
      }
    }
    
    console.log(`[Calendly Sync] Complete: ${newCount} new, ${updatedCount} updated`);
    
    return {
      success: true,
      newCount,
      updatedCount,
      totalEvents: eventsWithInvitees.length,
    };
  } catch (error: any) {
    console.error('[Calendly Sync] Error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Start periodic sync (every 5 minutes)
 */
export function startCalendlySync() {
  // Run immediately
  syncCalendlyToDatabase();
  
  // Then run every 2 minutes
  const interval = setInterval(() => {
    syncCalendlyToDatabase();
  }, 2 * 60 * 1000); // 2 minutes
  
  console.log('[Calendly Sync] Periodic sync started (every 2 minutes)');
  
  return interval;
}
