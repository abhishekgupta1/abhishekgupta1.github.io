import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CertificateGrid from '@site/src/components/CertificateGrid';

const PAGE_TITLE = 'Certificates';
const OG_TITLE = 'Certificates | Abhishek Gupta';
const DESCRIPTION =
  'Professional certifications earned by Abhishek Gupta — AWS, SRE, Chaos Engineering, and more.';

const certificates = [
  {
    title: 'Amazon Web Services (AWS) Certified',
    imageSrc: '/img/certs/Amazon Web Services (AWS) Certified/TP-I85MZRBY.jpg',
  },
  {
    title: 'AWS Certified Solutions Architect Associate',
    imageSrc: '/img/certs/AWS Certified Solutions Architect Associate Complete Course/TP-B83FKPC4.jpg',
  },
  {
    title: 'Ultimate AWS Certified Cloud Practitioner',
    imageSrc: '/img/certs/Ultimate AWS Certified Cloud Practitioner/TP-I74YJY1P.jpg',
  },
  {
    title: 'AWS CloudFormation',
    imageSrc: '/img/certs/AWS Cloud Formations/TP-J0LC3SRQ.jpg',
  },
  {
    title: 'AWS DevOps All-in-One Training',
    imageSrc: '/img/certs/AWS DevOps All-in-One Training/TP-RYI0Z4WB.jpg',
  },
  {
    title: 'SRE Fundamentals: Mastering Site Reliability Engineering',
    imageSrc: '/img/certs/SRE Fundamentals Mastering Site Reliability Engineering/UC-b04c2f44-3015-4352-a6aa-6c459797aaa3.jpg',
  },
  {
    title: 'Chaos Engineering',
    imageSrc: '/img/certs/Chaos Engineering/UC-c6934c17-d68e-4fab-940a-720ca3b57084.jpg',
  },
  {
    title: 'From Engineer to Technical Manager: A Survival Guide',
    imageSrc: '/img/certs/From Engineer to Technical Manager A Survival Guide/UC-cd90c551-ed7d-421e-96ab-62c9223a5861.jpg',
  },
  {
    title: 'HackerRank SQL',
    imageSrc: '/img/certs/HackerRank SQL/SQL basics.png',
  },
  {
    title: 'GenAI Tools & AI Agents for Software Testing',
    imageSrc: '/img/certs/Learn GenAI Tools & AI Agents for Software Testing/UC-d10eeef6-199c-4cda-a246-2b6a35089e55.jpg',
  },
];

export default function Certificates() {
  const {siteConfig} = useDocusaurusContext();
  const ogImage = siteConfig.url + useBaseUrl('/img/og-image.png');
  const pageUrl = siteConfig.url + useBaseUrl('/certificates');

  return (
    <Layout title={PAGE_TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main style={{padding: '2rem'}}>
        <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>
          Certificates
        </h1>
        <CertificateGrid certificates={certificates} />
      </main>
    </Layout>
  );
}
