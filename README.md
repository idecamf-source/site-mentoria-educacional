---

## 🛠️ Regras de Ouro para Desenvolvimento (IA Friendly)

Se você é um assistente de IA ajudando a editar este projeto, siga estas diretrizes para evitar quebras no deploy da Vercel:

1. **Variáveis de Ambiente (VITE_):** Sempre use o prefixo `VITE_` para variáveis de frontend. Nunca escreva links (URLs) diretamente no código (hardcoding). Utilize `import.meta.env.VITE_...`.
2. **Links de Configuração:** Variáveis como `VITE_OAUTH_PORTAL_URL` e `VITE_CALENDLY_EVENT_URL` devem sempre conter URLs válidas (começando com `https://`). Valores vazios ou sem o protocolo causam erro de "Invalid URL".
3. **HTML Limpo:** Não adicione scripts com marcações de porcentagem (ex: `%VITE_ANALYTICS_ENDPOINT%`) no `client/index.html`. Isso trava o carregamento inicial.
4. **Estrutura de Build:** A pasta de saída (output) deve permanecer como `dist/public`. Não altere as configurações de `outDir` no `vite.config.ts`.
5. **Logs de Erro:** Mantenha `drop_console: false` no `vite.config.ts` para permitir a depuração de problemas em produção.

---
