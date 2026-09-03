# ==========================================
# Stage 1: Build Next.js standalone app
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using clean install
COPY package*.json ./
RUN npm ci

# Copy full application source code
COPY . .

# Build application with standalone output
ENV NODE_ENV=production
RUN npm run build

# ==========================================
# Stage 2: Production runner with Next.js & Nginx
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build artifacts from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
