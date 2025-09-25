#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix malformed image paths in gallery index.mdx files
async function fixCoverImagePaths() {
    console.log('🔧 Fixing cover image paths in gallery index.mdx files...\n');

    // Find all index.mdx files (excluding 2025 which already work)
    const indexFiles = glob.sync('docs/gallery/*/[0-9]*-*/index.mdx', {
        cwd: process.cwd()
    });

    for (const indexFile of indexFiles) {
        console.log(`📝 Processing: ${indexFile}`);

        try {
            const content = fs.readFileSync(indexFile, 'utf8');

            // Extract year and album info from path
            const pathParts = indexFile.split('/');
            const year = pathParts[2];
            const albumFolder = pathParts[3];

            // Find the actual first image file in the img directory
            const imgDir = path.join(path.dirname(indexFile), 'img');
            if (!fs.existsSync(imgDir)) {
                console.log(`   ❌ No img directory found`);
                continue;
            }

            const imgFiles = fs.readdirSync(imgDir)
                .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
                .filter(file => !file.startsWith('thumb-'))
                .sort();

            if (imgFiles.length === 0) {
                console.log(`   ❌ No image files found`);
                continue;
            }

            const firstImage = imgFiles[0];
            const correctImagePath = `/docs/gallery/${year}/${albumFolder}/img/${firstImage}`;

            // Fix malformed image path using regex
            const updatedContent = content.replace(
                /^image:\s*.*$/m,
                `image: ${correctImagePath}`
            );

            if (updatedContent !== content) {
                fs.writeFileSync(indexFile, updatedContent);
                console.log(`   ✅ Fixed image path to: ${correctImagePath}`);
            } else {
                console.log(`   ℹ️  Already correct or no image path found`);
            }

        } catch (error) {
            console.log(`   ❌ Error processing ${indexFile}:`, error.message);
        }
    }

    console.log('\n🎉 Cover image path fixing complete!');
}

// Run the script
fixCoverImagePaths().catch(console.error);