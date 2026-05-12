# Memoria da sessao

Data: 2026-05-11

## Contexto do projeto

- Projeto: landing page de parceiros/indicacao da Gluotech.
- Repositorio remoto: `https://github.com/vctrin/parceiros_indicacao.git`.
- Deploy: Docker Swarm via Portainer, com Traefik.
- Imagem: `ghcr.io/vctrin/parceiros-indicacao`.
- Stack principal: `docker-stack.yml`.

## Commits realizados

- `83c181c Add versioned Docker image tags`
  - Adicionado sistema de tags Docker versionadas.
  - Workflow GitHub Actions passou a publicar `latest`, tag versionada e SHA.

- `808fbb4 Harden partner form submission`
  - Aplicadas correcoes de seguranca no formulario e servidor.
  - Push concluido para `main`.
  - GitHub Actions `Docker Image` concluiu com sucesso.

## Sistema de tags Docker

Foi criado o script:

```bash
scripts/docker-image-tag.mjs
```

Ele gera tags no formato:

```bash
YYYY-MM-DD_vX.X
```

Exemplo gerado na sessao:

```bash
2026-05-11_v1.0
```

A versao `vX.X` vem de `package.json`. Com `version: "1.0.0"`, a tag usa `v1.0`.

Comando local:

```bash
pnpm --silent run docker:tag
```

Imagem confirmada no GHCR apos o push:

```bash
ghcr.io/vctrin/parceiros-indicacao:2026-05-11_v1.0
```

Teste recomendado no servidor:

```bash
docker pull ghcr.io/vctrin/parceiros-indicacao:2026-05-11_v1.0
```

## Docker Stack e Portainer

O `docker-stack.yml` passou a aceitar variavel de imagem:

```yaml
image: ghcr.io/vctrin/parceiros-indicacao:${IMAGE_TAG:-latest}
```

Para atualizar a stack no Portainer, usar:

```bash
IMAGE_TAG=2026-05-11_v1.0
```

Tambem foi adicionada a variavel obrigatoria para envio do formulario:

```bash
PARTNER_WEBHOOK_URL=https://workflows.gluotech.com/webhook/...
```

Importante: informar a URL diretamente, sem chaves `{}`.

Exemplo:

```bash
PARTNER_WEBHOOK_URL=https://workflows.gluotech.com/webhook/7f0a9086-9653-451b-98bb-049456fb03a0
```

## Seguranca do formulario

Problema encontrado:

- O webhook estava hardcoded no frontend em `FormSection.tsx`, expondo a URL publica no bundle do navegador.
- Rate limit, honeypot e token estavam apenas no cliente, portanto podiam ser contornados.

Correcoes aplicadas:

- Frontend agora envia para:

```bash
/api/partner-interest
```

- Backend Express agora:
  - Valida payload com `zod`.
  - Aplica limite de JSON de `16kb`.
  - Aplica rate limit simples por IP: 3 requests por 60 segundos.
  - Valida honeypot server-side.
  - Repassa para `PARTNER_WEBHOOK_URL`.
  - Usa timeout de 10 segundos no envio para webhook.
  - Retorna erros genericos em JSON.
  - Evita fallback SPA para `/api/*`.

## Headers de seguranca

