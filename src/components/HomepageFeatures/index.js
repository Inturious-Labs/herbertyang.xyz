import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Digital Sovereignty Chronicle',
    background: '#96EAD7',
    description: (
      <>
        A newsletter on crypto, web3 tech, decentralization, and various data hacks
      </>
    ),
    link: 'https://digitalsovereignty.herbertyang.xyz/',
    linkText: 'Explore Chronicle',
  },
  {
    title: 'Remnants of Globalization',
    background: '#B8D3D9',
    description: (
      <>
        An anthology of stories of people born in the 60s-80s who basked in the glory of globalization, but are now navigating through the choppy waters of a bygone era
      </>
    ),
    link: 'https://remnantsofglobalization.herbertyang.xyz/',
    linkText: 'Explore Stories',
  },
  {
    title: 'Y3 Labs',
    background: '#C8E6C9',
    description: (
      <>
        A game development studio that makes interesting online games for kids
      </>
    ),
    link: 'https://y3labs.herbertyang.xyz/',
    linkText: 'Play Games',
  },
  {
    title: 'Blogs',
    background: '#E6D7F3',
    description: (
      <>
        Other blissful joys and serendipitous discoveries in life
      </>
    ),
    link: '/blog',
    linkText: 'Enjoy Life',
  },
];

function Feature({Svg, background, title, description, link, linkText}) {
  return (
    <div className={clsx('col col--6')}>
      <div className={clsx(styles.featureBox)} style={{background: background}}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <div className={styles.featureDescription}>
          <p>{description}</p>
        </div>
        <div className={styles.featureButton}>
          <Link
            className="button button--primary button--sm"
            to={link}>
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
