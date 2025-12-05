# Sincronização Automática com GitHub

Este projeto está configurado para sincronizar automaticamente com o GitHub, permitindo que o Google Antigravity tenha sempre acesso à versão mais recente do código.

## Repositório

- **URL:** https://github.com/idecamf-source/site-mentoria-educacional
- **Branch:** main
- **Remoto:** github

## Como Funciona

### Sincronização Manual

Para sincronizar manualmente o código com o GitHub:

```bash
cd /home/ubuntu/mentoria_educacional
./sync-github.sh
```

O script irá:
1. Verificar se há mudanças no código
2. Adicionar todos os arquivos modificados
3. Criar um commit com timestamp automático
4. Enviar (push) para o GitHub

### Sincronização Automática

Sempre que você solicitar alterações no código:
1. As mudanças serão implementadas
2. Um checkpoint será criado
3. O código será automaticamente sincronizado com o GitHub
4. O Google Antigravity terá acesso imediato às atualizações

## Credenciais

As credenciais do GitHub estão configuradas no remoto `github` usando Personal Access Token (PAT).

Para atualizar o token:

```bash
git remote set-url github https://SEU_TOKEN@github.com/idecamf-source/site-mentoria-educacional.git
```

## Verificar Status

Para verificar o status da sincronização:

```bash
cd /home/ubuntu/mentoria_educacional
git status
git log --oneline -5
```

## Troubleshooting

### Erro de autenticação
Se houver erro de autenticação, verifique se o token está válido e tem permissões de `repo`.

### Conflitos
Se houver conflitos, o script irá falhar. Resolva manualmente:

```bash
git pull github main
# Resolver conflitos
git push github main
```

## Integração com Google Antigravity

O Google Antigravity monitora o repositório GitHub e tem acesso a:
- Todo o histórico de commits
- Código-fonte atualizado
- Estrutura do projeto
- Dependências e configurações

Isso permite que o Antigravity forneça assistência contextual baseada na versão mais recente do código.
