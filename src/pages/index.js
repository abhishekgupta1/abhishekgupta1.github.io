import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HeroSection from '@site/src/components/HeroSection';

const TITLE = 'Abhishek Gupta | Portfolio';
const DESCRIPTION =
  'Portfolio of Abhishek Gupta — SDET III, SRE, and AI Enthusiast. Exploring the World of Testing, Reliability, and AI.';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const ogImage = siteConfig.url + useBaseUrl('/img/og-image.png');
  const pageUrl = siteConfig.url + useBaseUrl('/');

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <HeroSection />
      </main>
    </Layout>
  );
}
