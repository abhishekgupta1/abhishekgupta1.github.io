import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * "Here's an idea from elsewhere, and here's what I think about it." Keeps the
 * external source clearly attributed and separate from your own take.
 *
 *   <Commentary
 *     source={{title: 'The Test Pyramid', author: 'Martin Fowler', url: 'https://...'}}
 *     references={[
 *       {label: 'Testing Trophy', href: 'https://kentcdodds.com/blog/write-tests'},
 *     ]}>
 *
 *   My take: the pyramid still holds for unit-heavy codebases, but...
 *
 *   </Commentary>
 */
export default function Commentary({source, references = [], children}) {
  return (
    <aside className={styles.wrap}>
      <div className={styles.head}>
        <span aria-hidden="true">💬</span> Commentary
      </div>
      {source && (
        <p className={styles.source}>
          On{' '}
          {source.url ? (
            <Link to={source.url} target="_blank" rel="noopener noreferrer">
              {source.title} ↗
            </Link>
          ) : (
            <strong>{source.title}</strong>
          )}
          {source.author && <span> — {source.author}</span>}
        </p>
      )}
      <div className={styles.take}>{children}</div>
      {references.length > 0 && (
        <div className={styles.refs}>
          <span className={styles.refsLabel}>References</span>
          <ul>
            {references.map((r) => (
              <li key={r.href}>
                <Link to={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label} ↗
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
