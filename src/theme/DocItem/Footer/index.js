/**
 * Wraps the stock DocItem/Footer to add a Giscus comment thread under docs.
 * Cheat sheets are dense lookup pages, so they opt out (same as Listen/Mind map).
 */
import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Comments from '@site/src/components/Comments';

export default function FooterWrapper(props) {
  const {metadata} = useDoc();
  const isCheatSheet = metadata.permalink.startsWith('/cheatsheets');
  return (
    <>
      <Footer {...props} />
      {!isCheatSheet && <Comments key={metadata.permalink} />}
    </>
  );
}
