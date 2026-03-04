# Prosper XO Website

This repository contains the source code for the **Prosper XO** website, which features a hybrid architecture combining a fast, fully-custom static HTML frontend with a powerful Jekyll-based blog engine and Decap CMS integration.

## 🏗️ Architecture & Tech Stack

- **Frontend**: Custom Static HTML, CSS, JavaScript (No complex frameworks for the main pages)
- **Blog Engine**: [Jekyll](https://jekyllrb.com/) (Ruby-powered static site generator)
- **Content Management**: [Decap CMS](https://decapcms.org/) (React-based Git CMS)
- **Scripting**: Node.js (for build scripts and utilities)
- **Hosting/Deployment**: [Netlify](https://www.netlify.com/)

## 📂 Directory Structure

```text
/
├── _layouts/                # Jekyll layouts for the blog
├── _posts/                  # Markdown files for blog posts
├── assets/                  # Images, CSS, JS, and Fonts
├── cms/                     # Decap CMS configuration and admin page
├── scripts/                 # Build scripts and utilities (e.g., QR Generataor)
├── index.html               # Main entry point (Splash page)
├── welcome/, team/, etc.    # Static HTML pages
├── blog.html                # Blog index template
├── package.json             # Node.js dependencies and NSR scripts
├── _config.yml              # Jekyll configuration
└── netlify.toml             # Netlify deployment configuration
```

## 🚀 Getting Started (Local Development)

### Prerequisites

You will need the following installed on your machine:

- **Node.js** (v14 or higher) and npm
- **Ruby** and **Bundler** (for the Jekyll blog)
- **Python 3** (for the local preview server)
- _(Optional)_ **Docker** (if you prefer running Jekyll in a container)

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies:**

   ```bash
   # Install Node.js dependencies
   npm install

   # Install Ruby gems for Jekyll
   bundle install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   This command builds the static site, runs Jekyll to generate the blog into `_site/`, and starts a local Python HTTP server at `http://localhost:8000`.

_Note: If you encounter issues installing Ruby/Jekyll locally, you can use the provided Docker script: `./docker-jekyll.sh`._

## 📝 Managing Blog Posts

The blog is fully integrated with **Decap CMS** so non-technical users can add, edit, and publish posts without touching any code.

### Option 1: Using Decap CMS (Recommended)

1. Navigate to `/cms/` on the live site or your local development server.
2. Log in using your configured Git gateway or credentials.
3. Use the CMS interface to draft or publish posts. They will automatically be committed to the `_posts/` directory.

### Option 2: Manually via Markdown

1. Create a new markdown file in the `_posts/` directory.
2. Follow the naming convention: `YYYY-MM-DD-your-title-here.md`
3. Include the standard Frontmatter at the top:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   summary: "A brief summary of the post."
   date: 2025-01-01 12:00:00 -0000
   tags: [tag1, tag2]
   cover_image: "/assets/blog/uploads/your-image.jpg"
   ---
   ```

_For more details on how the Jekyll integration functions without interfering with the static site routes, see [JEKYLL-INTEGRATION.md](./JEKYLL-INTEGRATION.md)._

## 🔌 Build Process Details

The build system employs a carefully orchestrated process to merge the static pages with the compiled Jekyll blog:

1. **Prepare Static Files**: Static contents are synchronized to `_site/`.
2. **Build Jekyll**: Jekyll compiles only the blog components into `_site/blog/`.
3. **Generate Indices**: `npm run build:posts` compiles a `posts-index.json` allowing dynamic frontend consumption of the blog list.

For a full breakdown of the build pipeline, refer to [BUILD-PROCESS.md](./BUILD-PROCESS.md) and [README-BUILD.md](./README-BUILD.md).

## 🧰 Utilities & Scripts

### QR Code Generator

The repository features a custom script to generate trackable QR codes for marketing campaigns.
See documentation under [scripts/qr-gen/README.md](./scripts/qr-gen/README.md) for usage instructions.

## 🌐 Deployment

Deployment is fully automated through **Netlify**. Committing to the `main` branch triggers a new deploy.
Netlify reads `netlify.toml` and executes:

```bash
bundle install && npm install && npm run build
```

This updates all dependencies, builds the complete static output into `_site/`, and publishes it globally.
