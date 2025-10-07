# Jekyll Integration for Prosper XO Website

This document explains how Jekyll has been integrated into the Prosper XO website to handle blog functionality while keeping the rest of the site as static HTML.

## Overview

- **Static Site**: The main website (index.html, team, events, etc.) remains as static HTML/CSS/JS
- **Blog Only**: Jekyll is used exclusively for the blog functionality
- **CMS Integration**: Decap CMS continues to work for blog post management
- **Netlify Deployment**: Both static site and Jekyll blog are deployed together

## File Structure

```
/
├── _config.yml              # Jekyll configuration
├── _layouts/                 # Jekyll layouts
│   ├── default.html         # Base layout with header/footer
│   ├── post.html            # Individual blog post layout
│   └── blog.html            # Blog index layout
├── _posts/                  # Blog posts (Jekyll format)
│   └── YYYY-MM-DD-title.md
├── _includes/               # Jekyll includes (empty for now)
├── blog.html                # Blog index page
├── assets/css/blog.css      # Blog-specific styles
├── cms/                     # Decap CMS admin
│   └── config.yml           # Updated for Jekyll structure
└── scripts/
    └── build-jekyll.js      # Jekyll build script
```

## Key Features

### 1. Jekyll Configuration (`_config.yml`)

- Only processes blog-related files
- Excludes all static site directories
- Uses custom permalink structure: `/blog/YYYY/MM/DD/title/`
- Includes only necessary assets

### 2. Layouts

- **default.html**: Base layout with Prosper XO header/footer
- **post.html**: Individual blog post layout with cover image, meta, content
- **blog.html**: Blog index with post previews

### 3. Blog Styling

- Responsive design
- Post previews with hover effects
- Cover image support
- Tag system
- Reading time estimation

### 4. CMS Integration

- Decap CMS configured to work with `_posts` directory
- Automatic filename generation: `YYYY-MM-DD-title.md`
- Includes layout field (hidden, defaults to "post")

## Build Process

### Local Development

```bash
# Install dependencies
npm install

# Build everything (posts + Jekyll)
npm run build

# Build only posts
npm run build:posts

# Build only Jekyll
npm run build:jekyll

# Start development server
npm run dev
```

### Netlify Deployment

The `netlify.toml` is configured to:

1. Install Ruby gems (`bundle install`)
2. Build Jekyll blog (`jekyll build`)
3. Run existing build process (`npm run build`)

## Blog Post Format

Blog posts in `_posts/` directory follow Jekyll conventions:

```markdown
---
layout: post
title: "Post Title"
summary: "Post summary"
tags:
  - tag1
  - tag2
draft: false
date: 2025-09-04 21:22:49 -0000
cover_image: /assets/blog/uploads/image.jpg
---

# Post Content

Your markdown content here...
```

## URL Structure

- Blog index: `/blog/`
- Individual posts: `/blog/YYYY/MM/DD/title/`
- Example: `/blog/2025/09/04/test-post-from-cms-admin-panel/`

## Adding New Posts

### Via Decap CMS

1. Go to `/cms/` on your site
2. Create new post
3. Posts are automatically saved to `_posts/` directory
4. Jekyll will process them on next build

### Manually

1. Create new file in `_posts/` directory
2. Use format: `YYYY-MM-DD-title.md`
3. Include proper frontmatter
4. Run build process

## Troubleshooting

### Jekyll Not Found

```bash
gem install jekyll
```

### Build Errors

1. Check `_config.yml` syntax
2. Verify frontmatter in posts
3. Ensure all layout files exist
4. Check file permissions

### CMS Issues

1. Verify `cms/config.yml` points to `_posts` directory
2. Check slug format matches Jekyll expectations
3. Ensure proper frontmatter fields

## Benefits of This Approach

1. **Non-Disruptive**: Existing static site remains unchanged
2. **Selective Processing**: Only blog content uses Jekyll
3. **CMS Compatible**: Decap CMS continues to work seamlessly
4. **Performance**: Static site performance maintained
5. **Flexibility**: Easy to add more Jekyll features if needed

## Future Enhancements

- Add blog categories
- Implement search functionality
- Add RSS feed
- Include related posts
- Add comment system
- Implement pagination for large numbers of posts
