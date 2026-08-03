# Audita Website

Landing page comercial da Análise de Vendedor da Audita, construída em Next.js e preparada para produção via Docker e CapRover.

## Desenvolvimento

Requisitos: Node.js 22+ e npm.

```bash
npm ci
npm run dev
```

A aplicação usa a porta `80`. A rota principal é `/analise-de-vendedor`; `/` redireciona para ela.

## Validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. `NEXT_PUBLIC_SITE_URL` define URLs canônicas. `LEAD_API_URL` e `LEAD_API_TOKEN` conectam o formulário ao CRM/webhook; sem endpoint configurado, a API retorna erro real e nunca simula sucesso. IDs públicos de GA, GTM e WhatsApp estão reservados para integração.

## Docker e CapRover

```bash
docker build -t auditawebsite .
docker run --rm -p 80:80 --env-file .env auditawebsite
```

O `captain-definition` aponta para o Dockerfile multi-stage. Configure a Container HTTP Port como `80` no CapRover e cadastre as variáveis de ambiente no painel. O processo escuta em `0.0.0.0` usando um usuário não-root.

## Deploy e rollback

O push para a branch de produção deve acionar o deploy configurado no CapRover. Após publicar, valide `/analise-de-vendedor`, `/politica-de-privacidade`, `/termos-de-uso`, assets, formulário e SSL. Para rollback, selecione no CapRover a última imagem estável ou reverta o commit de produção e publique novamente.
