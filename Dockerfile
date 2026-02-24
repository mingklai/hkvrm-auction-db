# Stage 1: install dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm ci


# copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: runtime image
FROM node:20-alpine AS runner
WORKDIR /app

# only copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules


ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
