#!/usr/bin/env node

/**
 * Three-Tier Gallery Processor for Herbert Yang Photography
 *
 * UNIFIED WORKFLOW TOOL: Converts photographer's edited originals into a complete gallery
 *
 * PURPOSE & WORKFLOW INTEGRATION:
 * - Integrates with photography workflow: shoot → edit → serialize → process → publish
 * - Bridges the gap between photo editing and web publishing
 * - Automates tedious manual processing while preserving creative control
 *
 * THREE-TIER ARCHITECTURE:
 * Set A: originals/     - Master archive (full resolution, photographer's final edits)
 * Set B: web/          - Web-optimized display (≤1200px, watermarked, 85% quality)
 * Set C: thumbs/       - Grid thumbnails (300px, 80% quality, instant loading)
 *
 * KEY FEATURES:
 * - Smart Sync: Preserves custom captions when adding/removing photos
 * - Watermark Integration: Applies consistent branding to web images
 * - TypeScript Generation: Creates album.ts with actual image dimensions
 * - SEO Optimization: Generates index.mdx with metadata and structured data
 * - EXIF Handling: Auto-rotates images based on camera orientation data
 *
 * TECHNOLOGY STACK:
 * - Sharp: High-performance image resizing and EXIF processing
 * - Canvas: Pixel-level watermark compositing and color manipulation
 * - Hybrid approach: Sharp for speed, Canvas for precise watermark control
 */

const fs = require('fs');
const path = require('path');

/**
 * Dependency Loading with Graceful Fallback
 *
 * WHY COMPLEX LOADING: Script runs from different contexts (gallery dir, project root)
 * WHY CANVAS SEPARATE: Watermarking requires pixel-level control unavailable in Sharp
 * WHY SHARP SEPARATE: High-performance resizing and EXIF handling
 */
let sharp, createCanvas, loadImage;

try {
  ({ createCanvas, loadImage } = require('canvas'));
} catch (error) {
  try {
    // Multi-context path resolution: script can run from gallery dir or project root
    const scriptDir = path.dirname(__filename);
    const docusaurusPath = path.join(scriptDir, '../node_modules/canvas');
    ({ createCanvas, loadImage } = require(docusaurusPath));
  } catch (error2) {
    try {
      ({ createCanvas, loadImage } = require('./node_modules/canvas'));
    } catch (error3) {
      console.error('❌ Canvas module not found. Please install with:');
      console.error('   npm install canvas --save-dev');
    }
  }
}

/**
 * Gallery Processing Engine
 *
 * DESIGN PHILOSOPHY:
 * - Configuration over convention: Flexible options for different gallery types
 * - Performance optimization: Efficient processing of large photo collections
 * - Quality preservation: Maintain image fidelity while optimizing for web
 * - Brand consistency: Uniform watermarking across all galleries
 */
class GalleryProcessor {
  constructor(watermarkPath, options = {}) {
    this.watermarkPath = watermarkPath;

    // Production-tested settings optimized for web performance and quality
    this.options = {
      webMaxWidth: 1200,        // Sweet spot: high quality without excessive file size
      webMaxHeight: 1200,       // Maintains aspect ratio while constraining dimensions
      webQuality: 85,           // JPEG quality: balances sharpness with file size
      thumbSize: 300,           // Grid thumbnail size: fast loading for masonry layout
      thumbQuality: 80,         // Thumbnail quality: acceptable for grid preview
      watermarkOpacity: 1.0,    // Full opacity for brand visibility
      watermarkScale: 0.28,     // 28% of image width: visible but not intrusive
      watermarkPosition: 'bottom-right',  // Standard branding placement
      watermarkMargin: 20,      // Pixel margin from edges
      ...options                // Allow override for special cases
    };
  }

  /**
   * Dynamic Sharp Module Loading
   *
   * WHY DYNAMIC LOADING: Sharp is a native module with specific installation requirements
   * WHY MULTIPLE PATHS: Script executed from different working directories (gallery vs project root)
   * WHY ESSENTIAL: Sharp provides the fastest, highest-quality image processing available in Node.js
   */
  async ensureSharp() {
    if (!sharp) {
      try {
        // Path priority: global → project context → gallery context → absolute fallback
        const possiblePaths = [
          'sharp',                                         // Global or local node_modules
          './node_modules/sharp',               // From project root
          '../../../../../node_modules/sharp',  // From deep gallery directory
          path.join(__dirname, '../node_modules/sharp')  // Absolute path
        ];

        for (const sharpPath of possiblePaths) {
          try {
            sharp = require(sharpPath);
            console.log(`✅ Found Sharp at: ${sharpPath}`);
            break;
          } catch (e) {
            // Silent failure: continue to next path
          }
        }

        if (!sharp) {
          throw new Error('Sharp module not found in any expected location');
        }
      } catch (error) {
        console.error('❌ Sharp not found:', error.message);
        throw new Error('Sharp is required for image processing. Please ensure it is installed in node_modules');
      }
    }
  }

