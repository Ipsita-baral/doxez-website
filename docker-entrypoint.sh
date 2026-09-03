#!/bin/sh
set -e

# Ensure nginx runtime directory exists
mkdir -p /run/nginx

echo "=================================================="
echo "Starting Doxez Next.js Standalone Application..."
echo "=================================================="

# Start Next.js standalone server on localhost:3000
NODE_ENV=production PORT=3000 HOSTNAME=127.0.0.1 node server.js &
NEXT_PID=$!

# Graceful termination trap for Docker stop / ECS task termination
cleanup() {
  echo "Received shutdown signal. Gracefully stopping Next.js and Nginx..."
  kill -TERM "$NEXT_PID" 2>/dev/null || true
  nginx -s quit 2>/dev/null || true
  wait "$NEXT_PID" 2>/dev/null || true
  exit 0
}
trap cleanup SIGTERM SIGINT

# Wait for Next.js to start listening before launching Nginx
echo "Waiting for Next.js to be ready on port 3000..."
MAX_RETRIES=30
COUNT=0
READY=0

while [ $COUNT -lt $MAX_RETRIES ]; do
  if wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ >/dev/null 2>&1; then
    READY=1
    break
  fi
  sleep 1
  COUNT=$((COUNT + 1))
done

if [ $READY -eq 1 ]; then
  echo "Next.js standalone server is ready."
else
  echo "Warning: Next.js took longer than expected to report ready, proceeding with Nginx launch..."
fi

echo "Starting Nginx reverse proxy on port 80..."
# Run Nginx in the foreground
nginx -g "daemon off;" &
NGINX_PID=$!

# Wait for Nginx process
wait "$NGINX_PID"
cleanup
