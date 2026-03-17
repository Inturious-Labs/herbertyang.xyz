import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const sections = [
  {
    title: 'Blog',
    description: 'Thoughts on life, work, and everything in between',
    link: '/blog',
    color: '#E6D7F3',
  },
  {
    title: 'Public',
    description: 'Public speeches, panels, and Twitter Spaces',
    link: '/public',
    color: '#B8D3D9',
  },
  {
    title: 'Photo Gallery',
    description: 'Travel and street photography',
    link: '/docs/gallery/',
    color: '#96EAD7',
  },
  {
    title: 'Cookbook',
    description: 'Home-cooked Chinese recipes',
    link: '/docs/cookbook/',
    color: '#F5D6D6',
  },
];

export default function Home() {
  return (
    <Layout description="Herbert Yang - writer, builder, investor">
      <main className={styles.landing}>
        <div className={styles.hero}>
          <img
            src="/img/herbert_avatar.jpg"
            alt="Herbert Yang"
            className={styles.avatar}
          />
          <h1 className={styles.name}>Herbert Yang</h1>
          <Link to="/docs/about/herbert-yang/" className={styles.tagline}>Writer, builder, investor</Link>

          <div className={styles.roles}>
            <div className={styles.role}>
              <h3 className={styles.roleTitle}>Writing</h3>
              <ul className={styles.roleList}>
                <li><a href="https://digitalsovereignty.herbertyang.xyz">Digital Sovereignty Chronicles</a></li>
                <li><a href="https://remnants.herbertyang.xyz">Remnants of Globalization</a></li>
                <li><Link to="/blog">Herbert Yang's Blog</Link></li>
              </ul>
            </div>
            <div className={styles.role}>
              <h3 className={styles.roleTitle}>Producing</h3>
              <ul className={styles.roleList}>
                <li><a href="https://weekly.sundayblender.com">The Sunday Blender</a></li>
                <li><a href="https://dongxidispatch.com">Dongxi Dispatch</a></li>
              </ul>
            </div>
            <div className={styles.role}>
              <h3 className={styles.roleTitle}>Building</h3>
              <ul className={styles.roleList}>
                <li><a href="https://readly.space">Readly</a></li>
                <li><a href="https://subspend.xyz">Subspend</a></li>
                <li><a href="https://prismatic.directory">Prismatic</a></li>
                <li><a href="https://archivechina.art">Archive of Contemporary Art in China</a></li>
                <li>ADAM</li>
                <li><a href="https://ic123.xyz">ic123</a></li>
              </ul>
            </div>
            <div className={styles.role}>
              <h3 className={styles.roleTitle}>Investing</h3>
              <ul className={styles.roleList}>
                <li>Stealth</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {sections.map((section) => (
            <Link
              key={section.title}
              to={section.link}
              className={styles.card}
              style={{backgroundColor: section.color}}
            >
              <h2 className={styles.cardTitle}>{section.title}</h2>
              <p className={styles.cardDesc}>{section.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
