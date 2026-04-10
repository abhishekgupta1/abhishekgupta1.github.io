import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ProjectCard from '@site/src/components/ProjectCard';

const PAGE_TITLE = 'Projects';
const OG_TITLE = 'Projects | Abhishek Gupta';
const DESCRIPTION =
  'Featured projects by Abhishek Gupta — test automation frameworks, SRE observability tools, and AI-powered testing solutions.';

const projects = [
  {
    title: 'Playwright Test Automation Framework',
    description:
      'End-to-end test automation framework built with Playwright for cross-browser testing. Includes parallel execution, custom reporters, and CI/CD integration with GitHub Actions.',
    techStack: ['Playwright', 'JavaScript', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/abhishekgupta1/playwright-framework',
    impactMetrics: [
      'Reduced regression time by 60%',
      'Achieved 95% test stability across 3 browsers',
    ],
  },
  {
    title: 'SRE Observability Dashboard',
    description:
      'Full-stack observability solution using Prometheus and Grafana for monitoring microservices. Features custom alerting rules, SLO tracking, and automated incident runbooks.',
    techStack: ['Prometheus', 'Grafana', 'Python', 'Kubernetes'],
    githubUrl: 'https://github.com/abhishekgupta1/sre-observability',
    impactMetrics: [
      'Cut mean-time-to-detect (MTTD) by 45%',
      'Monitored 50+ microservices in production',
    ],
  },
  {
    title: 'AI-Powered Test Generator',
    description:
      'Intelligent test case generator that uses LLMs to analyze application code and produce meaningful test scenarios. Supports Playwright and Jest output formats.',
    techStack: ['Python', 'OpenAI API', 'LangChain', 'Jest'],
    githubUrl: 'https://github.com/abhishekgupta1/ai-test-generator',
    impactMetrics: [
      'Generated 200+ test cases from codebase analysis',
      'Improved code coverage from 40% to 78%',
    ],
  },
  {
    title: 'Android App Launch QA Automation',
    description:
      'QA automation framework for Android app launch verification using Appium and TestNG. Includes emulator setup scripts, ExtentReport HTML reporting, and CI integration with Travis CI.',
    techStack: ['Java', 'Appium', 'TestNG', 'Maven', 'Travis CI'],
    githubUrl: 'https://github.com/abhishekgupta1/assignment-dream11-applaunch-check',
    impactMetrics: [
      'Automated app launch checks across multiple emulators',
      'Parallel test execution via TestNG XML configuration',
    ],
  },
  {
    title: 'Web Automation Framework',
    description:
      'Selenium-based web automation framework with Page Object Model, ExtentReport integration, and configurable test suites. Built with Maven and TestNG for scalable web testing.',
    techStack: ['Java', 'Selenium', 'TestNG', 'Maven', 'ExtentReports'],
    githubUrl: 'https://github.com/abhishekgupta1/assignment-freecharge-web-automation',
    impactMetrics: [
      'POM design pattern for maintainable test code',
      'Integrated HTML reporting with ExtentReports',
    ],
  },
  {
    title: 'API Test Automation (BDD)',
    description:
      'REST API test automation using Cucumber BDD with Gherkin syntax. Features Slack API integration testing with configurable tokens and channel-based test scenarios.',
    techStack: ['Java', 'Cucumber', 'REST Assured', 'TestNG', 'Maven'],
    githubUrl: 'https://github.com/abhishekgupta1/assignment-plivo-api-automation',
    impactMetrics: [
      'BDD approach with readable Gherkin feature files',
      'End-to-end Slack API validation pipeline',
    ],
  },
  {
    title: 'TestOps & Continuous Testing',
    description:
      'Hands-on exploration of continuous testing principles in Agile/DevOps. Covers Python Pytest automation, Jenkins CI/CD pipelines, and Git-based workflows for test orchestration.',
    techStack: ['Python', 'Pytest', 'Jenkins', 'Git', 'CI/CD'],
    githubUrl: 'https://github.com/abhishekgupta1/learning-testops',
    impactMetrics: [
      'CI/CD pipeline integration with Jenkins',
      'Pytest-based test automation patterns',
    ],
  },
  {
    title: 'Programming Practice (DSA)',
    description:
      'Data structures and algorithms practice repository with solutions in Java and Python. Covers core CS concepts, problem-solving patterns, and coding interview preparation.',
    techStack: ['Java', 'Python', 'Data Structures', 'Algorithms'],
    githubUrl: 'https://github.com/abhishekgupta1/programming-practice',
    impactMetrics: [
      'Multi-language problem solving (Java & Python)',
      'Covers arrays, trees, graphs, and dynamic programming',
    ],
  },
  {
    title: 'Daily Coding Challenge',
    description:
      'A daily coding pledge starting Oct 2024 — solving problems and building concepts in TypeScript. Covers basic concepts, type systems, and practical coding exercises.',
    techStack: ['TypeScript', 'Node.js'],
    githubUrl: 'https://github.com/abhishekgupta1/dailycoding',
    impactMetrics: [
      'Consistent daily coding habit',
      'TypeScript fundamentals and advanced patterns',
    ],
  },
];

export default function Projects() {
  const {siteConfig} = useDocusaurusContext();
  const ogImage = siteConfig.url + useBaseUrl('/img/og-image.png');
  const pageUrl = siteConfig.url + useBaseUrl('/projects');

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
        <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>Projects</h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
