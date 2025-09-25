import React, { useState, useEffect } from "react";
import { MasonryPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

// Plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

// CSS
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "react-photo-album/masonry.css";
import styles from "./PhotoGallery.module.css";

type Image = {
  src: string;     // full-size image
  thumb: string;   // thumbnail for grid
  width: number;
  height: number;
  alt?: string;
  caption?: string;
};

// Fade-in animation configuration
const FADE_CONFIG = {
  duration: 2.5,           // Animation duration in seconds
  initialDelay: 200,       // First image delay in ms
  staggerDelay: 500,       // Delay between each image in ms
  initialScale: 0.95,      // Starting scale (0.95 = 95% size)
  finalScale: 1,           // Ending scale (1 = 100% size)
  easing: 'ease-out',      // CSS transition easing
  setupDelay: 100,         // Delay before setting up animations in ms
};

export default function PhotoGallery({ images }: { images: Image[] }) {
  const [index, setIndex] = useState<number>(-1);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Handle image load events for fade-in effect
  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  useEffect(() => {
    // Wait for images to be rendered, then set up fade-in effect
    const timer = setTimeout(() => {
      const images = document.querySelectorAll(`.${styles.photoGalleryRoot} img`);

      images.forEach((img, index) => {
        // First: ensure image is in invisible state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 2.5s ease-out, transform 2.5s ease-out';

        const handleLoad = () => {
          // Staggered delay: each image waits longer than the previous
          const staggerDelay = 200 + (index * 500); // 200ms, 700ms, 1200ms, etc.
          setTimeout(() => {
            // Directly animate via style properties
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
          }, staggerDelay);
        };

        if (img.complete) {
          // Image already loaded
          handleLoad();
        } else {
          // Listen for load event
          img.addEventListener('load', handleLoad, { once: true });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Prepare thumbnails for grid (fast loading, lazy by default)
  const gridPhotos = images.map(({ thumb, width, height, alt }) => ({
    src: thumb,
    width,
    height,
    alt,
    loading: 'lazy' as const, // Explicit lazy loading for thumbnails
  }));

  // Prepare full-resolution slides for lightbox (load on demand)
  const slides = images.map(({ src, alt, caption }) => ({
    src,
    alt,
    description: caption,
    loading: 'lazy' as const, // Explicit lazy loading for full images
  }));

  return (
    <div className={styles.photoGalleryRoot}>
      {/* Thumbnail grid */}
      <MasonryPhotoAlbum
        photos={gridPhotos}
        onClick={({ index }) => setIndex(index)}
      />

      {/* Lightbox with plugins */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
        captions={{
            showToggle: false, // always show caption (remove toggle button)
            descriptionTextAlign: "center",
            descriptionMaxLines: 3,
          }}
        // Optional: slideshow options
        slideshow={{ autoplay: false, delay: 3000 }}
        thumbnails={{ position: "bottom" }}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
      />
    </div>
  );
}


