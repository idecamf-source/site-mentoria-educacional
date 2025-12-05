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
