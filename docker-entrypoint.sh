#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# If AWS_SECRET_NAME is set, try to fetch the secret from AWS Secrets Manager
if [ -n "$AWS_SECRET_NAME" ]; then
  echo "AWS_SECRET_NAME is provided: $AWS_SECRET_NAME"
  
  if command -v aws >/dev/null 2>&1; then
    echo "Fetching secret value from AWS Secrets Manager..."
    # Retrieve secret string
    SECRET_VAL=$(aws secretsmanager get-secret-value --secret-id "$AWS_SECRET_NAME" --query SecretString --output text 2>/dev/null)
    
    if [ -n "$SECRET_VAL" ]; then
      # Extract VITE_API_URL from JSON secret
      if command -v jq >/dev/null 2>&1; then
        VITE_API_URL_FROM_SECRET=$(echo "$SECRET_VAL" | jq -r '.VITE_API_URL // empty')
      else
        # Fallback to sed/grep if jq is not installed
        VITE_API_URL_FROM_SECRET=$(echo "$SECRET_VAL" | grep -o '"VITE_API_URL":"[^"]*' | grep -o '[^"]*$')
      fi
      
      if [ -n "$VITE_API_URL_FROM_SECRET" ]; then
        export VITE_API_URL="$VITE_API_URL_FROM_SECRET"
        echo "Successfully set VITE_API_URL from AWS Secrets Manager."
      else
        echo "Warning: VITE_API_URL key not found in the secret JSON."
      fi
    else
      echo "Error: Could not retrieve secret value. Check AWS IAM permissions/roles."
    fi
  else
    echo "Warning: AWS CLI is not installed in this container image. Cannot fetch from Secrets Manager at runtime."
    echo "Please ensure environment variables are injected directly (Option A)."
  fi
fi

# Fallback default value if VITE_API_URL is still empty/not set
if [ -z "$VITE_API_URL" ]; then
  echo "VITE_API_URL is not set. Defaulting to production CRM url: https://crm.doxez.in"
  export VITE_API_URL="https://crm.doxez.in"
fi

echo "Injecting runtime environment variables..."
echo "Replacing PLACEHOLDER_VITE_API_URL with $VITE_API_URL in built JS files..."

# Find all compiled JS files in Nginx HTML directory and replace the placeholder
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|PLACEHOLDER_VITE_API_URL|$VITE_API_URL|g" {} +

echo "Environment injection complete. Starting Nginx..."

# Execute Nginx (replacing current process)
exec "$@"
