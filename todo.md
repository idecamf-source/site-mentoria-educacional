# Project TODO

## Funcionalidades Implementadas
- [x] Landing page básica com Hero, Pilares e Mentora
- [x] Navegação e Footer
- [x] Integração visual com identidade da marca
- [x] Upgrade para web-db-user (backend + banco de dados)

## Funcionalidades a Implementar
- [x] Definir esquema do banco de dados (agendamentos, estatísticas, KPIs)
- [x] Migrar banco de dados
- [x] Criar procedures tRPC para agendamentos
- [x] Criar procedures tRPC para estatísticas e KPIs
- [x] Implementar rastreamento de eventos no frontend
- [x] Criar painel administrativo (Dashboard)
- [x] Implementar visualizações de KPIs com gráficos
- [x] Adicionar filtros e tabelas de dados
- [x] Testar fluxo completo de agendamento
- [x] Testar dashboard administrativo

## Correções Pendentes
- [x] Corrigir visualização do logo no footer (remover filtros CSS que tornam invisível)

## Atualizações de Conteúdo
- [x] Substituir foto da mentora Patrícia por nova imagem

## Sistema de Registro de Atendimentos
- [x] Atualizar esquema do banco de dados com tabela de atendimentos detalhados
- [x] Criar formulário de registro de atendimento para a mentora
- [x] Implementar listagem de atendimentos no dashboard
- [x] Adicionar funcionalidade de exportação para Excel (.xlsx)
- [x] Testar fluxo completo de registro e exportação

## Integração com Google Sheets
- [x] Acessar e analisar estrutura da planilha do usuário
- [x] Configurar Google Sheets API no backend
- [x] Implementar função de sincronização automática
- [x] Adicionar sincronização ao criar novo atendimento
- [x] Testar integração completa

## Atualização de Logo
- [x] Substituir logo por versão sem fundo em todos os componentes

## Reestruturação de Navegação e Disponibilidade
- [x] Remover botão "Sobre a Mentoria" do menu
- [x] Remover botão "Saiba Mais" da hero section
- [x] Destacar botão "Agendar Mentoria" na hero
- [x] Criar componente de Disponibilidade com cards de horários
- [x] Adicionar seção "Disponibilidade" ao menu de navegação
- [x] Integrar Disponibilidade na Home

## Ajustes de Layout
- [x] Centralizar últimos 2 cards de Disponibilidade
- [x] Centralizar cards de Pilares

## Integração com Calendly API
- [x] Configurar token de API do Calendly como secret
- [x] Criar módulo de integração com Calendly API
- [x] Implementar função para buscar agendamentos
- [x] Criar job de sincronização automática
- [x] Atualizar tabela de atendimentos para incluir agendamentos do Calendly
- [x] Atualizar interface de Atendimentos para exibir status
- [x] Testar sincronização completa

## Atualização de Link do Calendly
- [x] Link revertido para mentoriaeducacional/30min (aguardando token correto da conta prof-patriciadias)

## Botão de Sincronização Manual
- [x] Criar endpoint tRPC para sincronização manual do Calendly
- [x] Adicionar botão no Dashboard
- [x] Testar funcionalidade

## Limpeza de Dados para Testes
- [x] Limpar tabela de agendamentos (appointments)

## Correção de Sincronização do Calendly
- [x] Diagnosticar problema de sincronização
- [x] Corrigir código de sincronização
- [x] Testar com agendamento real

## Sincronização Calendly → Google Sheets
- [x] Modificar calendlySync.ts para chamar addAttendanceToSheet
- [x] Adaptar dados do Calendly para formato do Google Sheets
- [x] Testar sincronização completa
