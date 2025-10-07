#!/bin/bash

# Docker script to run Jekyll locally
# This allows you to test your blog without installing Ruby/Jekyll

echo "🐳 Starting Jekyll with Docker..."
echo "📝 Your blog will be available at: http://localhost:4000"
echo "🔄 Press Ctrl+C to stop the server"
echo ""

# Run Jekyll in Docker
docker run --rm \
  --volume="$PWD:/srv/jekyll" \
  --publish 4000:4000 \
  --publish 35729:35729 \
  jekyll/jekyll:4.2.2 \
  jekyll serve --livereload --host 0.0.0.0
