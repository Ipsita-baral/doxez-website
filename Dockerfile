# Build stage
FROM node:20-alpine AS build

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
FROM nginx:stable-alpine

# Build-time argument to optionally install AWS CLI and jq (Option B)
ARG INSTALL_AWS_CLI=false

# Install AWS CLI and jq if requested, otherwise keep the image slim
RUN if [ "$INSTALL_AWS_CLI" = "true" ]; then \
        apk add --no-cache aws-cli jq; \
    fi

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from build stage to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy and configure the entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Health check using wget (built-in to alpine/busybox)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/healthy || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
