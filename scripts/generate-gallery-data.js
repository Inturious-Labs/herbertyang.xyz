/**
 * Gallery Data Generator for Herbert Yang Photography Website
 *
 * This script automatically scans all gallery directories and generates galleryData.json
 * which powers the main gallery index page navigation. It runs automatically during:
 * - npm run start (development server)
 * - npm run build (production build)
 * - npm run generate-gallery (manual trigger)
 *
 * Input:  docs/gallery/YYYY/album-name/index.mdx files
 * Output: src/data/galleryData.json (used by gallery index page)
 *
 * The generated JSON contains metadata for each gallery: title, description,
 * cover image, and navigation path organized by year.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration: Gallery source directory and output file
const GALLERY_DIR = path.join(__dirname, '../docs/gallery');
const OUTPUT_FILE = path.join(__dirname, '../src/data/galleryData.json');

/**
 * Utility Functions for Extracting Gallery Metadata
 */

function extractTitleFromContent(content) {
  // Extract title from markdown content (look for # Title)
  // Fallback when frontmatter doesn't have a title
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

function getFirstImageFromContent(content, albumPath) {
  // Look for markdown images ![alt](./img/image.jpg) in content body
  // Used as fallback when frontmatter doesn't specify cover image
  const imageMatch = content.match(/!\[.*?\]\((\.\/img\/[^)]+)\)/);
  if (imageMatch) {
    const relativePath = imageMatch[1];
    // Convert ./img/image.jpg to /docs/gallery/year/album/img/image.jpg
    const albumRelativePath = path.relative(path.join(__dirname, '../docs'), albumPath);
    return `/docs/${albumRelativePath}/${relativePath.replace('./', '')}`;
  }
  return null;
}

/**
 * Main Gallery Scanner Function
 *
 * Scans the entire gallery directory structure and extracts metadata from each gallery.
 * Expected directory structure:
 *   docs/gallery/
 *   ├── 2023/
 *   │   ├── album-name-1/
 *   │   │   └── index.mdx
 *   │   └── album-name-2/
 *   │       └── index.mdx
 *   └── 2024/
 *       └── album-name-3/
 *           └── index.mdx
 *
 * Returns: Object organized by year, containing array of gallery metadata
 */
