FROM node:22-alpine

WORKDIR /app

# Install production dependencies only (layer cached until package files change)
COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

ENV NODE_ENV=production
EXPOSE 5000

# Run as the built-in non-root user
USER node

CMD ["node", "src/server.js"]
