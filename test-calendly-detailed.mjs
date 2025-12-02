import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CALENDLY_API_BASE = 'https://api.calendly.com';
const CALENDLY_API_TOKEN = process.env.CALENDLY_API_TOKEN;

const calendlyClient = axios.create({
  baseURL: CALENDLY_API_BASE,
  headers: {
    'Authorization': `Bearer ${CALENDLY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function testDetailedAPI() {
  console.log('🔍 Teste detalhado da API do Calendly\n');
  
  try {
    // Get user
    const userResponse = await calendlyClient.get('/users/me');
    const user = userResponse.data.resource;
    console.log(`✅ Usuário: ${user.name}`);
    console.log(`   Organization: ${user.current_organization}\n`);
    
    // Test 1: Get ALL scheduled events without filters
    console.log('📋 Teste 1: Todos os eventos agendados (sem filtros)');
    try {
      const allEvents = await calendlyClient.get('/scheduled_events', {
        params: {
          organization: user.current_organization,
          count: 100,
        }
      });
      console.log(`   Resultado: ${allEvents.data.collection.length} eventos`);
      if (allEvents.data.collection.length > 0) {
        allEvents.data.collection.forEach((evt, idx) => {
          console.log(`   ${idx + 1}. ${evt.name} - ${new Date(evt.start_time).toLocaleString('pt-BR')} - Status: ${evt.status}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Erro: ${error.response?.data?.message || error.message}`);
    }
    console.log('');
    
    // Test 2: Get events by user
    console.log('📋 Teste 2: Eventos por usuário');
    try {
      const userEvents = await calendlyClient.get('/scheduled_events', {
        params: {
          user: user.uri,
          count: 100,
        }
      });
      console.log(`   Resultado: ${userEvents.data.collection.length} eventos`);
      if (userEvents.data.collection.length > 0) {
        userEvents.data.collection.forEach((evt, idx) => {
          console.log(`   ${idx + 1}. ${evt.name} - ${new Date(evt.start_time).toLocaleString('pt-BR')} - Status: ${evt.status}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Erro: ${error.response?.data?.message || error.message}`);
    }
    console.log('');
    
    // Test 3: Get events for today
    console.log('📋 Teste 3: Eventos de hoje');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    try {
      const todayEvents = await calendlyClient.get('/scheduled_events', {
        params: {
          organization: user.current_organization,
          min_start_time: today.toISOString(),
          max_start_time: tomorrow.toISOString(),
          count: 100,
        }
      });
      console.log(`   Resultado: ${todayEvents.data.collection.length} eventos`);
      if (todayEvents.data.collection.length > 0) {
        todayEvents.data.collection.forEach((evt, idx) => {
          console.log(`   ${idx + 1}. ${evt.name} - ${new Date(evt.start_time).toLocaleString('pt-BR')} - Status: ${evt.status}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Erro: ${error.response?.data?.message || error.message}`);
    }
    console.log('');
    
    // Test 4: List event types
    console.log('📋 Teste 4: Tipos de eventos disponíveis');
    try {
      const eventTypes = await calendlyClient.get('/event_types', {
        params: {
          organization: user.current_organization,
        }
      });
      console.log(`   Resultado: ${eventTypes.data.collection.length} tipos`);
      eventTypes.data.collection.forEach((et, idx) => {
        console.log(`   ${idx + 1}. ${et.name}`);
        console.log(`      URL: ${et.scheduling_url}`);
        console.log(`      Active: ${et.active}`);
      });
    } catch (error) {
      console.log(`   ❌ Erro: ${error.response?.data?.message || error.message}`);
    }
    console.log('');
    
    // Test 5: Check organization events
    console.log('📋 Teste 5: Eventos da organização (últimos 7 dias)');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    try {
      const orgEvents = await calendlyClient.get('/scheduled_events', {
        params: {
          organization: user.current_organization,
          min_start_time: sevenDaysAgo.toISOString(),
          count: 100,
        }
      });
      console.log(`   Resultado: ${orgEvents.data.collection.length} eventos`);
      if (orgEvents.data.collection.length > 0) {
        orgEvents.data.collection.forEach((evt, idx) => {
          console.log(`   ${idx + 1}. ${evt.name} - ${new Date(evt.start_time).toLocaleString('pt-BR')}`);
          console.log(`      Status: ${evt.status}`);
          console.log(`      Event Type: ${evt.event_type}`);
          console.log(`      URI: ${evt.uri}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Erro: ${error.response?.data?.message || error.message}`);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.response?.data || error.message);
  }
}

testDetailedAPI();