  /**
   * Watermark Color Conversion for Maximum Visibility
   *
   * BUSINESS NEED: Brand protection requires watermarks to be visible on all backgrounds
   * TECHNICAL SOLUTION: Convert black logo to white while preserving transparency
   * WHY PIXEL-LEVEL: Canvas provides precise color control unavailable in image libraries
   * ALGORITHM: Iterate through RGBA pixels, convert non-transparent pixels to white
   */
  async convertWatermarkToWhite(watermarkImage) {
    if (!createCanvas || !loadImage) {
      throw new Error('Canvas not available for watermark processing');
    }

    const canvas = createCanvas(watermarkImage.width, watermarkImage.height);
    const ctx = canvas.getContext('2d');

    // Draw original watermark onto canvas for pixel manipulation
    ctx.drawImage(watermarkImage, 0, 0);

    // Get pixel data for color manipulation
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert to white while preserving alpha transparency
    // RGBA format: [R, G, B, A, R, G, B, A, ...]
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {              // Only modify non-transparent pixels
        data[i] = 255;              // Red channel: full intensity
        data[i + 1] = 255;          // Green channel: full intensity
        data[i + 2] = 255;          // Blue channel: full intensity
        // Alpha channel (i + 3) preserved as-is for proper transparency
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;  // Return Canvas object (NOT Buffer) for watermark compositing
  }

  /**
   * Watermark Asset Loading and Preparation
   *
   * GRACEFUL DEGRADATION: Photos process without watermarks if loading fails
   * COLOR OPTIMIZATION: Converts logo to white for visibility on dark photos
   * ERROR HANDLING: Non-blocking failures ensure gallery processing continues
   */
  async loadWatermark() {
    if (!this.watermarkPath || !fs.existsSync(this.watermarkPath)) {
      return null;
    }

    try {
      if (createCanvas && loadImage) {
        // Load and convert to white for maximum visibility across all photo types
        const originalWatermark = await loadImage(this.watermarkPath);
        const whiteWatermark = await this.convertWatermarkToWhite(originalWatermark);
        return whiteWatermark;
      }
      // Fallback: return raw buffer if Canvas unavailable
      return fs.readFileSync(this.watermarkPath);
    } catch (error) {
      // Non-fatal: continue processing without watermarks
      console.warn('⚠️  Could not load watermark:', error.message);
      return null;
    }
  }

  /**
   * Watermark Positioning Calculator
   *
   * BRAND CONSISTENCY: Standardized placement across all galleries
   * FLEXIBILITY: Multiple position options for different composition types
   * BOUNDARY SAFETY: Ensures watermark stays within image bounds
   */
  calculateWatermarkPosition(imageWidth, imageHeight, watermarkWidth, watermarkHeight) {
    const { watermarkPosition, watermarkMargin } = this.options;
    let x, y;

    // Position calculation based on standard branding guidelines
    switch (watermarkPosition) {
      case 'bottom-right':
        // Default: unobtrusive placement that doesn't interfere with composition
        x = imageWidth - watermarkWidth - watermarkMargin;
        y = imageHeight - watermarkHeight - watermarkMargin;
        break;
      case 'bottom-left':
        x = watermarkMargin;
        y = imageHeight - watermarkHeight - watermarkMargin;
        break;
      case 'top-right':
        x = imageWidth - watermarkWidth - watermarkMargin;
        y = watermarkMargin;
        break;
      case 'top-left':
        x = watermarkMargin;
        y = watermarkMargin;
        break;
      case 'center':
        // Rarely used: for special branding requirements
        x = (imageWidth - watermarkWidth) / 2;
        y = (imageHeight - watermarkHeight) / 2;
        break;
      default:
        // Fallback to bottom-right for consistency
        x = imageWidth - watermarkWidth - watermarkMargin;
        y = imageHeight - watermarkHeight - watermarkMargin;
    }

    // Boundary protection: prevent watermark from going outside image bounds
    return { x: Math.max(0, x), y: Math.max(0, y) };
  }

  /**
   * Web Image Processing with Integrated Watermarking
   *
   * DUAL STRATEGY APPROACH:
   * - Path A: Sharp-only for non-watermarked (fastest)
   * - Path B: Sharp + Canvas hybrid for watermarked (highest quality)
   *
   * WHY HYBRID APPROACH: Sharp excels at resizing, Canvas excels at compositing
   * WHY FALLBACK: Ensures processing continues even if watermarking fails
   * QUALITY PRIORITY: Maintains photographer's artistic intent while optimizing for web
   */
  async processToWeb(inputPath, outputPath, watermark = null) {
    await this.ensureSharp();

    console.log(`🌐 Processing for web: ${path.basename(inputPath)}`);

    if (!watermark) {
      // Fast path: Sharp-only processing for maximum performance
      await sharp(inputPath)
        .rotate()                    // Auto-rotate based on EXIF orientation
        .resize(this.options.webMaxWidth, this.options.webMaxHeight, {
          fit: 'inside',             // Maintain aspect ratio
          withoutEnlargement: true   // Never upscale small images
        })
        .jpeg({ quality: this.options.webQuality })
        .toFile(outputPath);
      return;
    }

    // Complex path: Sharp + Canvas for watermark compositing
    try {
      // Step 1: Optimize image with Sharp (EXIF handling + resizing)
      const tempBuffer = await sharp(inputPath)
        .rotate()                    // Critical: fixes camera orientation issues
        .resize(this.options.webMaxWidth, this.options.webMaxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: this.options.webQuality })
        .toBuffer();

      // Step 2: Load optimized image into Canvas for watermark compositing
      const resizedImage = await loadImage(tempBuffer);

      // Step 3: Calculate proportional watermark sizing
      const watermarkScale = this.options.watermarkScale;
      const watermarkWidth = Math.floor(resizedImage.width * watermarkScale);

      // Maintain watermark aspect ratio
      const watermarkHeight = Math.floor(watermark.height * (watermarkWidth / watermark.width));

      // Step 4: Create composite canvas
      const canvas = createCanvas(resizedImage.width, resizedImage.height);
      const ctx = canvas.getContext('2d');

      // Step 5: Composite image + watermark
      ctx.drawImage(resizedImage, 0, 0);  // Base layer: optimized photo

      // Calculate brand-consistent positioning
      const position = this.calculateWatermarkPosition(
        resizedImage.width,
        resizedImage.height,
        watermarkWidth,
        watermarkHeight
      );

      // Apply watermark with transparency control
      ctx.globalAlpha = this.options.watermarkOpacity;
      ctx.drawImage(watermark, position.x, position.y, watermarkWidth, watermarkHeight);
      ctx.globalAlpha = 1.0;              // Reset for future operations

      // Step 6: Export final watermarked image
      const buffer = canvas.toBuffer('image/jpeg', { quality: this.options.webQuality / 100 });
      fs.writeFileSync(outputPath, buffer);

    } catch (error) {
      // Graceful degradation: continue without watermark rather than fail completely
      console.warn(`⚠️  Could not apply watermark to ${path.basename(inputPath)}:`, error.message);
      console.warn(`⚠️  Falling back to non-watermarked version`);

      // Fallback to fast path processing
      await sharp(inputPath)
        .rotate()
        .resize(this.options.webMaxWidth, this.options.webMaxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: this.options.webQuality })
        .toFile(outputPath);
    }
  }

  /**
   * Thumbnail Generation for Grid Display
   *
   * PERFORMANCE OPTIMIZATION: Small thumbnails enable instant gallery browsing
   * LAZY LOADING STRATEGY: Thumbnails load first, full images on-demand
   * QUALITY BALANCE: Lower quality acceptable for grid preview
   * WHY NO WATERMARKS: Thumbnails too small for effective brand visibility
   */
  async processToThumb(inputPath, outputPath) {
    await this.ensureSharp();

    console.log(`🖼️  Generating thumbnail: ${path.basename(inputPath)}`);

    await sharp(inputPath)
      .rotate()                      // Auto-rotate based on EXIF orientation
      .resize(this.options.thumbSize, this.options.thumbSize, {
        fit: 'inside',               // Maintain aspect ratio within bounds
        withoutEnlargement: true     // Never upscale small images
      })
      .jpeg({ quality: this.options.thumbQuality })  // Lower quality for faster loading
      .toFile(outputPath);
  }

  /**
   * Gallery Processing Orchestrator
   *
   * CORE WORKFLOW: originals/ → web/ + thumbs/ → album.ts + index.mdx
   * BATCH PROCESSING: Efficiently handles entire photo collections
   * ALWAYS REGENERATE: Ensures latest watermarks and quality settings applied
   * ERROR ISOLATION: Individual photo failures don't stop batch processing
   */
  async processGallery(galleryPath, options = {}) {
    const { dryRun = false, force = false } = options;

    console.log(`\n🎨 Processing gallery: ${galleryPath}`);

    // Validate gallery structure
    if (!fs.existsSync(galleryPath)) {
      throw new Error(`Gallery not found: ${galleryPath}`);
    }

    // Locate photographer's edited originals (input source)
    const imgOriginalsPath = path.join(galleryPath, 'img/originals');

    if (!fs.existsSync(imgOriginalsPath)) {
      throw new Error(`Source images directory not found: ${imgOriginalsPath}`);
    }

    // Discover all processable images, excluding generated files
    const sourceImages = fs.readdirSync(imgOriginalsPath)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))           // Standard photo formats
      .filter(file => !file.startsWith('watermarked_'))           // Exclude generated files
      .filter(file => !file.startsWith('thumb'))                  // Exclude thumbnails
      .map(file => path.join(imgOriginalsPath, file));

    if (sourceImages.length === 0) {
      console.log('⚠️  No source images found');
      return { processed: 0, skipped: 0 };
    }

    console.log(`📸 Found ${sourceImages.length} source images`);

    // Define three-tier output structure
    const imgDir = path.join(galleryPath, 'img');
    const webDir = path.join(imgDir, 'web');
    const thumbsDir = path.join(imgDir, 'thumbs');

    // Load brand watermark for web images
    const watermark = await this.loadWatermark();
    if (watermark) {
      console.log('✅ Watermark loaded successfully');
    } else {
      console.log('⚠️  No watermark found - images will be processed without watermarks');
    }

    let processed = 0;
    let skipped = 0;

    // Process each original image into optimized web + thumbnail versions
    for (const sourcePath of sourceImages) {
      const filename = path.basename(sourcePath);
      const nameWithoutExt = path.parse(filename).name;
      const ext = path.parse(filename).ext.toLowerCase();

      // Generate standardized output filenames
      const webFile = path.join(webDir, `${nameWithoutExt}.jpg`);
      const thumbFile = path.join(thumbsDir, `thumb_${nameWithoutExt}.jpg`);

      if (dryRun) {
        console.log(`📋 Would process: ${filename}`);
        console.log(`   → ${path.relative(galleryPath, webFile)}`);
        console.log(`   → ${path.relative(galleryPath, thumbFile)}`);
        processed++;
        continue;
      }

      // ALWAYS REGENERATE: Ensures latest watermarks and quality settings
      // (No file existence checks - force fresh processing)

      try {
        // Generate web-optimized version with watermark
        await this.processToWeb(sourcePath, webFile, watermark);

        // Generate fast-loading thumbnail for grid
        await this.processToThumb(sourcePath, thumbFile);

        processed++;
      } catch (error) {
        // Individual failures don't stop batch processing
        console.error(`❌ Error processing ${filename}:`, error.message);
      }
    }

    console.log(`\n📊 Gallery processing complete:`);
    console.log(`   ✅ Processed: ${processed} images`);
    console.log(`   ⏭️  Skipped: ${skipped} images`);
    console.log(`   📁 Structure: originals/ | web/ | thumbs/`);

    return { processed, skipped, total: sourceImages.length };
  }

  generateAlbumName(galleryPath) {
    let folderName = path.basename(galleryPath);
    // If running from current directory, get the actual folder name
    if (folderName === '.') {
      folderName = path.basename(path.resolve(galleryPath));
    }
    // Convert folder name to camelCase for variable name
    return folderName.replace(/-([a-z0-9])/g, (match, letter) => letter.toUpperCase()) + 'Photos';
  }

  generateTitle(galleryPath) {
    let folderName = path.basename(galleryPath);
    // If running from current directory, get the actual folder name
    if (folderName === '.') {
      folderName = path.basename(path.resolve(galleryPath));
    }
    // Convert kebab-case to Title Case
    return folderName.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  async generateAlbumTs(galleryPath, options = {}) {
    const { dryRun = false } = options;
    const albumPath = path.join(galleryPath, 'album.ts');

    // Never overwrite existing album.ts (user may have added captions)
    if (fs.existsSync(albumPath)) {
      console.log('⏭️  album.ts exists - skipping to preserve user edits');
      return false;
    }

    const webDir = path.join(galleryPath, 'img/web');
    const thumbsDir = path.join(galleryPath, 'img/thumbs');

    if (!fs.existsSync(webDir) || !fs.existsSync(thumbsDir)) {
      console.log('⚠️  Web or thumbs directory not found - run image processing first');
      return false;
    }

    const webFiles = fs.readdirSync(webDir)
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .sort();

    if (webFiles.length === 0) {
      console.log('⚠️  No web images found');
      return false;
    }

    const albumName = this.generateAlbumName(galleryPath);

    if (dryRun) {
      console.log('📋 Would create album.ts with:');
      console.log(`   Variable name: ${albumName}`);
      console.log(`   Images: ${webFiles.length} entries`);
      return true;
    }

    let albumContent = `export const ${albumName} = [\n`;

    for (const webFile of webFiles) {
      const nameWithoutExt = path.parse(webFile).name;
      const thumbFile = `thumb_${nameWithoutExt}.jpg`;

      if (fs.existsSync(path.join(thumbsDir, thumbFile))) {
        // Extract caption from filename (remove number prefix)
        const caption = nameWithoutExt.replace(/^\d+_/, '').replace(/_/g, ' ');

        // Get actual dimensions from the thumbnail image (used for grid display)
        await this.ensureSharp();
        const thumbImagePath = path.join(thumbsDir, thumbFile);
        const metadata = await sharp(thumbImagePath).metadata();
        const width = metadata.width || 300;
        const height = metadata.height || 300;

        albumContent += `  {\n`;
        albumContent += `    src: require('./img/web/${webFile}').default,\n`;
        albumContent += `    width: ${width},\n`;
        albumContent += `    height: ${height},\n`;
        const folderName = galleryPath === '.' ? path.basename(path.resolve(galleryPath)) : path.basename(galleryPath);
        albumContent += `    alt: '${folderName}',\n`;
        albumContent += `    caption: "${caption}",\n`;
        albumContent += `    thumb: require('./img/thumbs/${thumbFile}').default,\n`;
        albumContent += `  },\n`;
      }
    }

    albumContent += `];\n`;

    fs.writeFileSync(albumPath, albumContent);
    console.log(`✅ Created album.ts with ${webFiles.length} images`);
    return true;
  }

  /**
   * Smart Sync for Album Configuration
   *
   * INTELLIGENT UPDATES: Preserves user customizations while syncing new images
   * CAPTION PRESERVATION: Maintains photographer's custom captions
   * BACKUP SAFETY: Creates backups before modifying existing files
   * CHANGE DETECTION: Reports exactly what was added/removed/preserved
   */
  async smartSyncAlbumTs(galleryPath, options = {}) {
    const { dryRun = false } = options;
    const albumPath = path.join(galleryPath, 'album.ts');

    if (!fs.existsSync(albumPath)) {
      console.log('📄 No existing album.ts found - creating new one');
      return await this.generateAlbumTs(galleryPath, options);
    }

    console.log('🔄 Smart syncing album.ts with current images...');

    const webDir = path.join(galleryPath, 'img/web');
    const thumbsDir = path.join(galleryPath, 'img/thumbs');

    if (!fs.existsSync(webDir) || !fs.existsSync(thumbsDir)) {
      console.log('⚠️  Web or thumbs directory not found - run image processing first');
      return false;
    }

    // Get current images from filesystem
    const webFiles = fs.readdirSync(webDir)
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .sort();

    if (webFiles.length === 0) {
      console.log('⚠️  No web images found');
      return false;
    }

    // Parse existing album.ts to preserve user customizations
    const albumContent = fs.readFileSync(albumPath, 'utf8');
    const existingEntries = new Map();

    // Extract existing entries with regex to preserve user captions
    const entryRegex = /{\s*src:\s*require\(['"]\.\/img\/web\/([^'"]+)['"]\)[^}]*caption:\s*["']([^"']*)['"]/g;
    let match;
    while ((match = entryRegex.exec(albumContent)) !== null) {
      const filename = match[1];
      const caption = match[2];
      existingEntries.set(filename, caption);
    }

    const albumName = this.generateAlbumName(galleryPath);
    let newAlbumContent = `export const ${albumName} = [\n`;

    await this.ensureSharp();
    let addedCount = 0;
    let preservedCount = 0;

    for (const webFile of webFiles) {
      const nameWithoutExt = path.parse(webFile).name;
      const thumbFile = `thumb_${nameWithoutExt}.jpg`;

      if (fs.existsSync(path.join(thumbsDir, thumbFile))) {
        // Get dimensions from thumbnail
        const thumbImagePath = path.join(thumbsDir, thumbFile);
        const metadata = await sharp(thumbImagePath).metadata();
        const width = metadata.width || 300;
        const height = metadata.height || 300;

        // Use existing caption if available, otherwise generate new one
        let caption;
        if (existingEntries.has(webFile)) {
          caption = existingEntries.get(webFile);
          preservedCount++;
        } else {
          caption = nameWithoutExt.replace(/^\d+_/, '').replace(/_/g, ' ');
          addedCount++;
        }

        const folderName = galleryPath === '.' ? path.basename(path.resolve(galleryPath)) : path.basename(galleryPath);

        newAlbumContent += `  {\n`;
        newAlbumContent += `    src: require('./img/web/${webFile}').default,\n`;
        newAlbumContent += `    width: ${width},\n`;
        newAlbumContent += `    height: ${height},\n`;
        newAlbumContent += `    alt: '${folderName}',\n`;
        newAlbumContent += `    caption: "${caption}",\n`;
        newAlbumContent += `    thumb: require('./img/thumbs/${thumbFile}').default,\n`;
        newAlbumContent += `  },\n`;
      }
    }

    newAlbumContent += `];\n`;

    // Calculate removed count
    const removedCount = existingEntries.size - preservedCount;

    if (dryRun) {
      console.log('📋 Smart sync would update album.ts:');
      console.log(`   ✅ Preserved: ${preservedCount} existing entries`);
      console.log(`   ➕ Added: ${addedCount} new entries`);
      console.log(`   ➖ Removed: ${removedCount} deleted entries`);
      return true;
    }

    // Create backup before updating
    const backupPath = `${albumPath}.backup`;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(albumPath, backupPath);
      console.log('💾 Created backup: album.ts.backup');
    }

    fs.writeFileSync(albumPath, newAlbumContent);
    console.log(`🔄 Smart synced album.ts:`);
    console.log(`   ✅ Preserved: ${preservedCount} existing entries with custom captions`);
    console.log(`   ➕ Added: ${addedCount} new entries`);
    console.log(`   ➖ Removed: ${removedCount} deleted entries`);
    console.log(`   📸 Total: ${webFiles.length} images`);

    return true;
  }

  async smartSyncIndexMdx(galleryPath, options = {}) {
    const { dryRun = false } = options;
    const indexPath = path.join(galleryPath, 'index.mdx');

    if (!fs.existsSync(indexPath)) {
      // Create new index.mdx if it doesn't exist
      return await this.generateIndexMdx(galleryPath, options);
    }

    const albumName = this.generateAlbumName(galleryPath);

    // Read existing index.mdx
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    // Check what needs updating
    const importRegex = /import\s+{\s*([^}]+)\s*}\s+from\s+['"]\.\/album['"];?/;
    const imagesPropRegex = /<PhotoGallery\s+images=\{([^}]+)\}/;
    const imageFieldRegex = /^image:\s*["']?([^"'\n]+)["']?/m;

    const importMatch = indexContent.match(importRegex);
    const imagesMatch = indexContent.match(imagesPropRegex);
    const imageFieldMatch = indexContent.match(imageFieldRegex);

    let needsUpdate = false;
    let updatedContent = indexContent;

    // Check import statement
    if (importMatch && imagesMatch) {
      const currentImportName = importMatch[1].trim();
      const currentImagesName = imagesMatch[1].trim();

      if (currentImportName !== albumName || currentImagesName !== albumName) {
        needsUpdate = true;
        console.log(`🔄 Syncing index.mdx import: ${currentImportName} → ${albumName}`);

        // Update both import and usage
        updatedContent = updatedContent.replace(importRegex, `import { ${albumName} } from './album';`);
        updatedContent = updatedContent.replace(imagesPropRegex, `<PhotoGallery images={${albumName}}`);
      }
    }

    // Check cover image path
    if (imageFieldMatch) {
      const currentImagePath = imageFieldMatch[1].trim();

      // Find first web image as cover
      const webDir = path.join(galleryPath, 'img/web');
      if (fs.existsSync(webDir)) {
        const webFiles = fs.readdirSync(webDir)
          .filter(file => /\.(jpg|jpeg)$/i.test(file))
          .sort();

        if (webFiles.length > 0) {
          const expectedCoverPath = `./img/web/${webFiles[0]}`;
          if (currentImagePath !== expectedCoverPath) {
            needsUpdate = true;
            console.log(`🔄 Syncing cover image: ${currentImagePath} → ${expectedCoverPath}`);
            updatedContent = updatedContent.replace(imageFieldRegex, `image: "${expectedCoverPath}"`);
          }
        }
      }
    }

    if (!needsUpdate) {
      console.log('✅ index.mdx is already in sync');
      return false;
    }

    if (dryRun) {
      console.log('📋 Would update index.mdx');
      return true;
    }

    fs.writeFileSync(indexPath, updatedContent);
    console.log('✅ Updated index.mdx');
    return true;
  }

  async generateIndexMdx(galleryPath, options = {}) {
    const { dryRun = false, force = false } = options;
    const indexPath = path.join(galleryPath, 'index.mdx');

    // Check if should overwrite existing index.mdx
    if (fs.existsSync(indexPath) && !force) {
      console.log('⏭️  index.mdx exists - skipping to preserve user edits (use --force to regenerate)');
      return false;
    }

    if (fs.existsSync(indexPath) && force) {
      console.log('🔄 Regenerating index.mdx due to --force flag');
    }

    const title = this.generateTitle(galleryPath);
    const albumName = this.generateAlbumName(galleryPath);

    // Use first image as cover
    const webDir = path.join(galleryPath, 'img/web');
    if (!fs.existsSync(webDir)) {
      console.log('⚠️  Web directory not found - run image processing first');
      return false;
    }

    const webFiles = fs.readdirSync(webDir)
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .sort();

    const coverImage = webFiles.length > 0 ? `./img/web/${webFiles[0]}` : '';

    if (dryRun) {
      console.log('📋 Would create index.mdx with:');
      console.log(`   Title: ${title}`);
      console.log(`   Cover image: ${coverImage}`);
      console.log(`   Rapport: enabled`);
      return true;
    }

    const indexContent = `---
title: "${title} - Photography by Herbert Yang"
description: "${title} photo gallery featuring ${webFiles.length} stunning images captured by Herbert Yang."
keywords: [${title.split(' ').join(', ')}, photography, gallery, Herbert Yang]
image: "${coverImage}"
---

import PhotoGallery from '@site/src/components/PhotoGallery';
import { ${albumName} } from './album';

# ${title}

<PhotoGallery images={${albumName}} />

<script src="https://kdcro-gqaaa-aaaai-q34gq-cai.icp0.io/ic-agent-bundle.js"></script>
<script src="https://kdcro-gqaaa-aaaai-q34gq-cai.icp0.io/ic-agent.js"></script>
<script src="https://kdcro-gqaaa-aaaai-q34gq-cai.icp0.io/widget.js?v=1.0.0"></script>
<div id="rapport"></div>
<script dangerouslySetInnerHTML={{__html: \`
  Rapport.init({
    canisterId: 'kedx2-liaaa-aaaai-q34ga-cai'
  });
\`}} />
`;

    fs.writeFileSync(indexPath, indexContent);
    console.log(`✅ Created index.mdx: "${title}" (with Rapport comments)`);
    return true;
  }

  async updateAlbumConfig(galleryPath, options = {}) {
    const { dryRun = false } = options;

    const albumPath = path.join(galleryPath, 'album.ts');
    if (!fs.existsSync(albumPath)) {
      console.log('⚠️  No album.ts file found');
      return false;
    }

    console.log('📝 Updating album configuration...');

    // Read current album
    const albumContent = fs.readFileSync(albumPath, 'utf8');

    // Generate new photo entries based on web/ and thumbs/ folders
    const webDir = path.join(galleryPath, 'web');
    const thumbsDir = path.join(galleryPath, 'thumbs');

    if (!fs.existsSync(webDir) || !fs.existsSync(thumbsDir)) {
      console.log('⚠️  Web or thumbs directory not found');
      return false;
    }

    const webFiles = fs.readdirSync(webDir)
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .sort();

    if (webFiles.length === 0) {
      console.log('⚠️  No web images found');
      return false;
    }

    // Generate new photo array entries
    const photoEntries = [];
    for (const webFile of webFiles) {
      const nameWithoutExt = path.parse(webFile).name;
      const thumbFile = `thumb_${nameWithoutExt}.jpg`;

      if (fs.existsSync(path.join(thumbsDir, thumbFile))) {
        photoEntries.push({
          webFile,
          thumbFile,
          nameWithoutExt
        });
      }
    }

    console.log(`📸 Generated ${photoEntries.length} photo entries`);

    if (dryRun) {
      console.log('📋 Dry run - would update album.ts with new structure');
      return true;
    }

    // Create backup
    const backupPath = `${albumPath}.backup`;
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(albumPath, backupPath);
    }

    // This is a placeholder for album.ts update logic
    console.log('📝 Album configuration ready for manual update');
    console.log('   Use the generated photoEntries to update your album.ts file');
    console.log(`   Web images: ${photoEntries.length} files in web/`);
    console.log(`   Thumbnails: ${photoEntries.length} files in thumbs/`);

    return true;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🎨 Three-Tier Gallery Processor for Herbert Yang Photography

