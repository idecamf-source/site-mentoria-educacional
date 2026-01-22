# 🤖 Diretrizes de Desenvolvimento (AI Instruction Manual)

Este repositório possui uma estrutura específica e regras de configuração críticas para o funcionamento do deploy na **Vercel**. Se você é um assistente de IA, leia estas instruções antes de propor ou realizar qualquer alteração no código.

---

### ⚠️ Regras de Ouro (Não Negociáveis)

* **Variáveis de Ambiente (VITE_):** Toda e qualquer variável utilizada no frontend deve, obrigatoriamente, possuir o prefixo `VITE_` (ex: `VITE_APP_ID`).
* **Proibido Hardcoding de URLs:** Nunca escreva URLs diretamente nos arquivos `.ts` ou `.tsx`. Utilize sempre `import.meta.env.VITE_NOME_DA_VARIAVEL`.
* **Protocolo Obrigatório:** Todas as variáveis de URL (como `VITE_OAUTH_PORTAL_URL` ou `VITE_CALENDLY_EVENT_URL`) devem ser links válidos iniciando com `https://`. Valores vazios ou sem o protocolo quebram a inicialização do React com erro de "Invalid URL".
* **Integridade do HTML:** É terminantemente proibido inserir scripts no arquivo `client/index.html` que utilizem interpolação de variáveis via sinais de porcentagem (ex: `%VITE_ANALYTICS_ENDPOINT%`), pois o processo de build não as substitui corretamente, causando falha crítica no navegador.

---

### 📂 Estrutura e Build

* **Diretório de Saída (Output):** O Vite está configurado para gerar o build na pasta `dist/public`. Esta configuração deve ser mantida tanto no arquivo `vite.config.ts` quanto nas configurações de "Output Directory" na Vercel.
* **Configuração do Vite:** No arquivo `vite.config.ts`, a opção `drop_console` deve permanecer como `false` para permitir a identificação de erros de URL no console de produção.
* **Localização dos Arquivos:**
    * O código do frontend reside na pasta `/client`.
    * Configurações de ambiente do servidor residem em `/server/_core/env.ts`.

---

### 🛠️ Comandos e Aliases

Ao manipular caminhos de arquivos, utilize os aliases definidos no `vite.config.ts`:
* `@/*` -> aponta para `client/src/*`.
* `@shared/*` -> aponta para a pasta `shared/*` na raiz.
* `@assets/*` -> aponta para `attached_assets/*`.

---

> **Nota para a IA:** Caso precise adicionar novas funcionalidades que exijam conexão externa, solicite primeiro que o usuário configure a respectiva variável `VITE_` no painel da Vercel antes de implementar a chamada no código.
