---
title: "Modern SRE Testing Stack"
description: "An SRE's 'testing' stack extends an SDET's with production-facing tools: **Prometheus/Grafana** at depth for SLO tracking, **PagerDuty**-style incident response tooling, **Kubernetes operations** fluency (not just testing manifests but operating clusters), **Terraform** for infrastructure ownership, and **chaos engineering at production scale** (LitmusChaos/Chaos Mesh/AWS FIS/Gremlin run as standing practice, not one-off experiments)."
sidebar_position: 4
tags: [test-automation, sdet, tooling]
---

# Modern SRE Testing Stack

**Type**: Reference
**Difficulty**: ⭐⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Building Your Tooling Roadmap
**Created**: 2026-08-23
**Tags**: sre-stack, slo, chaos-engineering, incident-response, observability

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 270" role="img" aria-labelledby="mm-srestack-title mm-srestack-desc">
<title id="mm-srestack-title">The SRE stack shares the SDET stack's core tools, plus one genuinely new layer</title>
<desc id="mm-srestack-desc">The same core tools — Prometheus, Grafana, OpenTelemetry, Terraform, chaos tooling — split into a pre-production SDET use and a continuous, production-facing SRE use, with incident response as the one layer that has no direct SDET equivalent.</desc>
<defs>
  <marker id="mm-srestack-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n6" x="290" y="15" width="200" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="38" text-anchor="middle">Shared Core Tools</text>
<text class="mm-node-sub" x="390" y="54" text-anchor="middle">Prometheus · Grafana · OTel · Terraform · chaos</text>

<path class="mm-arrow" d="M340,70 L180,110" marker-end="url(#mm-srestack-arrow)"/>
<path class="mm-arrow" d="M440,70 L600,110" marker-end="url(#mm-srestack-arrow)"/>

<rect class="mm-n2" x="40" y="110" width="280" height="60" rx="10"/>
<text class="mm-node-title" x="180" y="134" text-anchor="middle">SDET: Pre-Production</text>
<text class="mm-node-sub" x="180" y="151" text-anchor="middle">test assertions, per run</text>

<rect class="mm-n3" x="460" y="110" width="280" height="60" rx="10"/>
<text class="mm-node-title" x="600" y="134" text-anchor="middle">SRE: Production</text>
<text class="mm-node-sub" x="600" y="151" text-anchor="middle">continuous ops, on-call</text>

<path class="mm-arrow" d="M600,170 L600,200" marker-end="url(#mm-srestack-arrow)"/>

<rect class="mm-n1" x="460" y="200" width="280" height="50" rx="10"/>
<text class="mm-node-title" x="600" y="223" text-anchor="middle">Incident Response</text>
<text class="mm-node-sub" x="600" y="239" text-anchor="middle">no SDET-stack equivalent</text>
</svg>

<p class="mental-model__caption">The SRE stack largely reuses SDET tooling at a different cadence and stakes — the same observability and chaos tools, run continuously instead of per test run — with incident response and postmortem discipline as the one genuinely new layer.</p>
</div>

## Quick Reference

An SRE's "testing" stack extends an SDET's with production-facing tools: **Prometheus/Grafana** at depth for SLO tracking, **PagerDuty**-style incident response tooling, **Kubernetes operations** fluency (not just testing manifests but operating clusters), **Terraform** for infrastructure ownership, and **chaos engineering at production scale** (LitmusChaos/Chaos Mesh/AWS FIS/Gremlin run as standing practice, not one-off experiments).

## What is it?

Where a modern SDET stack ([Modern SDET Technology Stack](./modern-sdet-technology-stack.md)) is built around verifying a system pre-production, the SRE stack is built around keeping a system healthy and recovering it quickly once it's live — SLO/error-budget management, incident response, capacity planning, and production-scale resilience testing.

## The Stack

