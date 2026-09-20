/**
 * Swizzled from @docusaurus/theme-classic to add "Listen to podcast" (from the
 * `podcast` front matter, see src/components/PodcastButton) and "Mind map"
 * controls above doc content. Keep this in sync with upstream
 * DocItem/Content if Docusaurus is upgraded.
 *
 * Cheat Sheets (/cheatsheets/*) opt out of Podcast/Mind map — they're dense
 * lookup pages, not narrative content those features are meant for. They get
 * a ProgressTracker toggle instead (see src/components/ProgressTracker).
 */
import React, {useRef} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import PodcastButton from '@site/src/components/PodcastButton';
import MindMapButton from '@site/src/components/MindMapButton';
import ProgressTracker from '@site/src/components/ProgressTracker';
import {topics} from '@site/src/data/topics';
import {SITE_URL} from '@site/src/data/site';

function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

const titleCase = (seg) =>
  seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** BreadcrumbList JSON-LD derived from the doc permalink — SEO rich result. */
function breadcrumbJsonLd(permalink, title) {
  const parts = permalink.split('/').filter(Boolean);
  const items = parts.map((seg, i) => {
    const isLast = i === parts.length - 1;
    return {
      '@type': 'ListItem',
      position: i + 1,
      name: isLast ? title : titleCase(seg),
      item: `${SITE_URL}/${parts.slice(0, i + 1).join('/')}`,
    };
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export default function DocItemContent({children}) {
  const syntheticTitle = useSyntheticTitle();
  const {metadata, frontMatter} = useDoc();
  const contentRef = useRef(null);
  const isCheatSheet = metadata.permalink.startsWith('/cheatsheets');
  const sheetId = metadata.permalink.replace(/^\/cheatsheets\/?/, '');
  const isTrackedSheet = isCheatSheet && topics.some((t) => t.id === sheetId);

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd(metadata.permalink, metadata.title))}
        </script>
      </Head>
      {!isCheatSheet && <PodcastButton src={frontMatter.podcast} />}
      {!isCheatSheet && (
        <MindMapButton
          targetRef={contentRef}
          title={syntheticTitle || metadata.title}
          subtitle={frontMatter.description || metadata.description}
        />
      )}
      {isTrackedSheet && <ProgressTracker id={sheetId} />}
      <div ref={contentRef} className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
        {syntheticTitle && (
          <header>
            <Heading as="h1">{syntheticTitle}</Heading>
          </header>
        )}
        <MDXContent>{children}</MDXContent>
      </div>
    </>
  );
}
