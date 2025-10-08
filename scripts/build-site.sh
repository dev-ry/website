#!/bin/bash

set -e  # Exit on error

echo "🏗️  Building Prosper XO website with Jekyll blog..."

# Step 1: Clean _site directory
echo "🧹 Cleaning _site directory..."
rm -rf _site
mkdir -p _site

# Step 2: Copy all static site files to _site
echo "📦 Copying static site files..."
rsync -av --exclude='_site' \
          --exclude='node_modules' \
          --exclude='vendor' \
          --exclude='.git' \
          --exclude='_posts' \
          --exclude='_layouts' \
          --exclude='_includes' \
          --exclude='blog.html' \
          --exclude='Gemfile*' \
          --exclude='_config.yml' \
          --exclude='docker-jekyll.sh' \
          --exclude='scripts' \
          . _site/

# Step 3: Build Jekyll blog (this will add blog files to _site)
echo "📝 Building Jekyll blog..."
bundle exec jekyll build

# Step 4: Build posts index
echo "📊 Building posts index..."
npm run build:posts

echo "✅ Build complete! Site is ready in _site/"
echo "📁 Blog available at /blog/"
echo "🏠 Static site preserved at root"
