---
title: "SDET Career & Skill Roadmap"
description: "The test automation landscape spans dozens of tool categories — trying to learn all of them at once produces shallow familiarity with twenty tools instead of real depth in the ones that compound."
sidebar_position: 1
tags: [test-automation, sdet, tooling]
---

# SDET Career & Skill Roadmap

**Type**: Workflow
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Building Your Tooling Roadmap
**Created**: 2026-08-23
**Tags**: career-roadmap, sdet, prioritization, learning-path

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-careertier-title mm-careertier-desc">
<title id="mm-careertier-title">Three tiers, mastered in sequence, each compounding into the next</title>
<desc id="mm-careertier-desc">Tier 1 functional and CI foundations are mastered first and are widest, since everything depends on them. Tier 2 SRE-adjacent tools build on that foundation. Tier 3 AI-powered tooling sits on top as an accelerant, not a substitute for the base.</desc>
<defs>
  <marker id="mm-careertier-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n5" x="280" y="20" width="220" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="43" text-anchor="middle">Tier 3 — AI-Powered</text>
<text class="mm-node-sub" x="390" y="60" text-anchor="middle">accelerant, not a foundation</text>

<path class="mm-arrow" d="M390,115 L390,80" marker-end="url(#mm-careertier-arrow)"/>

<rect class="mm-n3" x="190" y="115" width="400" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="138" text-anchor="middle">Tier 2 — SDET → SRE</text>
<text class="mm-node-sub" x="390" y="155" text-anchor="middle">k6, Terraform, observability, chaos</text>

<path class="mm-arrow" d="M390,210 L390,175" marker-end="url(#mm-careertier-arrow)"/>

<rect class="mm-n1" x="60" y="210" width="660" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="233" text-anchor="middle">Tier 1 — Master First</text>
<text class="mm-node-sub" x="390" y="250" text-anchor="middle">Playwright, TypeScript, Pytest, REST, GitLab CI, Docker, AWS, SQL</text>

<text class="mm-flow-label" x="650" y="100" text-anchor="middle">depth here compounds</text>
<text class="mm-flow-label" x="650" y="114" text-anchor="middle">into every tier above it</text>
</svg>

<p class="mental-model__caption">Each tier only compounds once the one below it is solid — a wide, mastered Tier 1 foundation is what makes Tier 2's SRE-adjacent tools and Tier 3's AI accelerant actually pay off, instead of sitting on ground that shifts underneath them.</p>
</div>

## Quick Reference

The test automation landscape spans dozens of tool categories — trying to learn all of them at once produces shallow familiarity with twenty tools instead of real depth in the ones that compound. Sequence by tier, not by interest: master the functional/API/CI foundation first, layer on SRE-adjacent tools (performance, contract testing, IaC, observability, chaos) second, and treat AI-powered tooling as an accelerant on top of a solid base, not a substitute for one.

## What is it?

This is a prioritization framework, not a tool category — it's the answer to "given everything in this domain, what do I actually learn next?" The framework exists because breadth-first learning across every category simultaneously is a real trap: it feels productive but produces surface-level exposure that doesn't hold up under a real production incident or a technical interview that goes two questions deep.

## The Stack

Each layer builds on the one below it — depth in an upper layer without the lower layers is where "the demo works but production doesn't" comes from:

```text
                    TEST AUTOMATION
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
       UI                API             Backend
   (Web UI & E2E)    (API Automation)  (Unit Testing)
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                     PERFORMANCE
                (Performance Testing)
                          │
                    CI/CD PIPELINE
                (CI/CD Test Automation)
                          │
                        DOCKER
              (Integration Testing, Contract Testing,
               Event-Driven & Messaging Testing)
                          │
                        AWS
              (Cloud Testing, Infrastructure Testing)
                          │
                 ┌────────┴────────┐
                 │                 │
             Kubernetes        Terraform
        (Kubernetes Testing)  (IaC Testing)
                 │                 │
                 └────────┬────────┘
                          │
                     OBSERVABILITY
              (Observability-Driven Testing)
                          │
                    RELIABILITY
             (Chaos & Resilience Testing)
                          │
                         AI
              (AI-Powered Test Automation)
```

## When to Use

- Deciding what to learn next when the full landscape feels overwhelming
- Evaluating whether a job posting's tool requirements represent a Tier 1, 2, or 3 expectation
- Building a personal 6–12 month learning plan instead of an unstructured list of tools to "get to eventually"

## Recommended Stack

### Tier 1 — Master

Playwright, TypeScript, Pytest, REST API automation, GitLab CI/CD, Docker, AWS, SQL.

This tier is the foundation everything else sits on. Depth here compounds into every higher tier — a shaky foundation means every SRE-adjacent tool added later gets built on ground that shifts under it. This is also the tier most SDET job postings actually screen for.

### Tier 2 — SDET → SRE

k6, Testcontainers, WireMock, Pact, Terraform + Terratest, Kubernetes testing, OpenTelemetry, Prometheus/Grafana, Chaos Mesh/Litmus, AWS Fault Injection Service. See [SDET → SRE Transition](./sdet-sre-transition.md) for the dedicated roadmap.

### Tier 3 — AI-Powered Automation

AI coding agents, AI test generation, AI visual testing, self-healing automation, test failure/root-cause agents. This tier is an accelerant, not a foundation — see [AI-Powered Test Automation](../ai-powered-test-automation/ai-powered-test-automation.md).

## Key Takeaways

- 💡 Depth in Tier 1 beats breadth across all three tiers — a technical interview or a real incident exposes shallow tool familiarity fast
- 🔥 Tier 2 tools only compound once Tier 1 is solid — chaos engineering, IaC testing, and observability all assume a working CI/CD and infrastructure foundation
- ⚠️ Don't let Tier 3 (AI tooling) jump the queue just because it's the most visible/exciting category right now
- ✅ Map this roadmap against a specific target role's requirements rather than trying to complete every tier in the abstract
- ⚡ Time-box each tier rather than treating it as open-ended — a working proficiency is a reasonable milestone; chasing expert-level depth in every tool before moving on is how the plan stalls

## Common Mistakes

**Mistake**: Trying to learn breadth-first across every category simultaneously.
**Why it fails**: Splitting limited learning time across many categories at once means shallow exposure everywhere and real competence nowhere.

**Mistake**: Chasing AI-powered tooling (Tier 3) before Tier 1/2 fundamentals are solid.
**Why it fails**: AI tooling amplifies existing judgment rather than substituting for it — someone without a solid grasp of what a "correct" test looks like has no way to evaluate whether the AI's output is actually right.

## Advanced Usage

### Mapping the roadmap to a job posting

Read a target job posting's tool list against these tiers: if it's mostly Tier 1 names, the gap to close is depth, not breadth; if it lists several Tier 2 names, that's a signal the role expects SRE-adjacent reliability ownership.

## Scenarios & How to Respond

**Scenario: A direct report is overwhelmed by the size of the tooling landscape and doesn't know where to start.**
Audience & tone: Direct report — supportive, concrete, break the overwhelm into a first step.
Response: "Don't try to learn all of this at once — pick one Tier 1 gap you actually have right now and go deep on just that for a few weeks. Everything else will make a lot more sense once that foundation is solid."

## See Also

- [SDET → SRE Transition](./sdet-sre-transition.md)
- [Modern SDET Technology Stack](./modern-sdet-technology-stack.md)
- [Test Automation Pyramid](../foundations-strategy/test-automation-pyramid.md)

---

**Related Records**: SDET → SRE Transition, Modern SDET Technology Stack, Test Automation Pyramid
