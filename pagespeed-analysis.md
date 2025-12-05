# Análise PageSpeed Insights - Mentoria Educacional

**Score Atual: 64/100** ⚠️
**Meta: 90+** ✅

## Principais Problemas Identificados

### 1. **Otimização de Imagens** (Economia: 1,323 KiB)
- ❌ `/images/hero-bg.jpg` - 1,221.4 KiB
  - Não está em formato moderno (WebP/AVIF)
  - Dimensões maiores que necessário (1364x768 vs 1347x752)
  
- ❌ `/images/patricia.png` - 168.3 KiB
  - Não está em formato moderno (WebP/AVIF)
  
- ❌ `/images/logo.png` - 73.7 KiB
  - Dimensões maiores que necessário (1024x724 vs 91x64)
  
- ❌ Thumbnail YouTube - 102.1 KiB
  - Dimensões maiores que necessário

### 2. **Render Blocking** (Economia: 130 ms)
- CSS bloqueando renderização: `/assets/index-B98bhZj5.css` (19.4 KiB)

### 3. **LCP (Largest Contentful Paint)** - 2.2s
- Imagem hero-bg.jpg não tem `fetchpriority="high"`
- Resource load delay: 1,320 ms
- Element render delay: 390 ms

### 4. **Total Blocking Time** - 600 ms
- JavaScript bloqueando thread principal

### 5. **Preconnect**
- Faltam hints de preconnect para:
  - https://img.youtube.com
  - https://plausible.io
  - https://manus-analytics.com

## Ações Necessárias

1. ✅ Converter imagens para WebP/AVIF
2. ✅ Redimensionar imagens para tamanhos corretos
3. ✅ Adicionar `fetchpriority="high"` na imagem hero
4. ✅ Adicionar preconnect hints
5. ✅ Implementar lazy loading para imagens abaixo da dobra
6. ✅ Otimizar CSS (inline critical CSS)
