# Stage 1: Build
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml nx.json ./
COPY apps/crm-api/package.json apps/crm-api/package.json
COPY libs ./libs
COPY apps/crm-api ./apps/crm-api

# Install pnpm
RUN npm install -g pnpm

# Install dependencies and build the application
RUN pnpm install --frozen-lockfile
RUN pnpm build --filter=crm-api...

# Stage 2: Production
FROM node:18 AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/apps/crm-api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE $PORT

# Command to run the application
CMD ["node", "dist/main.js"]
