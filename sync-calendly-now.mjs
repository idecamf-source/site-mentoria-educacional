import { syncCalendlyToDatabase } from './server/calendlySync.ts';

console.log('🔄 Iniciando sincronização manual com Calendly...');

try {
  await syncCalendlyToDatabase();
  console.log('✅ Sincronização concluída com sucesso!');
  process.exit(0);
} catch (error) {
  console.error('❌ Erro na sincronização:', error);
  process.exit(1);
}
