import React from 'react';
import Link from '@docusaurus/Link';
import galleryData from '../data/galleryData.json';
import styles from './GalleryIndex.module.css';

function AlbumCard({ album, year }) {
  return (
    <Link to={album.path} className={styles.albumCard}>
      <div className={styles.albumImageWrapper}>
        <img 
          src={album.coverImage} 
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