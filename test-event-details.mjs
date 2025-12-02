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

async function testEventDetails() {
  console.log('🔍 Analisando detalhes dos eventos ativos\n');
  
  try {
    // Get user
    const userResponse = await calendlyClient.get('/users/me');
    const user = userResponse.data.resource;
    console.log(`👤 Usuário autenticado: ${user.name} (${user.email})\n`);
    
    // Get event types
    const eventTypesResponse = await calendlyClient.get('/event_types', {
      params: { organization: user.current_organization }
    });
    const eventTypes = eventTypesResponse.data.collection;
    
    const targetEventType = eventTypes.find(et => et.scheduling_url === CALENDLY_EVENT_URL);
    if (!targetEventType) {
      console.log(`❌ Tipo de evento não encontrado para: ${CALENDLY_EVENT_URL}`);
      return;
    }
    
    console.log(`📅 Tipo de evento configurado:`);
    console.log(`   Nome: ${targetEventType.name}`);
    console.log(`   URL: ${targetEventType.scheduling_url}`);
    console.log(`   Ativo: ${targetEventType.active}`);
    console.log(`   URI: ${targetEventType.uri}\n`);
    
    // Get active events for this event type
    const eventsResponse = await calendlyClient.get('/scheduled_events', {
      params: {
        organization: user.current_organization,
        event_type: targetEventType.uri,
        status: 'active',
        count: 10,
      }
    });
    
    const events = eventsResponse.data.collection;
    console.log(`📋 Eventos ativos encontrados: ${events.length}\n`);
    
    for (const event of events) {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📌 Evento: ${event.name}`);
      console.log(`   Status: ${event.status}`);
      console.log(`   Início: ${new Date(event.start_time).toLocaleString('pt-BR')}`);
      console.log(`   Fim: ${new Date(event.end_time).toLocaleString('pt-BR')}`);
      console.log(`   URI: ${event.uri}`);
      
      // Get invitees
      try {
        const inviteesResponse = await calendlyClient.get(`${event.uri}/invitees`);
        const invitees = inviteesResponse.data.collection;
        
        console.log(`\n   👥 Participantes (${invitees.length}):`);
        for (const invitee of invitees) {
          console.log(`\n   ┌─ Convidado:`);
          console.log(`   │  Nome: ${invitee.name}`);
          console.log(`   │  Email: ${invitee.email}`);
          console.log(`   │  Status: ${invitee.status}`);
          console.log(`   │  URI: ${invitee.uri}`);
          
          if (invitee.questions_and_answers && invitee.questions_and_answers.length > 0) {
            console.log(`   │  Respostas:`);
            invitee.questions_and_answers.forEach(qa => {
              console.log(`   │    • ${qa.question}: ${qa.answer}`);
            });
          }
          console.log(`   └─`);
        }
      } catch (error) {
        console.log(`   ⚠️  Erro ao buscar participantes: ${error.message}`);
      }
      
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

testEventDetails();
