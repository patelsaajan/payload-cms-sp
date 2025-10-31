#!/bin/sh
set -e

echo "Running database migrations..."
node_modules/.bin/payload migrate --no-color || {
  echo "Migration failed, but continuing startup..."
}

echo "Starting application..."
exec node server.js
