# Project TODO

## Correções PageSpeed Insights
- [x] Criar robots.txt válido
- [x] Adicionar meta description e favicon
- [x] Corrigir contraste de cores (text-muted-foreground)
- [ ] Garantir que WebP seja servido em produção
- [ ] Remover APIs depreciadas (unload event listeners)
- [ ] Reduzir JavaScript não usado (code splitting)
- [ ] Adicionar source maps para produção

## Otimizações de Performance (Meta: 90+)
- [x] Converter hero-bg.jpg para WebP e garantir uso em produção
- [x] Configurar Vite para não transpilar código moderno (remover polyfills)
- [x] Adicionar preload para imagem LCP no index.html
- [x] Otimizar build do Vite com target ES2020+
- [x] Adicionar code splitting (react-vendor, ui-vendor)
- [x] Instalar e configurar Terser para minificação

## Sincronização com GitHub
- [x] Criar script de sincronização automática
- [x] Configurar git credentials
- [x] Documentar processo de sync

## Correção de APIs Depreciadas
- [x] Localizar unload event listeners (script Umami)
- [x] Remover ou substituir por alternativas modernas (data-auto-track="false")

## Atualização de Contato
- [x] Alterar email no Footer de mentoria@amf.edu.br para patricia.dias@amf.edu.br

## Atualização de Imagem Hero
- [x] Converter Biblioteca2.jpeg para WebP (273KB, qualidade 85)
- [x] Substituir hero-bg.webp pela nova imagem
- [x] Testar carregamento e performance

## Correção de Erro de Sintaxe
- [x] Corrigir erro de sintaxe no App.tsx (hot reload falhando)

## Cache Busting para Imagem Hero
- [x] Adicionar parâmetro ?v=2 na URL da imagem hero-bg.webp

## Otimização de Performance (Score 54 → 90+)
- [x] Recomprimir hero-bg.webp com qualidade menor (273KB → 156KB)
- [x] Adicionar srcset com versões responsivas da imagem hero (800w: 53KB, 1200w: 88KB, 1920w: 156KB)
- [x] Lazy loading no YouTube já implementado (só carrega ao clicar)
- [x] Scripts com defer já configurados
- [x] Otimizar patricia.webp (17KB → 12KB)

## Otimização Mobile (Score 49 → 75+)
- [x] Criar versão 400w da hero-bg (17KB)
- [x] Criar versão 600w da hero-bg (32KB)
- [x] Atualizar srcset priorizando mobile (400w, 600w, 800w, 1200w, 1920w)
- [x] Otimizar preload com media queries para mobile
- [x] Cache busting v4 aplicado
- [ ] Usuário testar performance mobile no PageSpeed Insights

## Correções Críticas PageSpeed (Score 68 → 80+)
- [x] Adicionar crossorigin ao preconnect do plausible.io
- [x] Corrigir srcset - usar sizes="100vw" ao invés de pixels fixos
- [x] Corrigir src padrão para mobile-first (400w)
- [x] Otimizar thumbnail YouTube (mqdefault.jpg: 320x180, ~20KB ao invés de 102KB)
- [ ] Inline critical CSS para reduzir Resource Load Delay (1970ms)
- [ ] Investigar Element Render Delay (1020ms)

## Alterações do Google Antigravity (Jan 20, 2026)
- [x] Favicon otimizado para WebP (logo.png → logo.webp)
- [x] Removido vite-plugin-manus-runtime (causava warning de unload event)
- [x] Sourcemaps habilitados para debugging
- [x] Contraste de texto melhorado (muted-foreground: 0.45 → 0.40)

## Alterações do Google Antigravity - Mobile Optimization (Jan 20, 2026)
- [x] Otimização de carregamento da imagem hero para mobile
- [x] Redução de trabalho na main thread
- [x] Melhoria na visibilidade do conteúdo
- [x] Ajustes no Hero.tsx, Mentora.tsx, VideoSection.tsx
- [x] Otimizações de CSS no index.css

## Funcionalidade Voltar ao Topo
- [x] Criar componente ScrollToTop com botão flutuante
- [x] Mostrar botão apenas após rolar 300px
- [x] Animação suave de scroll
- [x] Posicionar no canto inferior direito
- [x] Adicionar ao layout principal (Home.tsx)

## Alterações do Repositório GitHub (Jan 20, 2026)
- [x] Componente GlowButton animado adicionado
- [x] Integração do GlowButton na seção Hero
- [x] Correção de erro TypeScript no GlowButton

