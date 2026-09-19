import React, {useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PAGE_TITLE = 'Resume';
const OG_TITLE = 'Resume | Abhishek Gupta';
const DESCRIPTION =
  'Role-specific resumes for Abhishek Gupta — SDET, SRE, and AI Systems Engineering.';

/**
 * One entry per role-specific resume. `pdf` is a path under static/; drop
 * `resume-sdet.pdf` etc. there. Any missing file falls back to `resume.pdf`.
 */
const VARIANTS = [
  {
    key: 'sdet',
    label: 'SDET',
    blurb: 'Test automation architecture, framework design, and CI quality gates.',
    pdf: '/resume-sdet.pdf',
    points: [
      'End-to-end automation frameworks (Playwright, Selenium, Appium) cutting regression time by up to 60%',
      'CI/CD integration across GitHub Actions, Jenkins, and Travis CI, with quality gates and flake budgets',
      'API & BDD test automation with REST Assured and Cucumber; JUnit 5 / TestNG suite design',
      'Cross-browser and mobile coverage, parallelised and sharded for fast feedback',
    ],
  },
  {
    key: 'sre',
    label: 'SRE',
    blurb: 'Observability, incident response, and reliability practice.',
    pdf: '/resume-sre.pdf',
    points: [
      'Observability stacks with Prometheus & Grafana and OpenTelemetry tracing, cutting MTTD by 45%',
      'SLI/SLO definition, error-budget policy, and blameless postmortems',
      'Kubernetes workload reliability, probes, and capacity tuning',
      'Infrastructure as Code with Terraform; GitHub Actions delivery pipelines',
    ],
  },
  {
    key: 'ai',
    label: 'AI Systems',
    blurb: 'Applied AI in engineering workflows — agents, RAG, and evaluation.',
    pdf: '/resume-ai.pdf',
    points: [
      'AI-assisted test generation and maintenance, improving coverage from 40% to 78%',
      'RAG pipelines and agentic workflows with LangChain and the Anthropic / OpenAI APIs',
      'MCP tool servers wiring assistants into test and SRE tooling',
      'Prompt-engineering patterns, eval harnesses, and AI output observability',
    ],
  },
];

export default function Resume() {
  const {siteConfig} = useDocusaurusContext();
  const ogImage = siteConfig.url + useBaseUrl('/img/og-image.png');
  const pageUrl = siteConfig.url + useBaseUrl('/resume');
  const fallbackPdf = useBaseUrl('/resume.pdf');

  const [active, setActive] = useState(VARIANTS[0].key);
  const variant = VARIANTS.find((v) => v.key === active) || VARIANTS[0];
  const variantPdf = useBaseUrl(variant.pdf);

  // `resume.pdf` always exists; role PDFs are optional. The <object> below
  // falls back to the generic file if the role file 404s.
  return (
    <Layout title={PAGE_TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main style={{padding: '2rem', maxWidth: '1000px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', marginBottom: '0.5rem'}}>Resume</h1>
        <p style={{textAlign: 'center', color: 'var(--ifm-color-emphasis-600)'}}>
          Pick the version that matches the role.
        </p>

        <div className="resume-tabs" role="tablist">
          {VARIANTS.map((v) => (
            <button
              key={v.key}
              type="button"
              role="tab"
              aria-selected={v.key === active}
              className={clsx('resume-tab', v.key === active && 'resume-tab--active')}
              onClick={() => setActive(v.key)}>
              {v.label}
            </button>
          ))}
        </div>

        <p style={{textAlign: 'center', margin: '0.75rem 0 1.5rem'}}>{variant.blurb}</p>

        <div className="service-card" style={{marginBottom: '2rem'}}>
          <h3>{variant.label} — highlights</h3>
          <ul style={{margin: 0, paddingLeft: '1.1rem'}}>
            {variant.points.map((p) => (
              <li key={p} style={{marginBottom: '0.4rem'}}>{p}</li>
            ))}
          </ul>
        </div>

        <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <a
            href={variantPdf}
            download={`Abhishek_Gupta_Resume_${variant.label.replace(/\s+/g, '_')}.pdf`}
            className="button button--primary button--lg">
            Download {variant.label} résumé (PDF)
          </a>
        </div>

        <object
          data={variantPdf}
          type="application/pdf"
          width="100%"
          height="1100"
          style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}>
          <p style={{textAlign: 'center', padding: '1rem'}}>
            No preview for this version yet.{' '}
            <a href={fallbackPdf} download="Abhishek_Gupta_Resume.pdf">
              Download the general résumé
            </a>
            .
          </p>
        </object>

        <p style={{textAlign: 'center', marginTop: '1rem', color: 'var(--ifm-color-emphasis-600)'}}>
          Trouble viewing?{' '}
          <a href={variantPdf} download>
            Download this version
          </a>{' '}
          or the{' '}
          <a href={fallbackPdf} download="Abhishek_Gupta_Resume.pdf">
            general résumé
          </a>
          .
        </p>
      </main>
    </Layout>
  );
}
