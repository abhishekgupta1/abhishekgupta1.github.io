import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * A curated map of where to go deeper — the few sources actually worth your
 * time, grouped, each with a one-line reason. Beats a wall of bookmarks.
 *
 *   <KnowledgeMap groups={[
 *     {title: 'Official', links: [
 *       {label: 'Playwright docs', href: 'https://playwright.dev', note: 'API reference, always current'},
 *     ]},
 *     {title: 'On this site', links: [
 *       {label: 'CI/CD Pipelines', href: '/cheatsheets/ci-cd-pipelines', note: 'Where these tests actually run'},
 *     ]},
 *   ]} />
 */
export default function KnowledgeMap({title = 'Knowledge map', groups = []}) {
  if (!groups.length) return null;
  return (
    <section className={styles.wrap} aria-label={title}>
      <div className={styles.head}>
        <span aria-hidden="true">🗺️</span> {title}
      </div>
      <div className={styles.grid}>
        {groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h4 className={styles.groupTitle}>{group.title}</h4>
            <ul className={styles.list}>
              {(group.links || []).map((l) => {
                const external = /^https?:\/\//.test(l.href);
                return (
                  <li key={l.href} className={styles.item}>
                    <Link
                      to={l.href}
                      className={styles.link}
                      {...(external
                        ? {target: '_blank', rel: 'noopener noreferrer'}
                        : {})}>
                      {l.label}
                      {external && <span aria-hidden="true"> ↗</span>}
                    </Link>
                    {l.note && <span className={styles.note}>{l.note}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
