import React from 'react';

const SERVICES = [
  {
    title: 'SDET',
    summary:
      'Test automation framework design, API testing, CI/CD integration, test coverage audits, performance/load testing, and test data mocking.',
    tools: ['Playwright', 'Pytest', 'REST Assured', 'k6', 'Selenium', 'Cypress', 'Appium'],
  },
  {
    title: 'SRE',
    summary:
      'SLI/SLO/SLA definitions, incident management, observability stacks, Infrastructure as Code, Kubernetes reliability, blameless postmortems, and cost/capacity tuning.',
    tools: ['Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry', 'AWS/GCP/Azure'],
  },
  {
    title: 'AI Systems Engineering',
    summary:
      'LLM applications (RAG pipelines, agentic workflows), AI-driven test generation, prompt engineering frameworks, AI observability, MLOps, and model deployment.',
    tools: ['LangChain', 'LlamaIndex', 'OpenAI API', 'Anthropic API', 'Vector DBs', 'Hugging Face'],
  },
];

export default function ServicesSection() {
  return (
    <section className="services-section">
      <h2>What I Do</h2>
      <p className="section-subtitle">
        Three domains, one goal — connecting technical execution to business
        outcomes.
      </p>
      <div className="services-grid">
        {SERVICES.map((service) => (
          <div className="service-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <div className="tech-badges">
              {service.tools.map((tool) => (
                <span key={tool} className="tech-badge">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
