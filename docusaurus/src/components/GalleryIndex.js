import React from 'react';
import Link from '@docusaurus/Link';
import galleryData from '../data/galleryData.json';
import styles from './GalleryIndex.module.css';

// Function to import all images from a directory
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

// Import all gallery images using require.context with recursive search
const allGalleryImages = importAll(
  require.context('../../docs/gallery', true, /\.(png|jpe?g|svg)$/i)
);

function AlbumCard({ album, year }) {
  let coverImageSrc = album.coverImage;

  // Handle null coverImage - use fallback for Hong Kong album
  if (!album.coverImage && album.slug === '2-climb-peak-hong-kong') {
    coverImageSrc = '/img/202307-thepeak-01.jpg';
  }
  // Try to find the cover image from imported images
  else if (album.coverImage && album.coverImage.startsWith('/docs/gallery')) {
    // Convert absolute path to relative path for lookup
    // /docs/gallery/2025/mt-fuji-cycling-loop/img/image.jpg -> 2025/mt-fuji-cycling-loop/img/image.jpg
    const relativePath = album.coverImage.replace('/docs/gallery/', '');

    if (allGalleryImages[relativePath]) {
      coverImageSrc = allGalleryImages[relativePath].default || allGalleryImages[relativePath];
    }
  }

  return (
    <Link to={album.path} className={styles.albumCard}>
      <div className={styles.albumImageWrapper}>
        <img
          src={coverImageSrc}
          alt={album.title}
          className={styles.albumImage}
          loading="lazy"
        />
        <div className={styles.albumOverlay}>
          <h3 className={styles.albumTitle}>{album.title}</h3>
        </div>
      </div>
    </Link>
  );
}

function YearSection({ year, albums }) {
  return (
    <div className={styles.yearSection}>
      <h2 className={styles.yearTitle}>{year}</h2>
      <div className={styles.albumsGrid}>
        {albums.map((album) => (
          <AlbumCard key={album.slug} album={album} year={year} />
        ))}
      </div>
    </div>
  );
}

export default function GalleryIndex() {
  const years = Object.keys(galleryData).sort((a, b) => b - a); // Sort years descending

  return (
    <div className={styles.galleryIndex}>
      {years.map((year) => (
        <YearSection key={year} year={year} albums={galleryData[year]} />
      ))}
    </div>
  );
}