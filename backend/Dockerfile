# syntax=docker/dockerfile:1

# ---------- build ----------
FROM node:24-slim AS build

WORKDIR /app

# O Prisma precisa do OpenSSL para carregar o query engine; a imagem slim não traz.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma
RUN yarn prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN yarn tsc -p tsconfig.json

# ---------- runtime ----------
FROM node:24-slim AS runtime

WORKDIR /app
ENV NODE_ENV=prod

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# node_modules vem inteiro do build: o CLI do Prisma (devDependency) é
# necessário em runtime para o `migrate deploy` do entrypoint.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./

USER node

EXPOSE 3001

# Aplica as migrations pendentes antes de subir a API.
CMD ["sh", "-c", "yarn prisma migrate deploy && node dist/server.js"]
