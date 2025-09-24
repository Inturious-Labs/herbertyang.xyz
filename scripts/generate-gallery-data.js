const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Determine if running from root or docusaurus directory
const isRunFromDocusaurus = fs.existsSync(path.join(process.cwd(), 'docusaurus.config.js'));
const rootDir = isRunFromDocusaurus ? process.cwd() : path.join(__dirname, '../docusaurus');
const GALLERY_DIR = path.join(rootDir, 'docs/gallery');
const OUTPUT_FILE = path.join(rootDir, 'src/data/galleryData.json');

function extractTitleFromContent(content) {
  // Extract title from markdown content (look for # Title)
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

function getFirstImageFromContent(content, albumPath) {
  // Look for markdown images ![alt](./img/image.jpg)
  const imageMatch = content.match(/!\[.*?\]\((\.\/img\/[^)]+)\)/);
  if (imageMatch) {
    const relativePath = imageMatch[1];
    // Convert ./img/image.jpg to /docs/gallery/year/album/img/image.jpg
    const albumRelativePath = path.relative(path.join(rootDir, 'docs'), albumPath);
    return `/docs/${albumRelativePath}/${relativePath.replace('./', '')}`;
  }
  return null;
}

function scanGalleryFolder() {
  const albumsData = {};
  
  if (!fs.existsSync(GALLERY_DIR)) {
    console.warn('Gallery directory not found:', GALLERY_DIR);
    return albumsData;
  }

  const years = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => /^\d{4}$/.test(name)) // Only year directories (4 digits)
    .sort((a, b) => b - a); // Sort descending

  for (const year of years) {
    const yearPath = path.join(GALLERY_DIR, year);
    albumsData[year] = [];

    const albums = fs.readdirSync(yearPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const albumSlug of albums) {
      const albumPath = path.join(yearPath, albumSlug);
      
      // Look for index.md or index.mdx
      const indexMd = path.join(albumPath, 'index.md');
      const indexMdx = path.join(albumPath, 'index.mdx');
      
      let indexFile = null;
      if (fs.existsSync(indexMdx)) {
        indexFile = indexMdx;
      } else if (fs.existsSync(indexMd)) {
        indexFile = indexMd;
      }

      if (!indexFile) {
        console.warn(`No index file found for album: ${year}/${albumSlug}`);
        continue;
      }

      try {
        const fileContent = fs.readFileSync(indexFile, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);

        // Extract album information
        let title = frontmatter.title || extractTitleFromContent(content) || albumSlug;
        let description = frontmatter.description || '';
        let coverImage = null;

        // Get cover image from frontmatter or first image in content
        if (frontmatter.image) {
          // Convert relative path to absolute path
          coverImage = `/docs/gallery/${year}/${albumSlug}/${frontmatter.image}`;
        } else {
          coverImage = getFirstImageFromContent(content, albumPath);
        }

        // Fallback: scan img directory for first image
        if (!coverImage) {
          const imgDir = path.join(albumPath, 'img');
          if (fs.existsSync(imgDir)) {
            const images = fs.readdirSync(imgDir)
              .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
              .sort();
            
            if (images.length > 0) {
              coverImage = `/docs/gallery/${year}/${albumSlug}/img/${images[0]}`;
            }
          }
        }

        albumsData[year].push({
          slug: albumSlug,
          title,
          description,
          coverImage,
          path: `/docs/gallery/${year}/${albumSlug}/`
        });

      } catch (error) {
        console.error(`Error processing album ${year}/${albumSlug}:`, error.message);
      }
    }
  }

  return albumsData;
}

function main() {
  console.log('🔍 Scanning gallery folders...');
  
  const albumsData = scanGalleryFolder();
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the generated data
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albumsData, null, 2));
  
  console.log('✅ Gallery data generated successfully!');
  console.log(`📁 Output: ${OUTPUT_FILE}`);
  
  // Log summary
  const totalAlbums = Object.values(albumsData).reduce((sum, albums) => sum + albums.length, 0);
  console.log(`📸 Found ${totalAlbums} albums across ${Object.keys(albumsData).length} years`);
}

if (require.main === module) {
  main();
}

module.exports = { scanGalleryFolder };