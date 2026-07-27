# Build stage
FROM --platform=linux/amd64 node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Set Vite build environment variables to placeholders
ENV VITE_API_URL=PLACEHOLDER_VITE_API_URL

# Build the application
RUN npm run build

# Production stage
FROM --platform=linux/amd64 nginx:stable-alpine

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from build stage to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy and configure the entrypoint script (copying to both locations to cover custom and Nginx default entrypoint paths)
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Health check using wget (built-in to alpine/busybox)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/healthy || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
