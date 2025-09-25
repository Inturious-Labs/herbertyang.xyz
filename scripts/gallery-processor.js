#!/usr/bin/env node

/**
 * Three-Tier Gallery Processor for Herbert Yang Photography
 *
 * Processes photos into:
 * Set A: originals/     - Master archive (full res, no processing)
 * Set B: web/          - Web-optimized (≤1200px, watermarked)
 * Set C: thumbs/       - Grid thumbnails (300px, for lazy loading)
 */

const fs = require('fs');
const path = require('path');

// Try to require dependencies
let sharp, createCanvas, loadImage;

try {
  ({ createCanvas, loadImage } = require('canvas'));
} catch (error) {
  try {
    ({ createCanvas, loadImage } = require('./docusaurus/node_modules/canvas'));
  } catch (error2) {
    console.error('❌ Canvas module not found. Please install with:');
    console.error('   cd docusaurus && npm install canvas --save-dev');
  }
}

class GalleryProcessor {
  constructor(watermarkPath, options = {}) {
    this.watermarkPath = watermarkPath;
    this.options = {
      webMaxWidth: 1200,
      webMaxHeight: 1200,
      webQuality: 85,
      thumbSize: 300,
      thumbQuality: 80,
      watermarkOpacity: 1.0,
      watermarkScale: 0.28,
      watermarkPosition: 'bottom-right',
      watermarkMargin: 20,
      ...options
    };
  }

  async ensureSharp() {
    if (!sharp) {
      try {
        sharp = require('./docusaurus/node_modules/sharp');
        console.log('✅ Found Sharp in docusaurus/node_modules');
      } catch (error) {
        console.log('📦 Installing Sharp for image processing...');
        const { execSync } = require('child_process');
        try {
          execSync('cd docusaurus && npm install sharp --save-dev', { stdio: 'inherit' });
          sharp = require('./docusaurus/node_modules/sharp');
          console.log('✅ Sharp installed successfully');
        } catch (error2) {
          console.error('❌ Failed to install Sharp:', error2.message);
          throw new Error('Sharp is required for image processing');
        }
      }
    }
  }

  async convertWatermarkToWhite(watermarkImage) {
    if (!createCanvas || !loadImage) {
      throw new Error('Canvas not available for watermark processing');
    }

    const canvas = createCanvas(watermarkImage.width, watermarkImage.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(watermarkImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert to white while preserving alpha
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        data[i] = 255;     // Red
        data[i + 1] = 255; // Green
        data[i + 2] = 255; // Blue
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toBuffer('image/png');
  }

  async loadWatermark() {
    if (!this.watermarkPath || !fs.existsSync(this.watermarkPath)) {
      return null;
    }

    try {
      if (createCanvas && loadImage) {
        const originalWatermark = await loadImage(this.watermarkPath);
        const whiteWatermark = await this.convertWatermarkToWhite(originalWatermark);
        return whiteWatermark;
      }
      return fs.readFileSync(this.watermarkPath);
    } catch (error) {
      console.warn('⚠️  Could not load watermark:', error.message);
      return null;
    }
  }

  calculateWatermarkPosition(imageWidth, imageHeight, watermarkWidth, watermarkHeight) {
    const { watermarkPosition, watermarkMargin } = this.options;
    let left, top;

    switch (watermarkPosition) {
      case 'bottom-right':
        left = imageWidth - watermarkWidth - watermarkMargin;
        top = imageHeight - watermarkHeight - watermarkMargin;
        break;
      case 'bottom-left':
        left = watermarkMargin;
        top = imageHeight - watermarkHeight - watermarkMargin;
        break;
      case 'top-right':
        left = imageWidth - watermarkWidth - watermarkMargin;
        top = watermarkMargin;
        break;
      case 'top-left':
        left = watermarkMargin;
        top = watermarkMargin;
        break;
      case 'center':
        left = (imageWidth - watermarkWidth) / 2;
        top = (imageHeight - watermarkHeight) / 2;
        break;
      default:
        left = imageWidth - watermarkWidth - watermarkMargin;
        top = imageHeight - watermarkHeight - watermarkMargin;
    }

    return { left: Math.max(0, left), top: Math.max(0, top) };
  }

  async processToWeb(inputPath, outputPath, watermark = null) {
    await this.ensureSharp();

    console.log(`🌐 Processing for web: ${path.basename(inputPath)}`);

    let pipeline = sharp(inputPath)
      .resize(this.options.webMaxWidth, this.options.webMaxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: this.options.webQuality });

    // Add watermark if provided
    if (watermark) {
      try {
        const metadata = await pipeline.metadata();
        const watermarkWidth = Math.floor(metadata.width * this.options.watermarkScale);

        const resizedWatermark = await sharp(watermark)
          .resize(watermarkWidth)
          .png()
          .toBuffer();

        const watermarkMetadata = await sharp(resizedWatermark).metadata();
        const position = this.calculateWatermarkPosition(
          metadata.width,
          metadata.height,
          watermarkMetadata.width,
          watermarkMetadata.height
        );

        pipeline = pipeline.composite([{
          input: resizedWatermark,
          left: Math.round(position.left),
          top: Math.round(position.top)
        }]);
      } catch (error) {
        console.warn(`⚠️  Could not apply watermark to ${path.basename(inputPath)}:`, error.message);
      }
    }

    await pipeline.toFile(outputPath);
  }

  async processToThumb(inputPath, outputPath) {
    await this.ensureSharp();

    console.log(`🖼️  Generating thumbnail: ${path.basename(inputPath)}`);

    await sharp(inputPath)
      .resize(this.options.thumbSize, this.options.thumbSize, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: this.options.thumbQuality })
      .toFile(outputPath);
  }

