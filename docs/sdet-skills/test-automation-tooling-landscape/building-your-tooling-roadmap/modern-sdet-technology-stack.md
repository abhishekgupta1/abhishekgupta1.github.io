---
title: "Modern SDET Technology Stack"
description: "A concrete, defensible modern SDET stack: **TypeScript/Python** as languages, **Playwright** for UI and API, **Jest/Pytest** for unit, **Testcontainers** for integration, **WireMock** for mocking, **Pact** for contracts, **k6** for performance, **OWASP ZAP/Trivy** for security, **axe-core** for accessibility, **GitLab CI** for delivery, **Docker/AWS/Terraform/EKS** for platform, **OpenTelemetry + Prometheus + Grafana** for observability, **LitmusChaos/AWS FIS** for chaos, and coding agents for AI assistance."
sidebar_position: 3
tags: [test-automation, sdet, tooling]
---

# Modern SDET Technology Stack

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Building Your Tooling Roadmap
**Created**: 2026-08-23
**Tags**: sdet-stack, playwright, testcontainers, k6, opentelemetry

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-sdetstack-title mm-sdetstack-desc">
<title id="mm-sdetstack-title">One coherent stack, layered by category with no redundant overlap</title>
<desc id="mm-sdetstack-desc">Five layers cover every category of the expanded testing pyramid: language and test layers, isolation and contracts, delivery and platform, observability and chaos, and AI assist on top — each a defensible, non-overlapping choice.</desc>
<defs>
  <marker id="mm-sdetstack-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="40" y="15" width="700" height="45" rx="8"/>
<text class="mm-node-title" x="390" y="34" text-anchor="middle">Language &amp; Test Layers</text>
<text class="mm-node-sub" x="390" y="50" text-anchor="middle">TypeScript/Python · Playwright · Jest/Pytest</text>

<path class="mm-arrow" d="M390,60 L390,72" marker-end="url(#mm-sdetstack-arrow)"/>

<rect class="mm-n2" x="40" y="72" width="700" height="45" rx="8"/>
<text class="mm-node-title" x="390" y="91" text-anchor="middle">Isolation &amp; Contracts</text>
<text class="mm-node-sub" x="390" y="107" text-anchor="middle">Testcontainers · WireMock · Pact</text>

<path class="mm-arrow" d="M390,117 L390,129" marker-end="url(#mm-sdetstack-arrow)"/>

<rect class="mm-n3" x="40" y="129" width="700" height="45" rx="8"/>
<text class="mm-node-title" x="390" y="148" text-anchor="middle">Delivery &amp; Platform</text>
<text class="mm-node-sub" x="390" y="164" text-anchor="middle">GitLab CI · Docker · AWS · Terraform · EKS</text>

<path class="mm-arrow" d="M390,174 L390,186" marker-end="url(#mm-sdetstack-arrow)"/>

<rect class="mm-n4" x="40" y="186" width="700" height="45" rx="8"/>
<text class="mm-node-title" x="390" y="205" text-anchor="middle">Observability &amp; Chaos</text>
<text class="mm-node-sub" x="390" y="221" text-anchor="middle">OpenTelemetry + Prometheus + Grafana · LitmusChaos</text>

<path class="mm-arrow" d="M390,231 L390,243" marker-end="url(#mm-sdetstack-arrow)"/>

<rect class="mm-n5" x="40" y="243" width="700" height="45" rx="8"/>
<text class="mm-node-title" x="390" y="262" text-anchor="middle">AI Assist</text>
<text class="mm-node-sub" x="390" y="278" text-anchor="middle">coding agents + AI test analysis</text>
</svg>

<p class="mental-model__caption">Five layers, each covering a distinct category with no redundant overlap — the stack is a complete reference to build toward, not a checklist to complete before it counts as "modern."</p>
</div>

## Quick Reference

A concrete, defensible modern SDET stack: **TypeScript/Python** as languages, **Playwright** for UI and API, **Jest/Pytest** for unit, **Testcontainers** for integration, **WireMock** for mocking, **Pact** for contracts, **k6** for performance, **OWASP ZAP/Trivy** for security, **axe-core** for accessibility, **GitLab CI** for delivery, **Docker/AWS/Terraform/EKS** for platform, **OpenTelemetry + Prometheus + Grafana** for observability, **LitmusChaos/AWS FIS** for chaos, and coding agents for AI assistance.

