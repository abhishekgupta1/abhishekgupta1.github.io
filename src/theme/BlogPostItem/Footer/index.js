/**
 * Wraps the stock BlogPostItem/Footer to add a Giscus comment thread under a
 * single article (not in the blog list view).
 */
import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Comments from '@site/src/components/Comments';

export default function FooterWrapper(props) {
  const {isBlogPostPage, metadata} = useBlogPost();
  return (
    <>
      <Footer {...props} />
      {isBlogPostPage && <Comments key={metadata.permalink} />}
    </>
  );
}