function scanGalleryFolder() {
  const albumsData = {};

  // Verify gallery directory exists
  if (!fs.existsSync(GALLERY_DIR)) {
    console.warn('Gallery directory not found:', GALLERY_DIR);
    return albumsData;
  }

  // Step 1: Find all year directories (2012, 2013, 2024, etc.)
  const years = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => /^\d{4}$/.test(name)) // Only year directories (4 digits)
    .sort((a, b) => b - a); // Sort descending (newest first)

  // Step 2: Process each year directory
  for (const year of years) {
    const yearPath = path.join(GALLERY_DIR, year);
    albumsData[year] = [];

    // Step 3: Find all album directories within the year
    const albums = fs.readdirSync(yearPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Step 4: Process each album directory
    for (const albumSlug of albums) {
      const albumPath = path.join(yearPath, albumSlug);

      // Step 5: Look for index.md or index.mdx (gallery metadata file)
      const indexMd = path.join(albumPath, 'index.md');
      const indexMdx = path.join(albumPath, 'index.mdx');

      let indexFile = null;
      if (fs.existsSync(indexMdx)) {
        indexFile = indexMdx; // Prefer .mdx files
      } else if (fs.existsSync(indexMd)) {
        indexFile = indexMd;   // Fallback to .md files
      }

      if (!indexFile) {
        console.warn(`No index file found for album: ${year}/${albumSlug}`);
        continue; // Skip albums without metadata files
      }

      try {
        // Step 6: Parse the index.mdx file to extract frontmatter and content
        const fileContent = fs.readFileSync(indexFile, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);

        // Step 7: Extract gallery metadata with fallbacks
        // Priority: frontmatter.title > markdown H1 > directory name
        let title = frontmatter.title || extractTitleFromContent(content) || albumSlug;
        let description = frontmatter.description || '';
        let coverImage = null;

        // Step 8: Determine cover image for gallery thumbnail
        // Priority: frontmatter.image > first image in content > auto-scan img directory
        if (frontmatter.image) {
          let imagePath = frontmatter.image;

          // Step 8a: Fix common typos in image extensions
          if (imagePath.endsWith('.jpt')) {
            imagePath = imagePath.replace('.jpt', '.jpg');
          }

          // Step 8b: Handle different path formats and convert to standardized format
          if (imagePath.startsWith('/docs/gallery/')) {
            // Legacy absolute path - attempt to upgrade to new web directory structure
            const filename = path.basename(imagePath);

            // Try watermarked version first (preferred for gallery thumbnails)
            let webImagePath = `/docs/gallery/${year}/${albumSlug}/img/web/watermarked_${filename}`;
            let webImageFullPath = path.join(__dirname, '..', webImagePath.replace('/docs/', 'docs/'));

            if (fs.existsSync(webImageFullPath)) {
              coverImage = webImagePath;
            } else {
              // Try non-watermarked version in web directory
              webImagePath = `/docs/gallery/${year}/${albumSlug}/img/web/${filename}`;
              webImageFullPath = path.join(__dirname, '..', webImagePath.replace('/docs/', 'docs/'));

              if (fs.existsSync(webImageFullPath)) {
                coverImage = webImagePath;
              } else {
                // Fallback to original path if web version doesn't exist
                coverImage = imagePath;
              }
            }
          } else if (imagePath.startsWith('/img/gallery/')) {
            // Malformed absolute path - extract filename and standardize
            const pathParts = imagePath.split('/');
            const filename = pathParts[pathParts.length - 1];
            coverImage = `/docs/gallery/${year}/${albumSlug}/img/${filename}`;
          } else if (imagePath.startsWith('/')) {
            // Other absolute path formats - convert to gallery-relative path
            coverImage = `/docs/gallery/${year}/${albumSlug}${imagePath}`;
          } else {
            // Relative path - convert to absolute gallery path
            // Handle both "./img/path" and "img/path" formats
            const cleanPath = imagePath.startsWith('./') ? imagePath.substring(2) : imagePath;
            coverImage = `/docs/gallery/${year}/${albumSlug}/${cleanPath}`;
          }
        } else {
          // Step 8c: No frontmatter image specified - extract from content
          coverImage = getFirstImageFromContent(content, albumPath);
        }

        // Step 8d: Final fallback - auto-scan img directory for first available image
        if (!coverImage) {
          // Try the web directory first (modern three-tier structure: originals/ | web/ | thumbs/)
          const webDir = path.join(albumPath, 'img', 'web');
          if (fs.existsSync(webDir)) {
            const images = fs.readdirSync(webDir)
              .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
              .sort();

            if (images.length > 0) {
              // Prefer watermarked images if available (better for gallery thumbnails)
              const watermarkedImage = images.find(img => img.startsWith('watermarked_'));
              const selectedImage = watermarkedImage || images[0];
              coverImage = `/docs/gallery/${year}/${albumSlug}/img/web/${selectedImage}`;
            }
          }

          // Fallback to legacy img directory structure (two-tier: img/ | thumbs/)
          if (!coverImage) {
            const imgDir = path.join(albumPath, 'img');
            if (fs.existsSync(imgDir)) {
              const images = fs.readdirSync(imgDir)
                .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                .filter(file => !file.startsWith('.')) // Exclude hidden files like .DS_Store
                .sort();

              if (images.length > 0) {
                coverImage = `/docs/gallery/${year}/${albumSlug}/img/${images[0]}`;
              }
            }
          }
        }

        // Step 9: Create gallery metadata object for the index page
        // Remove number prefix from albumSlug for URL routing (Docusaurus auto-removes them)
        const pathSlug = albumSlug.replace(/^\d+-/, '');

        // Step 10: Add gallery to the year's album collection
        albumsData[year].push({
          slug: albumSlug,        // Original directory name (e.g., "01-kennedy-space-center")
          title,                  // Display title from frontmatter or H1 or directory name
          description,            // Description from frontmatter
          coverImage,             // Thumbnail image path for gallery index
          path: `/docs/gallery/${year}/${pathSlug}/`  // URL path for navigation
        });

      } catch (error) {
        console.error(`Error processing album ${year}/${albumSlug}:`, error.message);
      }
    }
  }

  return albumsData;
}

/**
 * Main Execution Function
 *
 * Orchestrates the complete gallery data generation process:
 * 1. Scans all gallery directories for metadata
 * 2. Generates galleryData.json for the gallery index page
 * 3. Provides console feedback and statistics
 */
function main() {
  console.log('🔍 Scanning gallery folders...');

  // Step 1: Scan all gallery directories and extract metadata
  const albumsData = scanGalleryFolder();

  // Step 2: Ensure output directory exists (create src/data/ if needed)
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Step 3: Write the gallery data JSON file (used by gallery index page)
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(albumsData, null, 2));

  // Step 4: Provide user feedback and statistics
  console.log('✅ Gallery data generated successfully!');
  console.log(`📁 Output: ${OUTPUT_FILE}`);

  // Calculate and display summary statistics
  const totalAlbums = Object.values(albumsData).reduce((sum, albums) => sum + albums.length, 0);
  console.log(`📸 Found ${totalAlbums} albums across ${Object.keys(albumsData).length} years`);
}

/**
 * Script Execution and Module Export
 */

// Run main() if this script is executed directly (not imported as module)
if (require.main === module) {
  main();
}

// Export scanGalleryFolder for programmatic use by other scripts
module.exports = { scanGalleryFolder };