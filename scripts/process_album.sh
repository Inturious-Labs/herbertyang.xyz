#!/bin/bash
# Usage: ./process_album.sh [optional-album-name]
# New workflow: original/ -> img/ -> img/thumbs/

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get album name from parameter or prompt user
if [ -n "$1" ]; then
    ALBUM_NAME="$1"
    echo -e "${CYAN}🎯 Using provided album name: ${PURPLE}$ALBUM_NAME${NC}"
else
    echo -e "${CYAN}🎯 Photo Gallery Album Processor${NC}"
    echo ""
    echo -e "${YELLOW}Enter your gallery name (use hyphens to connect multiple words):${NC}"
    echo -e "${YELLOW}Examples:${NC}"
    echo -e "  ${CYAN}•${NC} vintage-car-show"
    echo -e "  ${CYAN}•${NC} mt-fuji-cycling-loop"
    echo -e "  ${CYAN}•${NC} family-vacation-2025"
    echo ""
    read -p "Gallery name: " ALBUM_NAME
    
    # Validate input
    if [ -z "$ALBUM_NAME" ]; then
        echo -e "${RED}❌ Error: Gallery name cannot be empty!${NC}"
        exit 1
    fi
    
    # Convert spaces to hyphens and remove special characters
    ALBUM_NAME=$(echo "$ALBUM_NAME" | tr ' ' '-' | sed 's/[^a-zA-Z0-9-]//g' | tr '[:upper:]' '[:lower:]')
    echo -e "${GREEN}✓${NC} Using gallery name: ${PURPLE}$ALBUM_NAME${NC}"
fi
echo -e "${CYAN}🎯 Processing album: ${PURPLE}$ALBUM_NAME${NC}"
echo ""

# Check if original directory exists
if [ ! -d "original" ]; then
    echo -e "${RED}❌ Error: 'original' directory not found!${NC}"
    echo -e "${YELLOW}💡 Please create an 'original' folder and place your images there${NC}"
    echo -e "${YELLOW}💡 Expected structure: docs/gallery/2025/your-album-name/original/your-images.jpg${NC}"
    echo -e "${YELLOW}💡 You can rename and rotate images in the 'original' folder before running this script${NC}"
    exit 1
fi

# Create img directory if it doesn't exist
mkdir -p img
mkdir -p img/thumbs

# Count images in original directory
image_count=$(find original -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l)

if [ "$image_count" -eq 0 ]; then
    echo -e "${RED}❌ Error: No images found in 'original' directory!${NC}"
    echo -e "${YELLOW}💡 Supported formats: .jpg, .jpeg, .png${NC}"
    exit 1
fi

echo -e "${GREEN}📋 Pre-processing Checklist:${NC}"
echo -e "  ${GREEN}Found${NC}       ${image_count} images in original/ directory"
echo ""

