# Blog Build System

This document explains how the blog build system works and how to integrate it into your deployment process.

## Overview

The build system automatically scans all markdown files in `assets/blog/posts/` and generates a `posts-index.json` file that your frontend can use to display all posts without needing to know their names in advance.

## Files Created

- `package.json` - Node.js dependencies and build scripts
- `scripts/build-posts.js` - Main build script that scans posts
- `netlify.toml` - Netlify deployment configuration
- `assets/blog/posts-index.json` - Generated posts index (created by build script)

## How It Works

1. **Build Script** (`scripts/build-posts.js`):
   - Scans `assets/blog/posts/` directory for `.md` files
   - Parses frontmatter from each markdown file
   - Extracts metadata (title, date, tags, etc.)
   - Calculates word count and reading time
   - Generates `posts-index.json` with all post data

2. **Frontend** (`xo-insider/index.html`):
   - Fetches `posts-index.json` on page load
   - Displays all posts in styled cards
   - Shows metadata, cover images, tags, etc.

## Local Development

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Setup
```bash
# Install dependencies
npm install

# Run build script manually
npm run build

# Start local server (optional)
npm run dev
```

### Manual Build
```bash
# Just run the build script
node scripts/build-posts.js
```

## Deployment Integration

### Netlify (Recommended)

The `netlify.toml` file is already configured to run the build script on deployment:

```toml
[build]
  publish = "."
  command = "npm install && npm run build"
```

**What happens on deployment:**
1. Netlify installs Node.js dependencies (`npm install`)
2. Runs the build script (`npm run build`)
3. Generates `posts-index.json`
4. Deploys the site with the updated index

### Other Platforms

For other hosting platforms, add these commands to your build process:

```bash
# Install dependencies
npm install

# Run build script
npm run build
```

## Adding New Posts

### Via Decap CMS (Recommended)
1. Go to your CMS admin panel
2. Create a new post
3. The post will be saved to `assets/blog/posts/`
4. On next deployment, the build script will automatically include it

### Manually
1. Create a new `.md` file in `assets/blog/posts/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   summary: "Brief description"
   date: "2025-01-15T10:00:00Z"
   draft: false
   tags: ["tag1", "tag2"]
   cover_image: "/path/to/image.jpg"
   ---
   
   Your post content here...
   ```
3. Deploy or run `npm run build` locally

## Build Script Features

- **Automatic Discovery**: Finds all `.md` files in posts directory
- **Frontmatter Parsing**: Extracts metadata from YAML frontmatter
- **Draft Filtering**: Skips posts marked as `draft: true`
- **Sorting**: Orders posts by date (newest first)
- **Metadata**: Calculates word count and reading time
- **Error Handling**: Continues processing even if individual posts fail

## Generated Index Format

The `posts-index.json` file contains:

```json
{
  "generated_at": "2025-01-15T10:00:00.000Z",
  "total_posts": 2,
  "posts": [
    {
      "filename": "my-post.md",
      "path": "my-post.md",
      "title": "My Post Title",
      "summary": "Post summary",
      "date": "2025-01-15T10:00:00Z",
      "draft": false,
      "tags": ["tag1", "tag2"],
      "cover_image": "/path/to/image.jpg",
      "category": "Updates",
      "word_count": 250,
      "reading_time": 2
    }
  ]
}
```

## Troubleshooting

### Build Fails
- Check that Node.js is installed
- Ensure `assets/blog/posts/` directory exists
- Verify markdown files have valid frontmatter

### Posts Not Showing
- Check browser console for errors
- Verify `posts-index.json` was generated
- Ensure posts are not marked as `draft: true`

### Frontend Errors
- Check that `posts-index.json` is accessible
- Verify file paths are correct
- Check browser network tab for failed requests

## Customization

### Modify Build Script
Edit `scripts/build-posts.js` to:
- Change which posts are included
- Add custom metadata fields
- Modify sorting logic
- Change output format

### Modify Frontend
Edit `xo-insider/index.html` to:
- Change post display layout
- Add filtering or search
- Modify styling
- Add pagination

## Performance

- Build script runs only on deployment
- Frontend loads all posts at once (suitable for small-medium blogs)
- Consider pagination for large numbers of posts
- Posts index is cached by browser/CDN
