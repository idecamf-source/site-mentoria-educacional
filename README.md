📜 Instruções Customizadas para Desenvolvimento (Mentoria Educacional)
Contexto do Projeto: Este é um projeto React/Vite hospedado na Vercel. O código foi exportado do Manus e possui uma estrutura específica de pastas e variáveis de ambiente.

1. Manipulação de Variáveis de Ambiente (.env)
Prefixo Obrigatório: Todas as variáveis de frontend devem usar o prefixo VITE_ (ex: VITE_APP_ID).

Proibido Hardcoding: Nunca escreva links diretamente no código (como links do Calendly ou APIs). Use sempre import.meta.env.VITE_NOME_DA_VARIAVEL.

Variáveis Críticas: Mantenha sempre a validade da VITE_OAUTH_PORTAL_URL e VITE_CALENDLY_EVENT_URL, garantindo que comecem com https://.

2. Integridade do index.html
Bloqueio de Analytics: Nunca adicione scripts que utilizem marcações de porcentagem (ex: %VITE_ANALYTICS_ENDPOINT%) no arquivo client/index.html.

Scripts de Terceiros: Qualquer novo script deve ter o link completo e válido para evitar o erro TypeError: Invalid URL.

3. Configurações de Build e Estrutura
Diretório de Saída: O outDir configurado no vite.config.ts é dist/public. Nunca altere isso sem avisar, pois a Vercel depende dessa pasta para publicar o site.

Console Logs: Mantenha drop_console: false e drop_debugger: false nas opções do terser dentro do vite.config.ts para que possamos debugar erros em produção caso necessário.

Aliases de Pasta: Use os aliases configurados: @ para client/src, @shared para a pasta de arquivos compartilhados e @assets para recursos anexados.

4. Fluxo de Deploy
GitHub Sync: Todas as alterações devem ser enviadas para a branch principal do GitHub para disparar o deploy automático da Vercel.

Tratamento de Erros: Se o site apresentar uma tela azul de erro após uma alteração, verifique imediatamente se alguma nova função new URL() está recebendo um valor vazio ou indefinido.