Adicionados no servidor Express:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` com regras restritivas para scripts, styles, fonts, images e connections.

Tambem foi desativado:

```ts
app.disable("x-powered-by");
```

## Analytics

Problema encontrado:

- `client/index.html` sempre tentava carregar:

```html
%VITE_ANALYTICS_ENDPOINT%/umami
```

- Sem variaveis de build, isso gerava script quebrado no HTML final.

Correcao:

- O script fixo foi removido do HTML.
- O carregamento do Umami agora ocorre em `client/src/App.tsx`, somente se:
  - `VITE_ANALYTICS_ENDPOINT` existir.
  - `VITE_ANALYTICS_WEBSITE_ID` existir.
  - O endpoint usar HTTPS.

## Dependencias e audit

Foram removidas dependencias de producao nao usadas e com vulnerabilidades transitivas:

- `axios`
- `streamdown`
- `recharts`

Tambem foi removido o componente nao usado:

```bash
client/src/components/ui/chart.tsx
```

`express` foi atualizado:

```bash
express ^4.21.2 -> ^4.22.1
```

Overrides adicionados em `package.json`:

```json
"path-to-regexp": "0.1.13",
"qs": "6.14.2"
```

Resultado final:

```bash
pnpm audit --prod
# No known vulnerabilities found
```

## Validacoes executadas

Comandos executados e aprovados:

```bash
pnpm run check
npm run build
pnpm audit --prod
```

Tambem foi iniciado servidor local temporario para validar:

- Headers de seguranca presentes.
- `/api/unknown` retorna JSON `404`.
- `POST /api/partner-interest` com payload invalido retorna JSON `400`.

## Ajuste textual

Foi alterada a grafia no texto principal da hero:

De:

```text
Torne-se um Indicador de Negócios da Gluotech e receba até
```

Para:

```text
Torne-se um Indicador de Negócios da Gluotech e receba até
```

Arquivo:

```bash
client/src/components/HeroSection.tsx
```

## Recomendacao contra robos

Foi recomendado implementar protecao em camadas:

- Cloudflare Turnstile no formulario.
- Validacao do token Turnstile no backend antes de enviar para o webhook.
- Rate limiting no Cloudflare ou Traefik para `/api/partner-interest`.
- Checagem de tempo minimo de preenchimento.
- Manter mensagens de erro genericas.

Recomendacao principal:

```text
Implementar Cloudflare Turnstile + rate limit no Cloudflare/Traefik.
```

## Sessao 2026-05-12 - Grafia, imagem e deploy automatico

- Solicitado substituir em toda aplicacao a grafia `GluoTech` por `Gluotech`.
- Arquivos alterados:
  - `client/index.html`
  - `client/src/pages/Home.tsx`
  - `client/src/components/Navbar.tsx`
  - `client/src/components/FAQSection.tsx`
  - `client/src/components/FormSection.tsx`
  - `client/src/components/BenefitsSection.tsx`
  - `client/src/components/HowItWorksSection.tsx`
  - `ideas.md`
- Verificacao executada:

```bash
rg -n "GluoTech" .
npm run build
```

- Commit criado e enviado para `origin/main`:

```bash
731b952 Padroniza grafia da marca Gluotech
```

- Imagem Docker construida localmente e publicada no GHCR:

```bash
ghcr.io/vctrin/parceiros-indicacao:2026-05-11_v1.0
ghcr.io/vctrin/parceiros-indicacao:latest
```

- Digest publicado nas duas tags:

```bash
sha256:f3b38c44ef10243bc759bff32ffe85c05783a3884390e50e0a773819882485d3
```

- O servidor foi conferido pelo usuario com `docker service ls`; o servico ja apareceu usando a tag nova:

```bash
parceiros-indicacao_parceiros-indicacao
ghcr.io/vctrin/parceiros-indicacao:2026-05-11_v1.0
```

- Foi criado suporte para deploy automatico via GitHub Actions em:

```bash
.github/workflows/docker-image.yml
docs/docker-swarm.md
```

- O workflow agora:
  - constroi a imagem Docker;
  - publica `latest`, tag versionada e tag com `github.sha`;
  - acessa o servidor por SSH;
  - executa `docker service update --with-registry-auth`;
  - atualiza o servico `parceiros-indicacao_parceiros-indicacao` usando a imagem imutavel do SHA do commit.

- Secrets necessarios no GitHub Actions:

```text
SERVER_HOST
SERVER_USER
SERVER_PORT
SERVER_SSH_KEY
SERVER_SERVICE_NAME
GHCR_USERNAME
GHCR_TOKEN
```

- Valores padrao/esperados:

```text
SERVER_USER=admin
SERVER_PORT=22
SERVER_SERVICE_NAME=parceiros-indicacao_parceiros-indicacao
GHCR_USERNAME=vctrin
```

- Observacao importante:
  - `SERVER_HOST` precisa ser IP/DNS acessivel pelo GitHub Actions. Se for apenas IP privado da AWS, usar IP publico, DNS publico, VPN/tunel ou runner self-hosted.
  - Um PAT foi colado no chat durante a sessao para publicar no GHCR; recomendar revogar/rotacionar esse token.
  - As alteracoes do workflow e da documentacao ainda nao foram commitadas nem enviadas para o GitHub.
