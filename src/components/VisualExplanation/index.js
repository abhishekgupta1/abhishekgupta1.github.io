import React from 'react';
import styles from './styles.module.css';

/**
 * A one-paragraph plain-language summary next to a diagram — the "if you read
 * nothing else" version of a long section. `children` is the visual (an inline
 * SVG, an image, a table, a mermaid block).
 *
 *   <VisualExplanation
 *     summary="A request hits the load balancer, which picks a healthy pod..."
 *     caption="Traffic path for one request">
 *
 *   <svg ...>...</svg>
 *
 *   </VisualExplanation>
 */
export default function VisualExplanation({summary, caption, title = 'In short', children}) {
  return (
    <figure className={styles.wrap}>
      {summary && (
        <div className={styles.summary}>
          <span className={styles.label}>{title}</span>
          <p className={styles.text}>{summary}</p>
        </div>
      )}
      <div className={styles.visual}>{children}</div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
