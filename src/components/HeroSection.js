import React from 'react';
import Link from '@docusaurus/Link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <h1>Abhishek Gupta</h1>
      <p className="hero-tagline">
        Independent Consultant — SDET · SRE · AI Systems Engineering
      </p>
      <p className="hero-location">
        📍 Mumbai, India — Available for Remote &amp; Hybrid Engagements
      </p>
      <p className="hero-intro">
        I help engineering teams reduce deployment friction, lower test
        flakiness, and improve MTTR through test automation, site reliability
        engineering, and AI-driven systems — from a single hourly audit to a
        fully built RAG pipeline or test framework.
      </p>
      <div className="hero-cta-group">
        <a
          className="hero-cta"
          href="mailto:abhishekcgupta1@gmail.com?subject=Discovery%20Call%20Request">
          Book a Discovery Call
        </a>
        <Link className="hero-cta hero-cta--outline" to="/projects">
          View My Projects
        </Link>
      </div>
    </section>
  );
}
