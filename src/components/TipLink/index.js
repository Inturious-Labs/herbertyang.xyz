import React from 'react';
import styles from './styles.module.css';

/**
 * Invites a reader to tip after a post.
 *
 * `slug` identifies the post on the shared tip page, so the figures can be traced
 * back to what prompted them.
 */
export default function TipLink({slug}) {
  const href =
    'https://tip.inturious.com/?src=hyx' +
    (slug ? `&a=${encodeURIComponent(slug)}` : '');

  return (
    <div className={styles.block}>
      <a className={styles.link} href={href} rel="noopener">
        Buy me a coffee ☕
      </a>
    </div>
  );
}
