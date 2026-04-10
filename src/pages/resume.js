import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PAGE_TITLE = 'Resume';
const OG_TITLE = 'Resume | Abhishek Gupta';
const DESCRIPTION =
  'View or download the professional resume of Abhishek Gupta — SDET III, SRE, and AI Enthusiast.';

export default function Resume() {
  const {siteConfig} = useDocusaurusContext();
  const pdfUrl = useBaseUrl('/resume.pdf');
  const ogImage = siteConfig.url + useBaseUrl('/img/og-image.png');
  const pageUrl = siteConfig.url + useBaseUrl('/resume');

  return (
    <Layout title={PAGE_TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main style={{padding: '2rem', maxWidth: '1440px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Resume</h1>

        <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <a
            href={pdfUrl}
            download="Abhishek_Gupta_Resume.pdf"
            className="button button--primary button--lg">
            Download Resume
          </a>
        </div>

        <iframe
          src={pdfUrl}
          title="Abhishek Gupta Resume"
          width="100%"
          height="1200"
          style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}
        />

        <noscript>
          <p style={{textAlign: 'center', marginTop: '1rem'}}>
            Unable to preview the resume.{' '}
            <a href={pdfUrl} download="Abhishek_Gupta_Resume.pdf">
              Download it directly
            </a>.
          </p>
        </noscript>

        <p style={{textAlign: 'center', marginTop: '1rem', color: 'var(--ifm-color-emphasis-600)'}}>
          Having trouble viewing the PDF?{' '}
          <a href={pdfUrl} download="Abhishek_Gupta_Resume.pdf">
            Download it directly
          </a>.
        </p>
      </main>
    </Layout>
  );
}
