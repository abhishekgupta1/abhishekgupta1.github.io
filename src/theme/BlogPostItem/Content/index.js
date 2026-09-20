/**
 * Swizzled from @docusaurus/theme-classic to add "Listen to podcast" and
 * "Mind map" controls above article content, mirroring the same features added
 * to DocItem/Content (see src/components/PodcastButton, MindMapButton). Only
 * rendered on the full post page, not on blog listing/summary cards. Keep
 * this in sync with upstream BlogPostItem/Content if Docusaurus is upgraded.
 *
 * Also emits BlogPosting JSON-LD on the full post page for SEO rich results.
 */
import React, {useRef} from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import MDXContent from '@theme/MDXContent';
import PodcastButton from '@site/src/components/PodcastButton';
import MindMapButton from '@site/src/components/MindMapButton';
import {SITE_URL, PERSON} from '@site/src/data/site';

function blogPostingJsonLd(metadata) {
  const url = `${SITE_URL}${metadata.permalink}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {'@type': 'WebPage', '@id': url},
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified: metadata.lastUpdatedAt
      ? new Date(metadata.lastUpdatedAt * 1000).toISOString()
      : metadata.date,
    author: {'@type': 'Person', name: PERSON.name, url: PERSON.url},
    publisher: {'@type': 'Person', name: PERSON.name, url: PERSON.url},
    keywords: (metadata.tags || []).map((t) => t.label).join(', '),
    url,
  };
}

export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage, metadata} = useBlogPost();
  const contentRef = useRef(null);

  return (
    <>
      {isBlogPostPage && (
        <>
          <Head>
            <script type="application/ld+json">
              {JSON.stringify(blogPostingJsonLd(metadata))}
            </script>
          </Head>
          <PodcastButton src={metadata.frontMatter.podcast} />
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
