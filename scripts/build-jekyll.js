#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔧 Building Jekyll blog...");

try {
  // Check if Jekyll is available
  try {
    execSync("jekyll --version", { stdio: "pipe" });
    console.log("✅ Jekyll is available");

    // Build Jekyll
    console.log("🏗️  Building Jekyll site...");
    execSync("jekyll build --destination .", { stdio: "inherit" });

    console.log("✅ Jekyll build completed successfully!");
    console.log("📝 Blog files generated:");
    console.log("   - blog.html (blog index)");
    console.log("   - blog/YYYY/MM/DD/title/ (individual posts)");
  } catch (error) {
    console.log("⚠️  Jekyll not available locally. Skipping Jekyll build...");
    console.log(
      "📝 This is normal - Jekyll will be built on Netlify during deployment."
    );
    console.log("💡 To test locally, you can:");
    console.log("   1. Install a newer Ruby version (2.7+)");
    console.log("   2. Use rbenv: brew install rbenv && rbenv install 3.0.0");
    console.log("   3. Or just deploy to Netlify - it will build Jekyll there");
  }
} catch (error) {
  console.error("❌ Build process failed:", error.message);
  process.exit(1);
}
