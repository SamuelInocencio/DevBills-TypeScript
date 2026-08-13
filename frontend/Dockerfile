# syntax=docker/dockerfile:1

# ---------- build ----------
FROM node:24-slim AS build

WORKDIR /app

# O Vite injeta as VITE_* em tempo de build, não em runtime: elas precisam
# chegar como build args, senão o bundle sai com os valores vazios.
ARG VITE_API_URL=/api
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

ENV VITE_API_URL=$VITE_API_URL \
    VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
    VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET \
    VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ---------- runtime ----------
# O Caddy serve o bundle estático e faz o proxy de /api para o backend,
# então frontend e proxy são o mesmo serviço. O Caddyfile entra por bind
# mount no compose, para trocar o domínio sem rebuildar a imagem.
FROM caddy:2-alpine AS runtime

COPY --from=build /app/dist /srv
