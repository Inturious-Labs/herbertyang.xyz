import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Technology Evangelist',
    background: '#96EAD7',
    /* Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default, */
    description: (
      <>
        Discover paradigm-shifting frontier technologies and drive their mindshare
      </>
    ),
  },
  {
    title: 'Community Builder',
    background: '#B8D3D9',
    /* Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default, */
    description: (
      <>
        Build communities of early adopters, opinion leaders & ecosystem stakeholders
      </>
    ),
  },
  {
    title: 'Serial Entreprenuer',
    background: '#F2CEE2',
    /* Svg: require('@site/static/img/undraw_docusaurus_react.svg').default, */
    description: (
      <>
        Pursue product-market fit and design sustainable business models
      </>
    ),
  },
];

function Feature({Svg, background, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      </div>
      <div className="text--center padding-horiz--md" style={{background: background, padding: 20}}>
        <h3>{title}</h3>
        <p>{description}</p>
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
