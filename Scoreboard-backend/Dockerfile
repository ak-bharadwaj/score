## Multi-stage build: frontend build, then backend build, then runtime

FROM node:18-alpine AS frontend
WORKDIR /frontend
COPY Scoreboard-Frontend/package.json ./
RUN yarn install --frozen-lockfile || yarn install
COPY Scoreboard-Frontend/ ./
RUN yarn build

FROM node:18-alpine AS backend_build
WORKDIR /app
COPY Scoreboard-backend/package.json ./
RUN yarn install --frozen-lockfile || yarn install
COPY Scoreboard-backend/ ./
RUN yarn build

FROM node:18-alpine AS runtime
WORKDIR /app

# Copy built backend
COPY --from=backend_build /app /app

# Copy built frontend into backend static folder
RUN mkdir -p /app/client/build
COPY --from=frontend /frontend/build /app/client/build

# Ensure TLS trust store is available for MongoDB Atlas
RUN apk add --no-cache ca-certificates && update-ca-certificates

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/index.js"]