| Category | Tools | SDET-Stack Equivalent |
|---|---|---|
| **Observability** | Prometheus, Grafana, OpenTelemetry, Loki, Jaeger — at operational depth (alerting, dashboards, on-call runbooks) | Same tools, but as test assertions rather than standing operational infrastructure |
| **Incident response** | PagerDuty or equivalent, runbooks, postmortem tooling | [AI Root Cause Analysis](../ai-powered-test-automation/ai-root-cause-analysis.md) as the automated-assist analog |
| **Kubernetes operations** | `kubectl`, Helm, cluster autoscaling, RBAC management | [Kubernetes Testing](../delivery-pipeline-infrastructure/kubernetes-testing.md) |
| **Infrastructure ownership** | Terraform, policy-as-code (OPA/Sentinel), drift detection | [Infrastructure as Code (IaC) Testing](../delivery-pipeline-infrastructure/infrastructure-as-code-iac-testing.md) |
| **Chaos at production scale** | LitmusChaos, Chaos Mesh, Gremlin, AWS FIS, run as recurring game days | [Chaos & Resilience Testing](../distributed-systems-resilience-testing/chaos-resilience-testing.md) |
| **Capacity planning** | Load testing (k6) applied to real traffic forecasting, not just pre-release gates | [Scalability Testing](../quality-non-functional-testing/scalability-testing.md) |

## When to Use

- Already operating in (or transitioning into) an SRE role and building out the production-facing side of the toolset
- Comparing what changes from an SDET's pre-production stack to an SRE's production-facing responsibilities
- Structuring an on-call readiness checklist for a service's owning team

## Recommended Stack

Prometheus/Grafana/OpenTelemetry as the observability backbone (shared with the SDET stack, but operated continuously rather than invoked per test run); PagerDuty or equivalent for incident response; Terraform for infrastructure-as-code ownership at production scale; recurring chaos game days (not one-off experiments) as standing SRE practice.

## Summary

- 💡 The SRE stack largely reuses the same underlying tools as the SDET stack (Prometheus, Grafana, OpenTelemetry, Terraform, chaos tooling) — the difference is operational cadence and stakes, not a different toolset entirely
- 🔥 SLOs and error budgets are the SRE-native version of a test assertion — the same "define correct, verify continuously" instinct applied to the live system's reliability target
- ⚠️ Chaos engineering as a recurring, scheduled SRE practice (game days) is a meaningfully different commitment than a one-off chaos experiment run during an SDET's test cycle — it requires organizational buy-in and safety tooling maturity
- ✅ Incident response tooling and postmortem discipline are the parts of this stack with no direct SDET-stack equivalent — this is the genuinely new skill area in the transition, not just a deeper version of an existing one
- ⚡ Capacity planning extends performance testing from a pre-release gate into an ongoing, forecast-driven practice tied to real business growth projections, not just a fixed SLA check

## Common Mistakes

**Mistake**: Assuming the SRE stack requires an entirely different toolset from the SDET stack.
**Why it fails**: Most of the tooling overlaps directly (Prometheus, Grafana, Terraform, chaos tools) — the real gap is operational maturity (running these continuously, at production stakes) and the incident-response layer that has no direct SDET equivalent.

**Mistake**: Running chaos engineering as an occasional special project rather than a recurring, scheduled practice once in an SRE-facing role.
**Why it fails**: Resilience findings decay — a system verified resilient six months ago, after multiple deploys and infrastructure changes, isn't guaranteed to still be resilient today.

## Advanced Usage

### SLO-driven prioritization

Use error-budget consumption (how much of an SLO's allowed failure margin has been used) as the input that decides whether a team spends the next sprint on new features or reliability work — this operationalizes the SRE philosophy directly rather than leaving it as a principle nobody applies day-to-day.

## Scenarios & How to Respond

**Scenario: An engineer transitioning from SDET asks what's genuinely new to learn versus what transfers.**
Audience & tone: Mentee — honest, specific.
Response: "Most of the tooling transfers directly — Prometheus, Grafana, Terraform, chaos engineering, you already know these. What's genuinely new is incident response discipline and SLO/error-budget management as an ongoing operational practice, not a one-time test. That's where I'd focus your next few months."

## See Also

- [SDET → SRE Transition](./sdet-sre-transition.md)
- [Modern SDET Technology Stack](./modern-sdet-technology-stack.md)
- [Chaos & Resilience Testing](../distributed-systems-resilience-testing/chaos-resilience-testing.md)

---

**Related Records**: SDET → SRE Transition, Modern SDET Technology Stack, Chaos & Resilience Testing
