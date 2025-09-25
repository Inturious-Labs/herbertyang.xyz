#!/usr/bin/env node

/**
 * Professional photo watermarking script for Herbert Yang Photography
 * Applies elegant watermark to gallery photos with proper positioning and transparency
 */

const fs = require('fs');
const path = require('path');

// Try to require canvas from docusaurus node_modules if not found locally
let createCanvas, loadImage;
try {
  ({ createCanvas, loadImage } = require('canvas'));
} catch (error) {
  try {
    ({ createCanvas, loadImage } = require('../docusaurus/node_modules/canvas'));
  } catch (error2) {
    console.error('❌ Canvas module not found. Please install with:');
    console.error('   cd docusaurus && npm install canvas --save-dev');
    process.exit(1);
  }
}

class PhotoWatermarker {
  constructor(watermarkPath, options = {}) {
    this.watermarkPath = watermarkPath;
    this.options = {
      position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left, center
      margin: 20,
      opacity: 0.7,
      scale: 0.15, // watermark size relative to photo width
      quality: 0.95,
      ...options
    };
  }

  async createTextWatermark() {
    // Create a text-based watermark if no watermark file is provided
    const canvas = createCanvas(400, 100);
    const ctx = canvas.getContext('2d');

    // Set transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font and style
    ctx.font = 'bold 24px Georgia, serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 1;

    // Add text
    const text = 'Herbert Yang';
    const textWidth = ctx.measureText(text).width;
    const x = (canvas.width - textWidth) / 2;
    const y = 40;

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    // Add "PHOTOGRAPHY" in smaller text
    ctx.font = '14px Georgia, serif';
    const subText = 'P H O T O G R A P H Y';
    const subTextWidth = ctx.measureText(subText).width;
    const subX = (canvas.width - subTextWidth) / 2;

    ctx.strokeText(subText, subX, y + 30);
    ctx.fillText(subText, subX, y + 30);

    return canvas;
  }

  async convertWatermarkToWhite(watermarkImage) {
    // Create a new canvas to modify the watermark color
    const canvas = createCanvas(watermarkImage.width, watermarkImage.height);
    const ctx = canvas.getContext('2d');

    // Draw the original watermark
    ctx.drawImage(watermarkImage, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert all non-transparent pixels to white while preserving alpha
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) { // If pixel is not fully transparent
        data[i] = 255;     // Red
        data[i + 1] = 255; // Green
        data[i + 2] = 255; // Blue
        // Keep original alpha (data[i + 3])
      }
    }

    // Put the modified data back
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  async loadWatermark() {
    try {
      if (this.watermarkPath && fs.existsSync(this.watermarkPath)) {
        const originalWatermark = await loadImage(this.watermarkPath);
        // Convert to white for better contrast
        return await this.convertWatermarkToWhite(originalWatermark);
      } else {
        console.log('Creating text-based watermark...');
        return await this.createTextWatermark();
      }
    } catch (error) {
      console.log('Fallback to text watermark due to error:', error.message);
      return await this.createTextWatermark();
    }
  }

  calculateWatermarkPosition(photoWidth, photoHeight, watermarkWidth, watermarkHeight) {
    const { position, margin } = this.options;
    let x, y;

    switch (position) {
      case 'bottom-right':
        x = photoWidth - watermarkWidth - margin;
        y = photoHeight - watermarkHeight - margin;
        break;
      case 'bottom-left':
        x = margin;
        y = photoHeight - watermarkHeight - margin;
        break;
      case 'top-right':
        x = photoWidth - watermarkWidth - margin;
        y = margin;
        break;
      case 'top-left':
        x = margin;
        y = margin;
        break;
      case 'center':
        x = (photoWidth - watermarkWidth) / 2;
        y = (photoHeight - watermarkHeight) / 2;
        break;
      default:
        x = photoWidth - watermarkWidth - margin;
        y = photoHeight - watermarkHeight - margin;
    }

    return { x: Math.max(0, x), y: Math.max(0, y) };
  }

  async processPhoto(inputPath, outputPath) {
    try {
      console.log(`Processing: ${inputPath}`);

      // Load the original photo
      const originalImage = await loadImage(inputPath);
      const watermark = await this.loadWatermark();

      // Calculate watermark dimensions
      const watermarkScale = this.options.scale;
      const watermarkWidth = Math.floor(originalImage.width * watermarkScale);
      const watermarkHeight = Math.floor(watermark.height * (watermarkWidth / watermark.width));

      // Create canvas with original photo dimensions
      const canvas = createCanvas(originalImage.width, originalImage.height);
      const ctx = canvas.getContext('2d');

      // Draw original photo
      ctx.drawImage(originalImage, 0, 0);

      // Calculate watermark position
      const position = this.calculateWatermarkPosition(
        originalImage.width,
        originalImage.height,
        watermarkWidth,
        watermarkHeight
      );

      // Set opacity and draw watermark
      ctx.globalAlpha = this.options.opacity;
      ctx.drawImage(watermark, position.x, position.y, watermarkWidth, watermarkHeight);
      ctx.globalAlpha = 1.0; // Reset opacity

      // Save the watermarked image
      const buffer = canvas.toBuffer('image/jpeg', { quality: this.options.quality });
      fs.writeFileSync(outputPath, buffer);

      console.log(`✓ Watermarked: ${outputPath}`);
      return true;
    } catch (error) {
      console.error(`✗ Error processing ${inputPath}:`, error.message);
      return false;
    }
  }

