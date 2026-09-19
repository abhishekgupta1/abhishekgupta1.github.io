import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useColorMode} from '@docusaurus/theme-common';
import {GISCUS} from '@site/src/data/site';
import styles from './styles.module.css';

/**
 * Giscus comment thread. Renders nothing until GISCUS.repoId / categoryId are
 * set in src/data/site.js. One Discussion per page path; the iframe follows the
 * site's light/dark mode.
 */
function Thread() {
  const {colorMode} = useColorMode();
  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    const attrs = {
      'data-repo': GISCUS.repo,
      'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category,
      'data-category-id': GISCUS.categoryId,
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': colorMode === 'dark' ? 'dark' : 'light',
      'data-lang': 'en',
      'data-loading': 'lazy',
    };
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
    node.appendChild(script);
    return () => {
      node.innerHTML = '';
    };
    // Re-mount only on path change; theme changes are pushed below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const frame = ref.current && ref.current.querySelector('iframe.giscus-frame');
    if (frame) {
      frame.contentWindow.postMessage(
        {giscus: {setConfig: {theme: colorMode === 'dark' ? 'dark' : 'light'}}},
        'https://giscus.app',
      );
    }
  }, [colorMode]);

  return <div ref={ref} />;
}

export default function Comments() {
  if (!GISCUS.repoId || !GISCUS.categoryId) return null;
  return (
    <section className={styles.wrap} aria-label="Comments">
      <BrowserOnly>{() => <Thread />}</BrowserOnly>
    </section>
  );
}
