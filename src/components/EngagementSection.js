import React from 'react';

const ENGAGEMENT_MODELS = [
  {
    title: 'Hourly Consulting',
    description: 'Short audits, code reviews, and immediate technical unblockers.',
  },
  {
    title: 'Fixed-Scope Projects',
    description:
      'Milestone-driven deliverables — e.g. building a complete test framework or RAG pipeline.',
  },
  {
    title: 'Retainers',
    description: 'Monthly allocation for ongoing SRE, on-call support, or AI system maintenance.',
  },
  {
    title: 'Staff Augmentation',
    description: "Direct integration into the client's development workflow.",
  },
];

const LIFECYCLE_STEPS = [
  'Discovery Call (30 mins)',
  'Proposal & Scope',
  'Kickoff',
  'Delivery & Demos',
  'Handoff & Knowledge Transfer',
];

export default function EngagementSection() {
  return (
    <section className="engagement-section">
      <h2>How We Can Work Together</h2>
      <div className="engagement-grid">
        {ENGAGEMENT_MODELS.map((model) => (
          <div className="engagement-card" key={model.title}>
            <h3>{model.title}</h3>
            <p>{model.description}</p>
          </div>
        ))}
      </div>

      <h3 className="process-heading">Standard Lifecycle</h3>
      <ol className="process-steps">
        {LIFECYCLE_STEPS.map((step) => (
          <li key={step} className="process-step">
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