## Ajuste de Cores do GlowButton
- [x] Alterar gradiente rosa/roxo para dourado/azul (amber-500/yellow-500/amber-600)
- [x] Ajustar cor do botão para azul marinho (#1a3a52)
- [x] Ajustar efeito shine para dourado (amber-300)

## Melhorias de Legibilidade e Contraste na Hero
- [x] Adicionar overlay de gradiente azul marinho (#1a3a52 com 65% mobile / 55% desktop)
- [x] Adicionar sombra suave no texto "Universitária" (text-shadow esfumado)
- [x] Adicionar drop-shadow no título principal e parágrafo
- [x] Animar seta do botão (bounce-x 1.5s + translate-x no hover)

## Melhorias de Interatividade - Seção Horários
- [x] Bordas ativas com mudança de cor para dourado (secondary) no hover
- [x] Animação de balanço (tilt) nos ícones de calendário no hover
- [x] Título do dia muda para dourado no hover
- [x] Sombra dourada no hover

## Melhorias de Interatividade - Seção Pilares
- [x] Entrada escalonada (staggered reveal) ao rolar a página (100ms delay entre cards)
- [x] Ícones dinâmicos com fundo circular amarelo e scale no hover
- [x] Efeito de profundidade com sombra mais suave e difusa (shadow-2xl shadow-secondary/15)
- [x] Cards sobem 3px no hover (translate-y-3)

## Melhorias de Interatividade - Seção Mentora
- [x] Badge animado com efeito shimmer no selo "15+ Anos de experiência" (3s loop)

## Correções de SEO - Página Inicial
- [x] Reduzir meta description para 50-160 caracteres (agora com 147 caracteres)
- [x] Adicionar meta keywords com palavras-chave relevantes
- [x] Corrigir lang="en" para lang="pt-BR"

## Melhorias no Rodapé
- [x] Animação no ícone de e-mail (mail-open: scale + rotateX)
- [x] Animação no ícone de localização (bounce-pin: pulinho duplo)
- [x] Links funcionais (mailto: e Google Maps com target=_blank)
- [x] Sublinhado animado nos links (cresce do centro para bordas)
- [x] Divisor elegante com gradiente transparente-branco/30-transparente
- [x] Transição wave SVG entre seção anterior e rodapé
- [x] Melhorar contraste do texto (font-semibold e text-white/90)

## Correções Críticas de Performance (PageSpeed Insights - Jan 21, 2026)

### 1. CSS Render-Blocking (20,5 KiB, 90ms)
- [x] Extrair CSS crítico (above-the-fold) e colocar inline no <head>
- [x] CSS crítico minificado inline (~1.5KB)
- [x] Loading spinner inline para UX durante carregamento

### 2. Árvore de Dependência da Rede (937ms latência)
- [x] Adicionar preconnect para Google Fonts, YouTube, Plausible
- [x] Adicionar dns-prefetch para Calendly e Manus Analytics
- [x] Ordem otimizada de resource hints

### 3. JavaScript Não Usado (150 KiB)
- [x] Lazy loading de componentes below-the-fold (VideoSection, Pilares, etc)
- [x] Code splitting otimizado por tipo (react, motion, ui-vendor, data-layer, icons)
- [x] Terser com drop_console e pure_funcs para remover logs
- [x] Fontes otimizadas (removidos pesos não utilizados: 300, 400, 600)

## Correções de Acessibilidade (PageSpeed Insights - Jan 21, 2026)
- [x] Corrigir contraste insuficiente no Footer (text-secondary → text-amber-300)
- [x] Remover maximum-scale=1 da meta viewport (permite zoom para usuários com baixa visão)

## Correção de Estilo - Seção Mentora
- [x] Corrigir estilo do texto "Conheça a Mentora" para igualar ao "CONHEÇA A MENTORIA" (uppercase, tracking-wider, bg-primary/10)

## Correção de Cores - Seção CTA Final
- [x] Corrigir cores dos textos na seção CTA Final (título #ffffff, subtítulo rgba(255,255,255,0.9), botão #D4A017/#1a3a52)

## Correção de Cores - Rodapé
- [x] Alterar cor dos títulos "Horários de Atendimento" e "Contato e Localização" de text-amber-300 para text-white
- [ ] Sincronizar alterações com o GitHub
