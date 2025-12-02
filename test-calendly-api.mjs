import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CALENDLY_API_BASE = 'https://api.calendly.com';
const CALENDLY_API_TOKEN = process.env.CALENDLY_API_TOKEN;
const CALENDLY_EVENT_URL = process.env.CALENDLY_EVENT_URL;

const calendlyClient = axios.create({
  baseURL: CALENDLY_API_BASE,
  headers: {
    'Authorization': `Bearer ${CALENDLY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function testCalendlyAPI() {
  console.log('🔍 Testando API do Calendly...\n');
  
  try {
    // 1. Get current user
    console.log('1️⃣ Buscando informações do usuário...');
    const userResponse = await calendlyClient.get('/users/me');
    const user = userResponse.data.resource;
    console.log(`✅ Usuário: ${user.name} (${user.email})`);
    console.log(`   URI: ${user.uri}\n`);
    
    // 2. Get event types
    console.log('2️⃣ Buscando tipos de eventos...');
    const eventTypesResponse = await calendlyClient.get('/event_types', {
      params: { user: user.uri }
    });
    const eventTypes = eventTypesResponse.data.collection;
    console.log(`✅ Encontrados ${eventTypes.length} tipos de eventos:`);
    eventTypes.forEach(et => {
      console.log(`   - ${et.name}`);
      console.log(`     URL: ${et.scheduling_url}`);
      console.log(`     URI: ${et.uri}`);
    });
    
    const eventType = eventTypes.find(et => et.scheduling_url === CALENDLY_EVENT_URL);
    if (!eventType) {
      console.log(`\n❌ ERRO: Nenhum tipo de evento encontrado para URL: ${CALENDLY_EVENT_URL}`);
      return;
    }
    console.log(`\n✅ Tipo de evento configurado encontrado: ${eventType.name}\n`);
    
    // 3. Get scheduled events - últimos 30 dias
    console.log('3️⃣ Buscando eventos agendados (últimos 30 dias)...');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const eventsResponse = await calendlyClient.get('/scheduled_events', {
      params: {
        user: user.uri,
        event_type: eventType.uri,
        min_start_time: thirtyDaysAgo.toISOString(),
        count: 100,
      }
    });
    
    const events = eventsResponse.data.collection;
    console.log(`✅ Encontrados ${events.length} eventos agendados:\n`);
    
    if (events.length === 0) {
      console.log('⚠️  Nenhum evento encontrado nos últimos 30 dias.');
      console.log('   Verifique se você realmente criou agendamentos através do link:');
      console.log(`   ${CALENDLY_EVENT_URL}\n`);
    } else {
      for (const event of events) {
        console.log(`📅 Evento: ${event.name}`);
        console.log(`   Status: ${event.status}`);
        console.log(`   Início: ${new Date(event.start_time).toLocaleString('pt-BR')}`);
        console.log(`   Fim: ${new Date(event.end_time).toLocaleString('pt-BR')}`);
        console.log(`   URI: ${event.uri}`);
        
        // Get invitees for this event
        try {
          const inviteesResponse = await calendlyClient.get(`${event.uri}/invitees`);
          const invitees = inviteesResponse.data.collection;
          console.log(`   Participantes: ${invitees.length}`);
          invitees.forEach(inv => {
            console.log(`     - ${inv.name} (${inv.email}) - Status: ${inv.status}`);
          });
        } catch (error) {
          console.log(`   ⚠️  Erro ao buscar participantes: ${error.message}`);
        }
        console.log('');
      }
    }
    
    // 4. Test with different date ranges
    console.log('4️⃣ Testando diferentes intervalos de data...\n');
    
    // Próximos 30 dias
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const futureEventsResponse = await calendlyClient.get('/scheduled_events', {
      params: {
        user: user.uri,
        event_type: eventType.uri,
        min_start_time: new Date().toISOString(),
        max_start_time: futureDate.toISOString(),
        count: 100,
      }
    });
    console.log(`   Eventos futuros (próximos 30 dias): ${futureEventsResponse.data.collection.length}`);
    
    // Todos os eventos (sem filtro de data)
    const allEventsResponse = await calendlyClient.get('/scheduled_events', {
      params: {
        user: user.uri,
        event_type: eventType.uri,
        count: 100,
      }
    });
    console.log(`   Todos os eventos (sem filtro): ${allEventsResponse.data.collection.length}`);
    
  } catch (error) {
    console.error('\n❌ Erro ao testar API:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error('\n⚠️  Token de autenticação inválido ou expirado!');
    }
  }
}

testCalendlyAPI();
