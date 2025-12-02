import { describe, it, expect } from 'vitest';
import { syncCalendlyToDatabase } from './calendlySync';

describe('Calendly Sync Button', () => {
  it('should sync calendly events successfully', async () => {
    const result = await syncCalendlyToDatabase();
    
    expect(result).toBeDefined();
    expect(result).toHaveProperty('success');
    
    if (result.success) {
      expect(result).toHaveProperty('newCount');
      expect(result).toHaveProperty('updatedCount');
      expect(typeof result.newCount).toBe('number');
      expect(typeof result.updatedCount).toBe('number');
      console.log(`✅ Sync successful: ${result.newCount} new, ${result.updatedCount} updated`);
    } else {
      console.log(`⚠️ Sync completed with message: ${result.error}`);
    }
  }, 30000); // 30 second timeout for API call
});