Usage:
  node gallery-processor.js [options] <gallery-path>

Options:
  --watermark <path>     Path to watermark image (default: search for watermark files)
  --web-max <size>       Max width/height for web images (default: 1200)
  --thumb-size <size>    Thumbnail size (default: 300)
  --web-quality <num>    Web image JPEG quality (default: 85)
  --thumb-quality <num>  Thumbnail JPEG quality (default: 80)
  --dry-run             Preview changes without processing
  --force               Overwrite existing processed images
  --update-album        Update album.ts configuration
  --help, -h            Show this help

Note: All generated galleries include Rapport comments by default.

Examples:
  # Process single gallery with default settings
  node gallery-processor.js docs/gallery/2023/1-simingshan-dragon-boat

  # Dry run to preview changes
  node gallery-processor.js --dry-run docs/gallery/2023/1-simingshan-dragon-boat

  # Process with custom watermark and sizes
  node gallery-processor.js --watermark watermark.png --web-max 1600 --thumb-size 400 gallery/

  # Force reprocess existing files
  node gallery-processor.js --force gallery/
    `);
    return;
  }

  // Parse arguments
  // Find project root and construct absolute watermark path
  const scriptDir = path.dirname(__filename);
  const projectRoot = path.resolve(scriptDir, '..');
  let watermarkPath = path.join(projectRoot, 'static/img/herbert_watermark_no_bg.png');
  let galleryPath = null;
  let dryRun = false;
  let force = false;
  let updateAlbum = false;
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--watermark':
        watermarkPath = args[++i];
        break;
      case '--web-max':
        options.webMaxWidth = options.webMaxHeight = parseInt(args[++i]);
        break;
      case '--thumb-size':
        options.thumbSize = parseInt(args[++i]);
        break;
      case '--web-quality':
        options.webQuality = parseInt(args[++i]);
        break;
      case '--thumb-quality':
        options.thumbQuality = parseInt(args[++i]);
        break;
      case '--dry-run':
        dryRun = true;
        break;
      case '--force':
        force = true;
        break;
      case '--update-album':
        updateAlbum = true;
        break;
      default:
        if (!arg.startsWith('--') && !galleryPath) {
          galleryPath = arg;
        }
    }
  }

  if (!galleryPath) {
    console.error('❌ Please specify a gallery path');
    console.log('Use --help for usage information');
    process.exit(1);
  }

  try {
    const processor = new GalleryProcessor(watermarkPath, options);

    console.log('🎨 Herbert Yang Photography - Three-Tier Gallery Processor');
    console.log(`📁 Gallery: ${galleryPath}`);
    console.log(`🏷️  Watermark: ${watermarkPath}`);
    console.log(`⚙️  Settings: Web≤${options.webMaxWidth || 1200}px, Thumbs=${options.thumbSize || 300}px`);

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No files will be modified\n');
    }

    // Process images
    const result = await processor.processGallery(galleryPath, { dryRun, force });

    // Generate/sync documentation files (album.ts and index.mdx)
    console.log(`\n📝 Generating documentation files...`);
    await processor.smartSyncAlbumTs(galleryPath, { dryRun });
    await processor.smartSyncIndexMdx(galleryPath, { dryRun });

    // Update album config if requested (legacy support)
    if (updateAlbum) {
      await processor.updateAlbumConfig(galleryPath, { dryRun });
    }

    if (!dryRun) {
      console.log(`\n✨ Gallery setup complete! Your gallery now has:`);
      console.log(`   📂 img/originals/  - Master archive files`);
      console.log(`   🌐 img/web/        - Optimized & watermarked for display`);
      console.log(`   🖼️  img/thumbs/     - Fast-loading grid thumbnails`);
      console.log(`   📄 album.ts        - Image data for React components`);
      console.log(`   📄 index.mdx       - Gallery page with metadata`);
      console.log(`\n💡 Next steps:`);
      console.log(`   1. Edit index.mdx to add keywords, description, or content`);
      console.log(`   2. Edit album.ts to customize image captions`);
      console.log(`   3. Test the gallery in your development server`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = GalleryProcessor;