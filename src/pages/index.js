import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HeroSection from '@site/src/components/HeroSection';
import ServicesSection from '@site/src/components/ServicesSection';
import EngagementSection from '@site/src/components/EngagementSection';
import ContactCTA from '@site/src/components/ContactCTA';

const TITLE = 'Abhishek Gupta | SDET, SRE & AI Systems Consulting';
const DESCRIPTION =
  'Abhishek Gupta — Independent Consultant specializing in SDET, SRE, and AI Systems Engineering. Test automation, site reliability, and AI-driven tooling for engineering teams.';

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
        <ServicesSection />
        <EngagementSection />
        <ContactCTA />
      </main>
    </Layout>
  );
}
