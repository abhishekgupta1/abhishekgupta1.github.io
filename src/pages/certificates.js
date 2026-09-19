import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CertificateGrid from '@site/src/components/CertificateGrid';
import {SITE_URL, PERSON} from '@site/src/data/site';

const PAGE_TITLE = 'Certificates';
const OG_TITLE = 'Certificates | Abhishek Gupta';
const DESCRIPTION =
  'Professional certifications earned by Abhishek Gupta — AWS, SRE, Chaos Engineering, and more.';

/**
 * `verifyUrl` and `credlyBadgeId` are yours to fill in (see README). An empty
 * `verifyUrl` just hides the "Verify" link on that card.
 */
const certificates = [
  {
    title: 'Amazon Web Services (AWS) Certified',
    imageSrc: '/img/certs/Amazon Web Services (AWS) Certified/TP-I85MZRBY.jpg',
    provider: 'Udemy',
    skills: ['AWS', 'Cloud'],
    verifyUrl: '',
  },
  {
    title: 'AWS Certified Solutions Architect Associate',
    imageSrc: '/img/certs/AWS Certified Solutions Architect Associate Complete Course/TP-B83FKPC4.jpg',
    provider: 'Udemy',
    skills: ['AWS', 'Architecture', 'Cloud'],
    verifyUrl: '',
  },
  {
    title: 'Ultimate AWS Certified Cloud Practitioner',
    imageSrc: '/img/certs/Ultimate AWS Certified Cloud Practitioner/TP-I74YJY1P.jpg',
    provider: 'Udemy',
    skills: ['AWS', 'Cloud'],
    verifyUrl: '',
  },
  {
    title: 'AWS CloudFormation',
    imageSrc: '/img/certs/AWS Cloud Formations/TP-J0LC3SRQ.jpg',
    provider: 'Udemy',
    skills: ['AWS', 'IaC'],
    verifyUrl: '',
  },
  {
    title: 'AWS DevOps All-in-One Training',
    imageSrc: '/img/certs/AWS DevOps All-in-One Training/TP-RYI0Z4WB.jpg',
    provider: 'Udemy',
    skills: ['AWS', 'DevOps', 'CI/CD'],
    verifyUrl: '',
  },
  {
    title: 'SRE Fundamentals: Mastering Site Reliability Engineering',
    imageSrc: '/img/certs/SRE Fundamentals Mastering Site Reliability Engineering/UC-b04c2f44-3015-4352-a6aa-6c459797aaa3.jpg',
    provider: 'Udemy',
    skills: ['SRE', 'Reliability'],
    verifyUrl: '',
  },
  {
    title: 'Chaos Engineering',
    imageSrc: '/img/certs/Chaos Engineering/UC-c6934c17-d68e-4fab-940a-720ca3b57084.jpg',
    provider: 'Udemy',
    skills: ['SRE', 'Resilience'],
    verifyUrl: '',
  },
  {
    title: 'From Engineer to Technical Manager: A Survival Guide',
    imageSrc: '/img/certs/From Engineer to Technical Manager A Survival Guide/UC-cd90c551-ed7d-421e-96ab-62c9223a5861.jpg',
    provider: 'Udemy',
    skills: ['Leadership'],
    verifyUrl: '',
  },
  {
    title: 'HackerRank SQL',
    imageSrc: '/img/certs/HackerRank SQL/SQL basics.png',
    provider: 'HackerRank',
    skills: ['SQL'],
    verifyUrl: '',
  },
  {
    title: 'GenAI Tools & AI Agents for Software Testing',
    imageSrc: '/img/certs/Learn GenAI Tools & AI Agents for Software Testing/UC-d10eeef6-199c-4cda-a246-2b6a35089e55.jpg',
    provider: 'Udemy',
    skills: ['AI', 'Testing'],
    verifyUrl: '',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: certificates.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: {'@type': 'Organization', name: c.provider},
      about: c.skills,
      ...(c.verifyUrl ? {url: c.verifyUrl} : {}),
      holder: {'@type': 'Person', name: PERSON.name, url: PERSON.url},
    },
  })),
};

export default function Certificates() {
  const {siteConfig} = useDocusaurusContext();
  const ogImage = siteConfig.url + useBaseUrl('/img/og-image.png');
  const pageUrl = `${SITE_URL}/certificates`;

  const [provider, setProvider] = useState('all');
  const [skill, setSkill] = useState('all');
  const [sort, setSort] = useState('title');

  const providers = useMemo(
    () => ['all', ...new Set(certificates.map((c) => c.provider))],
    [],
  );
  const skills = useMemo(
    () => ['all', ...new Set(certificates.flatMap((c) => c.skills))].sort(),
    [],
  );

  const shown = useMemo(() => {
    const list = certificates.filter(
      (c) =>
        (provider === 'all' || c.provider === provider) &&
        (skill === 'all' || c.skills.includes(skill)),
    );
    return [...list].sort((a, b) =>
      sort === 'provider'
        ? a.provider.localeCompare(b.provider) || a.title.localeCompare(b.title)
        : a.title.localeCompare(b.title),
    );
  }, [provider, skill, sort]);

  return (
    <Layout title={PAGE_TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <main style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', marginBottom: '1rem'}}>Certificates</h1>

        <div className="cert-filters">
          <label>
            Provider{' '}
            <select value={provider} onChange={(e) => setProvider(e.target.value)}>
              {providers.map((p) => (
                <option key={p} value={p}>{p === 'all' ? 'All' : p}</option>
              ))}
            </select>
          </label>
          <label>
            Skill{' '}
            <select value={skill} onChange={(e) => setSkill(e.target.value)}>
              {skills.map((s) => (
                <option key={s} value={s}>{s === 'all' ? 'All' : s}</option>
              ))}
            </select>
          </label>
          <label>
            Sort{' '}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="title">Title</option>
              <option value="provider">Provider</option>
            </select>
          </label>
          <span className="cert-count">{shown.length} shown</span>
        </div>

        <CertificateGrid certificates={shown} />
      </main>
    </Layout>
  );
}
