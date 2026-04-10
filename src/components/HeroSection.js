import React from 'react';
import Link from '@docusaurus/Link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <h1>Abhishek Gupta</h1>
      <p className="hero-tagline">
        Exploring the World of Testing, Reliability, and AI
      </p>
      <p className="hero-intro">
        SDET III | SRE | AI Enthusiast — Building reliable, scalable systems
        through test automation, site reliability engineering, and intelligent
        tooling. Passionate about bridging quality and innovation.
      </p>
      <Link className="hero-cta" to="/projects">
        View My Projects
      </Link>
    </section>
  );
}