  async processGalleryFolder(galleryPath, options = {}) {
    const { backup = true, overwrite = false } = options;

    if (!fs.existsSync(galleryPath)) {
      console.error(`Gallery path does not exist: ${galleryPath}`);
      return false;
    }

    const imgPath = path.join(galleryPath, 'img');
    if (!fs.existsSync(imgPath)) {
      console.error(`Image folder not found: ${imgPath}`);
      return false;
    }

    console.log(`\n🎨 Processing gallery: ${galleryPath}`);

    // Create backup folder if needed
    if (backup) {
      const backupPath = path.join(imgPath, 'originals');
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
    }

    // Get all jpg files
    const imageFiles = fs.readdirSync(imgPath)
      .filter(file => /\.(jpg|jpeg)$/i.test(file))
      .filter(file => !file.startsWith('watermarked_')); // Skip already watermarked

    let processed = 0;
    let skipped = 0;

    for (const imageFile of imageFiles) {
      const inputPath = path.join(imgPath, imageFile);
      const outputPath = overwrite ? inputPath : path.join(imgPath, `watermarked_${imageFile}`);

      // Backup original if needed and overwriting
      if (backup && overwrite) {
        const backupPath = path.join(imgPath, 'originals', imageFile);
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(inputPath, backupPath);
        }
      }

      // Skip if watermarked version already exists and not overwriting
      if (!overwrite && fs.existsSync(outputPath)) {
        console.log(`⏭  Skipped: ${imageFile} (already exists)`);
        skipped++;
        continue;
      }

      const success = await this.processPhoto(inputPath, outputPath);
      if (success) processed++;
    }

    console.log(`\n📊 Gallery processing complete:`);
    console.log(`   ✓ Processed: ${processed} images`);
    console.log(`   ⏭  Skipped: ${skipped} images`);

    return { processed, skipped, total: imageFiles.length };
  }

  async processAllGalleries(galleryRootPath, options = {}) {
    const galleries = this.findAllGalleries(galleryRootPath);
    let totalProcessed = 0;
    let totalSkipped = 0;

    console.log(`\n🚀 Found ${galleries.length} galleries to process\n`);

    for (const galleryPath of galleries) {
      const result = await this.processGalleryFolder(galleryPath, options);
      if (result) {
        totalProcessed += result.processed;
        totalSkipped += result.skipped;
      }
    }

    console.log(`\n🎉 All galleries processed!`);
    console.log(`   ✓ Total processed: ${totalProcessed} images`);
    console.log(`   ⏭  Total skipped: ${totalSkipped} images`);

    return { totalProcessed, totalSkipped };
  }

  findAllGalleries(rootPath) {
    const galleries = [];

    function scanDirectory(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          const fullPath = path.join(dir, item.name);

          // Check if this directory has an img folder (gallery indicator)
          const imgPath = path.join(fullPath, 'img');
          if (fs.existsSync(imgPath)) {
            galleries.push(fullPath);
          } else {
            // Recursively scan subdirectories
            scanDirectory(fullPath);
          }
        }
      }
    }

    scanDirectory(rootPath);
    return galleries.sort();
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🎨 Herbert Yang Photography Watermarking Tool

Usage:
  node watermark-photos.js [options] [gallery-path]

Options:
  --watermark <path>     Path to watermark image (optional, uses text if not provided)
  --position <pos>       Watermark position: bottom-right, bottom-left, top-right, top-left, center
  --opacity <num>        Watermark opacity (0.0-1.0, default: 0.7)
  --scale <num>          Watermark scale relative to photo width (default: 0.15)
  --margin <num>         Margin from edges in pixels (default: 20)
  --overwrite           Overwrite original files (creates backup in originals/)
  --no-backup           Don't create backups when overwriting
  --all                 Process all galleries in docs/gallery/
  --help, -h            Show this help

Examples:
  # Process all galleries with Herbert Yang watermark
  node watermark-photos.js --all --watermark docusaurus/static/img/herbert_watermark.png

  # Process specific gallery with custom watermark
  node watermark-photos.js --watermark docusaurus/static/img/herbert_watermark.png docusaurus/docs/gallery/2014/4-kabukicho

  # Process with custom settings
  node watermark-photos.js --all --position bottom-left --opacity 0.5 --overwrite
    `);
    return;
  }

  // Parse arguments
  const options = {
    position: 'bottom-right',
    opacity: 0.7,
    scale: 0.15,
    margin: 20,
    quality: 0.95
  };

  let watermarkPath = null;
  let galleryPath = null;
  let processAll = false;
  let overwrite = false;
  let backup = true;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--watermark':
        watermarkPath = args[++i];
        break;
      case '--position':
        options.position = args[++i];
        break;
      case '--opacity':
        options.opacity = parseFloat(args[++i]);
        break;
      case '--scale':
        options.scale = parseFloat(args[++i]);
        break;
      case '--margin':
        options.margin = parseInt(args[++i]);
        break;
      case '--overwrite':
        overwrite = true;
        break;
      case '--no-backup':
        backup = false;
        break;
      case '--all':
        processAll = true;
        break;
      default:
        if (!arg.startsWith('--') && !galleryPath) {
          galleryPath = arg;
        }
    }
  }

  // Create watermarker instance
  const watermarker = new PhotoWatermarker(watermarkPath, options);

  try {
    if (processAll) {
      const galleryRoot = path.join(__dirname, '..', 'docusaurus', 'docs', 'gallery');
      await watermarker.processAllGalleries(galleryRoot, { backup, overwrite });
    } else if (galleryPath) {
      await watermarker.processGalleryFolder(galleryPath, { backup, overwrite });
    } else {
      console.error('❌ Please specify a gallery path or use --all flag');
      console.log('Use --help for usage information');
      process.exit(1);
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

module.exports = PhotoWatermarker;