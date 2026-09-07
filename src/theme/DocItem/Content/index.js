/**
 * Swizzled from @docusaurus/theme-classic to add a "Listen" control above
 * doc content, powered by the browser's Web Speech API (see
 * src/components/ListenButton). Keep this in sync with upstream
 * DocItem/Content if Docusaurus is upgraded.
 *
 * Cheat Sheets (/cheatsheets/*) opt out of Listen/Mind map — they're dense
 * lookup pages, not narrative content those features are meant for. They get
 * a ProgressTracker toggle instead (see src/components/ProgressTracker).
 */
import React, {useRef} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import ListenButton from '@site/src/components/ListenButton';
import MindMapButton from '@site/src/components/MindMapButton';
import ProgressTracker from '@site/src/components/ProgressTracker';
import {topics} from '@site/src/data/topics';

function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
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
      {!isCheatSheet && <ListenButton targetRef={contentRef} />}
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