# Check for existing processed files
if [ -f "album.ts" ] || [ -d "img/thumbs" ] && [ "$(find img/thumbs -name "thumb-*" 2>/dev/null | wc -l)" -gt 0 ]; then
    echo -e "${YELLOW}🔄 Re-run detected: Found existing processed files${NC}"
    echo -e "  ${YELLOW}•${NC} album.ts exists"
    echo -e "  ${YELLOW}•${NC} Thumbnails exist in img/thumbs/"
    echo ""
    echo -e "${YELLOW}This will:${NC}"
    echo -e "  ${YELLOW}•${NC} Re-process all images from original/ directory"
    echo -e "  ${YELLOW}•${NC} Regenerate all thumbnails"
    echo -e "  ${YELLOW}•${NC} Regenerate album.ts"
    echo -e "  ${YELLOW}•${NC} Overwrite existing files"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Before proceeding, please confirm:${NC}"
    echo -e "  ${YELLOW}1.${NC} All images in original/ have the correct orientation"
    echo -e "  ${YELLOW}2.${NC} All images in original/ have descriptive, appropriate names"
    echo ""
    echo -e "${YELLOW}💡 Note: If you change filenames in original/ after running this script,${NC}"
    echo -e "${YELLOW}   you'll need to re-run this script to regenerate img/ and album.ts${NC}"
    echo ""
    read -p "Do you want to proceed with processing? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}❌ Processing cancelled${NC}"
        exit 0
    fi
    echo ""
    echo -e "${GREEN}✅ Confirmed! Starting image processing...${NC}"
    echo ""
    
    # Clean up existing processed files
    echo -e "${BLUE}🧹 Cleaning up existing processed files...${NC}"
    [ -f "album.ts" ] && rm -f "album.ts" && echo -e "  ${GREEN}✓${NC} Removed existing album.ts"
    [ -d "img/thumbs" ] && rm -rf img/thumbs/* && echo -e "  ${GREEN}✓${NC} Cleared existing thumbnails"
    [ -d "img" ] && find img -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -delete && echo -e "  ${GREEN}✓${NC} Cleared existing processed images"
    echo ""
else
    echo -e "${YELLOW}⚠️  IMPORTANT: Before proceeding, please confirm:${NC}"
    echo -e "  ${YELLOW}1.${NC} All images in original/ have the correct orientation"
    echo -e "  ${YELLOW}2.${NC} All images in original/ have descriptive, appropriate names"
    echo ""
    echo -e "${YELLOW}💡 Note: If you change filenames in original/ after running this script,${NC}"
    echo -e "${YELLOW}   you'll need to re-run this script to regenerate img/ and album.ts${NC}"
    echo ""
    read -p "Do you want to proceed with processing? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}❌ Processing cancelled${NC}"
        exit 0
    fi
    echo ""
    echo -e "${GREEN}✅ Confirmed! Starting image processing...${NC}"
    echo ""
fi

# Initialize counters
full_size_count=0
thumbnail_count=0

# Process full-size images (1200px width) from original/ to img/
echo -e "${BLUE}📸 Processing full-size images from original/ to img/...${NC}"
while IFS= read -r -d '' img; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        extension="${filename##*.}"
        name_without_ext="${filename%.*}"
        
        # Create new filename with album prefix
        new_filename="${ALBUM_NAME}-${filename}"
        
        # Get original dimensions
        original_dims=$(magick "$img" -format "%wx%h" info: 2>/dev/null)
        
        # Process image: resize to max 1200px width, maintain aspect ratio, auto-orient, strip metadata
        magick "$img" -auto-orient -strip -resize 1200x1200 -quality 85 "img/$new_filename"
        
        # Get processed dimensions
        processed_dims=$(magick "img/$new_filename" -format "%wx%h" info: 2>/dev/null)
        
        echo -e "  ${GREEN}✓${NC} Processed: ${YELLOW}$filename${NC} [${CYAN}$original_dims${NC} → ${PURPLE}$processed_dims${NC}]"
        ((full_size_count++))
    fi
done < <(find original -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

echo ""

# Generate thumbnails (400px width) from img/ to img/thumbs/
echo -e "${BLUE}🖼️  Generating thumbnails from img/ to img/thumbs/...${NC}"
while IFS= read -r -d '' img; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        extension="${filename##*.}"
        name_without_ext="${filename%.*}"
        
        # Create thumbnail filename with thumb- prefix
        thumb_filename="thumb-${filename}"
        
        # Get original dimensions
        original_dims=$(magick "$img" -format "%wx%h" info: 2>/dev/null)
        
        # Generate thumbnail: resize to max 400px width, maintain aspect ratio, auto-orient, strip metadata
        magick "$img" -auto-orient -strip -resize 400x400 -quality 85 "img/thumbs/$thumb_filename"
        
        # Get processed dimensions
        processed_dims=$(magick "img/thumbs/$thumb_filename" -format "%wx%h" info: 2>/dev/null)
        
        echo -e "  ${GREEN}✓${NC} Generated thumbnail: ${YELLOW}$thumb_filename${NC} [${CYAN}$original_dims${NC} → ${PURPLE}$processed_dims${NC}]"
        ((thumbnail_count++))
    fi
done < <(find img -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

echo ""

# Generate album.ts
echo -e "${BLUE}📝 Generating album.ts...${NC}"

# Convert album name to variable name (replace hyphens with underscores)
VARIABLE_NAME=$(echo "$ALBUM_NAME" | sed 's/-/_/g')

# Start album.ts file
cat > album.ts << EOF
export const ${VARIABLE_NAME}Photos = [
EOF

# Add each photo to album.ts
counter=1
while IFS= read -r -d '' img; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        extension="${filename##*.}"
        name_without_ext="${filename%.*}"
        
        # Extract original name from filename (remove album prefix)
        original_name=$(echo "$name_without_ext" | sed "s/${ALBUM_NAME}-//")
        
        # Get dimensions
        dimensions=$(magick "$img" -format "%wx%h" info: 2>/dev/null)
        width=$(echo "$dimensions" | cut -d'x' -f1)
        height=$(echo "$dimensions" | cut -d'x' -f2)
        
        # Add comma if not first item
        if [ $counter -gt 1 ]; then
            echo "," >> album.ts
        fi
        
        # Add photo entry
        cat >> album.ts << EOF
    {
      src: require('./img/$filename').default,
      width: $width,
      height: $height,
      alt: '$ALBUM_NAME',
      caption: "$original_name",
      thumb: require('./img/thumbs/thumb-$filename').default,
    }
EOF
        
        ((counter++))
    fi
done < <(find img -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

# Close album.ts
echo "" >> album.ts
echo "];" >> album.ts

echo -e "  ${GREEN}✓${NC} Generated album.ts with $((counter-1)) photos"

echo ""
echo -e "${GREEN}🎉 Processing complete!${NC}"
echo -e "${GREEN}📊 Summary:${NC}"
echo -e "  ${GREEN}Full-size images processed:${NC} $full_size_count"
echo -e "  ${GREEN}Thumbnails generated:${NC} $thumbnail_count"
echo -e "  ${GREEN}Album.ts generated:${NC} album.ts"
echo -e "  ${GREEN}Full-size images:${NC} img/"
echo -e "  ${GREEN}Thumbnails:${NC} img/thumbs/"
echo ""
echo -e "${CYAN}💡 Next steps:${NC}"
echo -e "  ${CYAN}1.${NC} Create index.mdx file using the generated album.ts"
echo -e "  ${CYAN}2.${NC} Import ${VARIABLE_NAME}Photos from './album'"
echo -e "  ${CYAN}3.${NC} Use <PhotoGallery photos={${VARIABLE_NAME}Photos} />"
echo ""
echo -e "${YELLOW}📁 File structure:${NC}"
echo -e "  ${YELLOW}original/${NC}     - Your original images (renamed/rotated as needed)"
echo -e "  ${YELLOW}img/${NC}          - Resized full-size images (1200px max width)"
echo -e "  ${YELLOW}img/thumbs/${NC}   - Thumbnails (400px max width)"
echo -e "  ${YELLOW}album.ts${NC}      - Generated photo data for Docusaurus"