## What is it?

This is a complete, coherent reference stack — not a mandate — for an engineer building toward deep, modern SDET competence. Each choice is defensible on its own merits and the stack as a whole covers every layer of the expanded testing pyramid without redundant tool overlap.

## The Stack

```text
Language        → TypeScript / Python
UI              → Playwright
API             → Playwright API / Pytest
Unit            → Jest / Pytest
Integration     → Testcontainers
Mocking         → WireMock
Contract        → Pact
Performance     → k6
Security        → OWASP ZAP / Trivy
Accessibility   → axe-core
CI/CD           → GitLab CI
Containers      → Docker
Cloud           → AWS
Infrastructure  → Terraform
Kubernetes      → EKS
Observability   → OpenTelemetry + Prometheus + Grafana
Chaos           → LitmusChaos / AWS FIS
AI              → Coding Agents + AI Test Analysis
```

## When to Use

- Building a personal or team reference stack from scratch, rather than accumulating tools ad hoc
- Justifying a specific tool choice to a stakeholder or during a design review
- Structuring a learning plan around a complete, coherent stack rather than isolated tool tutorials

## Recommended Stack

This record *is* the recommended stack — see the table above. The reasoning behind each choice is what makes it defensible rather than arbitrary; see Key Takeaways.

## Summary

- 💡 TypeScript/Python have the deepest tooling coverage across every category in this guide, minimizing language context-switching
- 🔥 Playwright covering both UI and API means one tool spans the top and a meaningful slice of the middle of the pyramid
- ⚠️ Testcontainers + WireMock together cover real-dependency fidelity (Testcontainers) and dependency isolation (WireMock) — picking only one leaves a real gap
- ✅ OpenTelemetry as the instrumentation layer (regardless of backend) avoids vendor lock-in while giving direct compatibility with Prometheus/Grafana or a managed platform later
- ⚡ This stack is a starting reference, not a mandate — a team's actual language/cloud/CI constraints should override any single choice here, while the underlying category coverage (UI, API, unit, integration, contract, performance, security, accessibility, delivery, platform, observability, chaos, AI) should stay complete

## Common Mistakes

**Mistake**: Adopting every tool in this stack simultaneously without first validating fit against the team's actual constraints.
**Why it fails**: This is a reference stack, not a mandate — see [Test Tool Selection & Evaluation](../test-automation-engineering-architecture/test-tool-selection-evaluation.md) for the framework to actually apply per decision.

**Mistake**: Treating gaps in this stack (missing a category entirely) as acceptable because "we haven't needed it yet."
**Why it fails**: A missing category (e.g., no contract testing in a growing microservices architecture) tends to surface as a painful incident rather than a graceful gap — proactively closing category gaps is cheaper than reacting to the incident that reveals them.

## Advanced Usage

### Adapting the stack to a non-AWS cloud

The category structure (UI, API, unit, integration, contract, performance, security, accessibility, delivery, platform, observability, chaos, AI) holds regardless of cloud provider — swap AWS/EKS/AWS FIS for Azure/AKS/Azure Chaos Studio or GCP/GKE equivalents without changing the underlying stack's shape.

## Scenarios & How to Respond

**Scenario: A junior engineer asks whether they need to learn every tool in this stack before they can call themselves a "modern SDET."**
Audience & tone: Mentee — encouraging, sequencing-focused.
Response: "No — this is a map of categories to eventually cover, not a checklist to complete before you're qualified. Start with the [career roadmap's](./sdet-career-skill-roadmap.md) Tier 1, and this stack becomes the reference for what to add as you grow into Tier 2 and 3."

## See Also

- [SDET Career & Skill Roadmap](./sdet-career-skill-roadmap.md)
- [Modern SRE Testing Stack](./modern-sre-testing-stack.md)
- [Test Tool Selection & Evaluation](../test-automation-engineering-architecture/test-tool-selection-evaluation.md)

---

**Related Records**: SDET Career & Skill Roadmap, Modern SRE Testing Stack, Test Tool Selection & Evaluation