  async processGallery(galleryPath, options = {}) {
    const { dryRun = false, force = false } = options;

    console.log(`\n🎨 Processing gallery: ${galleryPath}`);

    // Check if gallery exists
    if (!fs.existsSync(galleryPath)) {
      throw new Error(`Gallery not found: ${galleryPath}`);
    }

    // Find current images (look for img folder or files in root)
    const imgPath = path.join(galleryPath, 'img');
    const hasImgFolder = fs.existsSync(imgPath);

    let sourceImages = [];
    if (hasImgFolder) {
      sourceImages = fs.readdirSync(imgPath)
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
        .filter(file => !file.startsWith('watermarked_') && !file.startsWith('thumb'))
        .map(file => path.join(imgPath, file));
    } else {
      sourceImages = fs.readdirSync(galleryPath)
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
        .map(file => path.join(galleryPath, file));
    }

    if (sourceImages.length === 0) {
      console.log('⚠️  No source images found');
      return { processed: 0, skipped: 0 };
    }

    console.log(`📸 Found ${sourceImages.length} source images`);

    // Create directory structure
    const originalsDir = path.join(galleryPath, 'originals');
    const webDir = path.join(galleryPath, 'web');
    const thumbsDir = path.join(galleryPath, 'thumbs');

    if (!dryRun) {
      [originalsDir, webDir, thumbsDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });
    }

    // Load watermark
    const watermark = await this.loadWatermark();
    if (watermark) {
      console.log('✅ Watermark loaded successfully');
    }

    let processed = 0;
    let skipped = 0;

    for (const sourcePath of sourceImages) {
      const filename = path.basename(sourcePath);
      const nameWithoutExt = path.parse(filename).name;
      const ext = path.parse(filename).ext.toLowerCase();

      // Generate clean filenames
      const originalFile = path.join(originalsDir, `${nameWithoutExt}${ext}`);
      const webFile = path.join(webDir, `${nameWithoutExt}.jpg`);
      const thumbFile = path.join(thumbsDir, `thumb_${nameWithoutExt}.jpg`);

      if (dryRun) {
        console.log(`📋 Would process: ${filename}`);
        console.log(`   → ${path.relative(galleryPath, originalFile)}`);
        console.log(`   → ${path.relative(galleryPath, webFile)}`);
        console.log(`   → ${path.relative(galleryPath, thumbFile)}`);
        processed++;
        continue;
      }

      // Skip if files exist and not forcing
      if (!force && fs.existsSync(webFile) && fs.existsSync(thumbFile)) {
        console.log(`⏭️  Skipped: ${filename} (already processed)`);
        skipped++;
        continue;
      }

      try {
        // Copy to originals (archive)
        if (!fs.existsSync(originalFile)) {
          fs.copyFileSync(sourcePath, originalFile);
        }

        // Process to web version
        await this.processToWeb(sourcePath, webFile, watermark);

        // Generate thumbnail
        await this.processToThumb(sourcePath, thumbFile);

        processed++;
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
      }
    }

    console.log(`\n📊 Gallery processing complete:`);
    console.log(`   ✅ Processed: ${processed} images`);
    console.log(`   ⏭️  Skipped: ${skipped} images`);
    console.log(`   📁 Structure: originals/ | web/ | thumbs/`);

    return { processed, skipped, total: sourceImages.length };
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

Examples:
  # Process single gallery with default settings
  node gallery-processor.js docusaurus/docs/gallery/2023/1-simingshan-dragon-boat

  # Dry run to preview changes
  node gallery-processor.js --dry-run docusaurus/docs/gallery/2023/1-simingshan-dragon-boat

  # Process with custom watermark and sizes
  node gallery-processor.js --watermark watermark.png --web-max 1600 --thumb-size 400 gallery/

  # Force reprocess existing files
  node gallery-processor.js --force gallery/
    `);
    return;
  }

  // Parse arguments
  let watermarkPath = 'docusaurus/static/img/herbert_watermark_no_bg.png'; // default
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

    // Update album config if requested
    if (updateAlbum) {
      await processor.updateAlbumConfig(galleryPath, { dryRun });
    }

    if (!dryRun && result.processed > 0) {
      console.log(`\n✨ Processing complete! Your gallery now has:`);
      console.log(`   📂 originals/  - Master archive files`);
      console.log(`   🌐 web/        - Optimized & watermarked for display`);
      console.log(`   🖼️  thumbs/     - Fast-loading grid thumbnails`);
      console.log(`\n💡 Next steps:`);
      console.log(`   1. Update album.ts to use new web/ and thumbs/ structure`);
      console.log(`   2. Test the gallery in your development server`);
      console.log(`   3. Remove old img/ files after verification`);
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