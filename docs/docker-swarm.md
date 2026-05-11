# Deploy com Docker Swarm, Traefik e Portainer

Esta aplicacao pode rodar como um container Node.js servindo o build estatico do Vite pelo servidor Express incluido no projeto.

## Arquivos

- `Dockerfile`: gera a imagem de producao.
- `.dockerignore`: evita enviar arquivos locais desnecessarios para o build.
- `docker-stack.yml`: stack Swarm pronta para importar no Portainer.

## Build da imagem

As tags versionadas seguem o formato `YYYY-MM-DD_vX.X`, onde a data usa o fuso `America/Sao_Paulo` e a versao `vX.X` vem de `package.json`.

Para ver a tag que sera usada:

```bash
pnpm run docker:tag
```

Exemplo:

```bash
2026-05-10_v1.0
```

```bash
IMAGE_TAG=$(pnpm --silent run docker:tag)

docker build \
  -t ghcr.io/vctrin/parceiros-indicacao:${IMAGE_TAG} \
  -t ghcr.io/vctrin/parceiros-indicacao:latest \
  .

docker push ghcr.io/vctrin/parceiros-indicacao:${IMAGE_TAG}
docker push ghcr.io/vctrin/parceiros-indicacao:latest
```

A imagem padrao deste projeto e `ghcr.io/vctrin/parceiros-indicacao:latest`, mas em producao prefira usar uma tag versionada como `ghcr.io/vctrin/parceiros-indicacao:2026-05-10_v1.0`.

Se for usar Umami/analytics, passe as variaveis no build, porque variaveis `VITE_*` sao embutidas no bundle:

```bash
IMAGE_TAG=$(pnpm --silent run docker:tag)

docker build \
  --build-arg VITE_ANALYTICS_ENDPOINT=https://analytics.seudominio.com \
  --build-arg VITE_ANALYTICS_WEBSITE_ID=seu-website-id \
  -t ghcr.io/vctrin/parceiros-indicacao:${IMAGE_TAG} \
  -t ghcr.io/vctrin/parceiros-indicacao:latest \
  .
```

## Ajustes antes de importar no Portainer

No `docker-stack.yml`, ajuste:

- `image`: imagem publicada no registry. Por padrao usa `ghcr.io/vctrin/parceiros-indicacao:${IMAGE_TAG:-latest}`.
- `PARTNER_WEBHOOK_URL`: URL privada do webhook que recebe os leads do formulario. Configure como variavel da stack no Portainer.
- `Host(...)`: dominio da aplicacao, atualmente `parcerias.gluotech.com`.
- `network_public`: rede externa usada pelo Traefik.
- `tls.certresolver`: nome do resolver configurado no seu Traefik.

## Deploy pelo Portainer

1. Acesse Portainer.
2. Va em `Stacks`.
3. Crie uma nova stack.
4. Cole o conteudo de `docker-stack.yml`, ou selecione o repositorio Git se o Portainer estiver conectado ao GitHub.
5. Ajuste a imagem e o dominio.
6. Faça o deploy.

## Deploy por linha de comando

```bash
IMAGE_TAG=2026-05-10_v1.0 docker stack deploy \
  --with-registry-auth \
  -c docker-stack.yml \
  parceiros_indicacao
```

Se `IMAGE_TAG` nao for informado, o stack usa `latest`.

## Pre-requisitos no servidor

- Docker Swarm inicializado.
- Traefik rodando no Swarm.
- Rede externa do Traefik criada. Neste projeto, o stack esta configurado para usar a rede externa `network_public`. Se ela ainda nao existir, crie com:

```bash
docker network create --driver=overlay --attachable network_public
```

Se a sua rede do Traefik mudar de nome, use esse nome no `docker-stack.yml`.
