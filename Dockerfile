FROM node:22-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

FROM deps AS build
ARG VITE_ANALYTICS_ENDPOINT
ARG VITE_ANALYTICS_WEBSITE_ID
COPY . .
RUN if [ -n "$VITE_ANALYTICS_ENDPOINT" ] && [ -n "$VITE_ANALYTICS_WEBSITE_ID" ]; then \
      VITE_ANALYTICS_ENDPOINT="$VITE_ANALYTICS_ENDPOINT" VITE_ANALYTICS_WEBSITE_ID="$VITE_ANALYTICS_WEBSITE_ID" pnpm run build; \
    else \
      pnpm run build; \
    fi

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "require('http').get('http://127.0.0.1:3000/', (res) => process.exit(res.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"
CMD ["node", "dist/index.js"]
