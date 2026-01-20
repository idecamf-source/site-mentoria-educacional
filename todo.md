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
