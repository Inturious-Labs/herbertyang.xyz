import React, { useState } from "react";
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

type Image = {
  src: string;     // full-size image
  thumb: string;   // thumbnail for grid
  width: number;
  height: number;
  alt?: string;
  caption?: string;
};

export default function PhotoGallery({ images }: { images: Image[] }) {
  const [index, setIndex] = useState<number>(-1);

  // Prepare thumbnails for grid and full-size slides for lightbox
  const gridPhotos = images.map(({ thumb, width, height, alt }) => ({
    src: thumb,
    width,
    height,
    alt,
  }));
  const slides = images.map(({ src, alt, caption }) => ({
    src, 
    alt, 
    description: caption, 
  }));

  return (
    <div className="photo-gallery-root">
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


