#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const title = process.argv[2];
if (!title) {
  console.error("Usage: npm run new-post -- \"Your Post Title\" [--slug my-slug] [--tags tag1,tag2] [--publish]");
  process.exit(1);
}

const args = process.argv.slice(3);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return null;
  return args[idx + 1] || null;
}

const today = new Date();
const dateStr = today.toISOString().split("T")[0];
const year = today.getFullYear().toString();

const slugArg = getArg("slug");
const slug = slugArg || title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

if (!slug) {
  console.error("Could not generate a slug from the title. Use --slug to provide one manually.");
  console.error("Example: npm run new-post -- \"你的标题\" --slug your-slug");
  process.exit(1);
}

const isPublish = args.includes("--publish");

const tagsArg = getArg("tags");
const tags = tagsArg
  ? [year, ...tagsArg.split(",").map((t) => t.trim())]
  : [year];

const dirName = `${dateStr}-${slug}`;
const postDir = path.join(__dirname, "..", "blog", year, dirName);
const imgDir = path.join(postDir, "img");

if (fs.existsSync(postDir)) {
  console.error(`Post directory already exists: ${postDir}`);
  process.exit(1);
}

fs.mkdirSync(postDir, { recursive: true });
fs.mkdirSync(imgDir);

const tagsJson = JSON.stringify(tags);
const frontmatter = `---
title: "${title}"
slug: ${slug}
date: ${dateStr}
tags: ${tagsJson}
keywords: ["${slug}"]
draft: ${isPublish ? "false" : "true"}
# image: "./img/cover.jpg"
---

Write your post here.

<!-- truncate -->

Continue writing...
`;

const indexPath = path.join(postDir, "index.md");
fs.writeFileSync(indexPath, frontmatter);

console.log(`Created: blog/${year}/${dirName}/`);
console.log(`  - index.md`);
console.log(`  - img/`);
console.log(`\nEdit: ${indexPath}`);
