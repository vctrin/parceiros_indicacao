# Deploy com Docker Swarm, Traefik e Portainer

Esta aplicacao pode rodar como um container Node.js servindo o build estatico do Vite pelo servidor Express incluido no projeto.

## Arquivos

- `Dockerfile`: gera a imagem de producao.
- `.dockerignore`: evita enviar arquivos locais desnecessarios para o build.
- `docker-stack.yml`: stack Swarm pronta para importar no Portainer.

## Build da imagem

```bash
docker build -t ghcr.io/vctrin/parceiros-indicacao:latest .
docker push ghcr.io/vctrin/parceiros-indicacao:latest
```

A imagem padrao deste projeto e `ghcr.io/vctrin/parceiros-indicacao:latest`.

Se for usar Umami/analytics, passe as variaveis no build, porque variaveis `VITE_*` sao embutidas no bundle:

```bash
docker build \
  --build-arg VITE_ANALYTICS_ENDPOINT=https://analytics.seudominio.com \
  --build-arg VITE_ANALYTICS_WEBSITE_ID=seu-website-id \
  -t ghcr.io/vctrin/parceiros-indicacao:latest .
```

## Ajustes antes de importar no Portainer

No `docker-stack.yml`, ajuste:

- `image`: imagem publicada no registry, atualmente `ghcr.io/vctrin/parceiros-indicacao:latest`.
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
docker stack deploy -c docker-stack.yml parceiros_indicacao
```

## Pre-requisitos no servidor

- Docker Swarm inicializado.
- Traefik rodando no Swarm.
- Rede externa do Traefik criada. Neste projeto, o stack esta configurado para usar a rede externa `network_public`. Se ela ainda nao existir, crie com:

```bash
docker network create --driver=overlay --attachable network_public
```

Se a sua rede do Traefik mudar de nome, use esse nome no `docker-stack.yml`.
