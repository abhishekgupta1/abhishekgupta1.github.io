/**
 * Swizzled from @docusaurus/theme-classic to add "Listen" and "Mind map"
 * controls above article content, mirroring the same features added to
 * DocItem/Content (see src/components/ListenButton, MindMapButton). Only
 * rendered on the full post page, not on blog listing/summary cards. Keep
 * this in sync with upstream BlogPostItem/Content if Docusaurus is upgraded.
 */
import React, {useRef} from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import MDXContent from '@theme/MDXContent';
import ListenButton from '@site/src/components/ListenButton';
import MindMapButton from '@site/src/components/MindMapButton';

export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage, metadata} = useBlogPost();
  const contentRef = useRef(null);

  return (
    <>
      {isBlogPostPage && (
        <>
          <ListenButton targetRef={contentRef} />
          <MindMapButton targetRef={contentRef} title={metadata.title} subtitle={metadata.description} />
        </>
      )}
      <div
        id={isBlogPostPage ? blogPostContainerID : undefined}
        ref={contentRef}
        className={clsx('markdown', className)}>
        <MDXContent>{children}</MDXContent>
      </div>
    </>
  );
}
