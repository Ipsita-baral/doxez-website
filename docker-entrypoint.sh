#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Fallback default value if VITE_API_URL is still empty/not set
if [ -z "$VITE_API_URL" ]; then
  echo "VITE_API_URL is not set. Defaulting to production CRM url: https://crm.doxez.in"
  export VITE_API_URL="https://crm.doxez.in"
fi

echo "Injecting runtime environment variables..."
echo "Replacing PLACEHOLDER_VITE_API_URL with $VITE_API_URL in built JS files and nginx.conf..."

# Find all compiled JS files in Nginx HTML directory and replace the placeholder
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|PLACEHOLDER_VITE_API_URL|$VITE_API_URL|g" {} +

# Replace the placeholder in the nginx configuration
sed -i "s|PLACEHOLDER_VITE_API_URL|$VITE_API_URL|g" /etc/nginx/conf.d/default.conf

echo "Environment injection complete. Starting Nginx..."

# Execute Nginx (replacing current process)
exec "$@"
