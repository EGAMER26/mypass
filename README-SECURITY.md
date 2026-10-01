# Migração e operação segura

## 1. Preparar o ambiente

Copie `.env.example` para `.env.local`. Gere os segredos sem colocá-los no Git:

```bash
openssl rand -base64 32       # VAULT_ENCRYPTION_KEY
openssl rand -base64 48       # NEXTAUTH_SECRET
```

Configure `DATABASE_URL` com o pooler de transação do Supabase e `DIRECT_URL` com o pooler de sessão para migrações. Use PostgreSQL gerenciado com backup e criptografia; não use SQLite em produção.

## 2. Migrar o MockAPI

Faça backup controlado do endpoint antigo, configure `MOCKAPI_URL` temporariamente e execute:

```bash
yarn db:generate
yarn db:push
yarn migrate:mockapi
```

O script importa hashes de login válidos e criptografa cada senha salva com AES-256-GCM usando `VAULT_ENCRYPTION_KEY`. Ele não deve ser executado novamente contra uma base que já foi migrada sem revisar duplicidades.

Depois de validar o novo sistema:

1. Desative/remova o MockAPI.
2. Rotacione todas as senhas que estavam no endpoint público.
3. Revogue sessões e tokens antigos.
4. Remova `MOCKAPI_URL` e qualquer cópia local dos dados.

A criptografia protege o novo armazenamento, mas não desfaz a exposição anterior. Senhas antigas devem ser consideradas comprometidas.
