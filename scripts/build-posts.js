#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Simple frontmatter parser (since we don't want to add dependencies for this)
function parseFrontmatter(content) {
  const parts = content.split("---");
  if (parts.length < 3) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterRaw = parts[1].trim();
  const body = parts.slice(2).join("---").trim();

  const frontmatter = {};
  const lines = frontmatterRaw.split("\n");
  let currentKey = null;
  let currentArray = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) return;

    // Check if this is a new key-value pair
    const colonIndex = trimmedLine.indexOf(":");
    if (colonIndex > 0 && !trimmedLine.startsWith("  ")) {
      // Finish previous array if exists
      if (currentArray !== null) {
        frontmatter[currentKey] = currentArray;
        currentArray = null;
        currentKey = null;
      }

      const key = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();

      // Remove quotes
      value = value.replace(/^["']|["']$/g, "");

      // Handle boolean values
      if (value === "true") value = true;
      if (value === "false") value = false;

      // Check if this starts an array (YAML list format)
      if (value === "" || value === "[]") {
        currentKey = key;
        currentArray = [];
      } else {
        frontmatter[key] = value;
      }
    }
    // Check if this is an array item (starts with -)
    else if (trimmedLine.startsWith("- ") && currentArray !== null) {
      const item = trimmedLine
        .substring(2)
        .trim()
        .replace(/^["']|["']$/g, "");
      currentArray.push(item);
    }
    // Handle simple array format [item1, item2, item3]
    else if (
      typeof value === "string" &&
      value.startsWith("[") &&
      value.endsWith("]")
    ) {
      try {
        const arrayContent = value.slice(1, -1);
        value = arrayContent
          .split(",")
          .map((item) => item.trim().replace(/^["']|["']$/g, ""));
      } catch (e) {
        // If parsing fails, keep as string
      }
      frontmatter[key] = value;
    }
  });

  // Finish any remaining array
  if (currentArray !== null) {
    frontmatter[currentKey] = currentArray;
  }

  return { frontmatter, body };
}

// Main build function
function buildPosts() {
  console.log("🔍 Scanning for blog posts...");

  const postsDir = path.join(__dirname, "..", "assets", "blog", "posts");
  const outputFile = path.join(
    __dirname,
    "..",
    "assets",
    "blog",
    "posts-index.json"
  );

  // Check if posts directory exists
  if (!fs.existsSync(postsDir)) {
    console.error("❌ Posts directory not found:", postsDir);
    process.exit(1);
  }

  const posts = [];
  const files = fs.readdirSync(postsDir);

  console.log(`📁 Found ${files.length} files in posts directory`);

  files.forEach((filename) => {
    if (filename.endsWith(".md")) {
      const filePath = path.join(postsDir, filename);
      console.log(`📄 Processing: ${filename}`);

      try {
        const content = fs.readFileSync(filePath, "utf8");
        const { frontmatter, body } = parseFrontmatter(content);

        // Create post entry
        const post = {
          filename: filename,
          path: filename, // Relative path from blog/posts/
          title: frontmatter.title || "Untitled",
          summary: frontmatter.summary || "",
          date: frontmatter.date || new Date().toISOString(),
          draft: frontmatter.draft || false,
          tags: frontmatter.tags || [],
          cover_image: frontmatter.cover_image || "",
          category: frontmatter.category || "",
          // Add word count and reading time
          word_count: body.split(/\s+/).length,
          reading_time: Math.ceil(body.split(/\s+/).length / 200), // ~200 words per minute
        };

        // Only include non-draft posts by default (you can change this)
        if (!post.draft) {
          posts.push(post);
          console.log(`✅ Added: ${post.title}`);
        } else {
          console.log(`⏸️  Skipped draft: ${post.title}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
      }
    }
  });

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Create the index object
  const index = {
    generated_at: new Date().toISOString(),
    total_posts: posts.length,
    posts: posts,
  };

  // Write the index file
  try {
    fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));
    console.log(`✅ Generated posts index: ${outputFile}`);
    console.log(`📊 Total posts: ${posts.length}`);
    console.log("🎉 Build completed successfully!");
  } catch (error) {
    console.error("❌ Error writing index file:", error.message);
    process.exit(1);
  }
}

// Run the build
if (require.main === module) {
  buildPosts();
}

module.exports = { buildPosts, parseFrontmatter };
