#!/bin/bash

# Script de sincronização automática com GitHub
# Mantém o Google Antigravity sempre atualizado com a versão mais recente do código

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Iniciando sincronização com GitHub...${NC}"

# Navegar para o diretório do projeto
cd /home/ubuntu/mentoria_educacional

# Verificar se há mudanças
if [[ -z $(git status -s) ]]; then
    echo -e "${GREEN}✅ Nenhuma mudança para sincronizar${NC}"
    exit 0
fi

# Adicionar todas as mudanças
echo -e "${YELLOW}📦 Adicionando arquivos...${NC}"
git add .

# Criar commit com timestamp
COMMIT_MSG="Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "${YELLOW}💾 Criando commit: $COMMIT_MSG${NC}"
git commit -m "$COMMIT_MSG" || true

# Enviar para GitHub
echo -e "${YELLOW}🚀 Enviando para GitHub...${NC}"
git push github main

echo -e "${GREEN}✅ Sincronização concluída com sucesso!${NC}"
echo -e "${GREEN}📍 Repositório: https://github.com/idecamf-source/site-mentoria-educacional${NC}"
