import React from 'react';

export default function ContactCTA() {
  return (
    <section className="contact-cta">
      <h2>Let's Build Something Reliable</h2>
      <p>
        Tell me about your domain — SDET, SRE, or AI Systems — and the
        business problem you're facing. I'll map it to a recommended
        engagement model and the key questions worth asking on a discovery
        call.
      </p>
      <div className="contact-cta-buttons">
        <a
          className="hero-cta"
          href="mailto:abhishekcgupta1@gmail.com?subject=Discovery%20Call%20Request">
          Email Me
        </a>
        <a
          className="hero-cta hero-cta--outline"
          href="https://www.linkedin.com/in/abhishekcgupta1/"
          target="_blank"
          rel="noopener noreferrer">
          Connect on LinkedIn
        </a>
        <a
          className="hero-cta hero-cta--outline"
          href="https://github.com/abhishekgupta1"
          target="_blank"
          rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </section>
  );
}
