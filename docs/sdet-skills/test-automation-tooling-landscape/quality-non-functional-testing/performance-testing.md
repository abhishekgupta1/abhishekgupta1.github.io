---
title: "Performance Testing"
description: "**k6** is the modern default for API/service-level performance testing — JS-based scripting, code-as-config, and native Grafana/Prometheus integration make it the natural fit for a team already living in CI/CD and observability tooling."
sidebar_position: 1
tags: [test-automation, sdet, tooling]
---

# Performance Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Quality & Non-Functional Testing
**Created**: 2026-08-23
**Tags**: performance-testing, k6, jmeter, gatling, sre, observability

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 290" role="img" aria-labelledby="mm-perftest-title mm-perftest-desc">
<title id="mm-perftest-title">Performance testing as an umbrella over three specific test types, paired with observability</title>
<desc id="mm-perftest-desc">Performance testing is the umbrella discipline covering load testing, stress testing, and scalability testing. All three feed into an observability stack of k6, Grafana, Prometheus, and OpenTelemetry that reveals why, not just that, a system degraded.</desc>
<defs>
  <marker id="mm-perftest-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n3" x="300" y="15" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="38" text-anchor="middle">Performance Testing</text>
<text class="mm-node-sub" x="390" y="54" text-anchor="middle">the umbrella discipline</text>

<path class="mm-arrow" d="M340,70 L130,115" marker-end="url(#mm-perftest-arrow)"/>
<path class="mm-arrow" d="M390,70 L390,115" marker-end="url(#mm-perftest-arrow)"/>
<path class="mm-arrow" d="M440,70 L650,115" marker-end="url(#mm-perftest-arrow)"/>

<rect class="mm-n1" x="40" y="115" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="130" y="138" text-anchor="middle">Load Testing</text>
<text class="mm-node-sub" x="130" y="154" text-anchor="middle">meets SLA at expected traffic?</text>

<rect class="mm-n5" x="300" y="115" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="138" text-anchor="middle">Stress Testing</text>
<text class="mm-node-sub" x="390" y="154" text-anchor="middle">where's the breaking point?</text>

<rect class="mm-n2" x="560" y="115" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="650" y="138" text-anchor="middle">Scalability Testing</text>
<text class="mm-node-sub" x="650" y="154" text-anchor="middle">do resources scale it?</text>

<path class="mm-arrow" d="M130,170 L340,225" marker-end="url(#mm-perftest-arrow)"/>
<path class="mm-arrow" d="M390,170 L390,225" marker-end="url(#mm-perftest-arrow)"/>
<path class="mm-arrow" d="M650,170 L440,225" marker-end="url(#mm-perftest-arrow)"/>

<rect class="mm-n4" x="190" y="225" width="400" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="248" text-anchor="middle">Observability: k6 → Grafana → Prometheus → OTel</text>
<text class="mm-node-sub" x="390" y="264" text-anchor="middle">reveals *why* it degraded, not just *that* it did</text>
</svg>

<p class="mental-model__caption">Performance testing is the umbrella term; load, stress, and scalability testing are its three specific test types, each answering a different question — and all three only become truly diagnostic once paired with an observability stack that shows which downstream call actually degraded under load.</p>
</div>

## Quick Reference

**k6** is the modern default for API/service-level performance testing — JS-based scripting, code-as-config, and native Grafana/Prometheus integration make it the natural fit for a team already living in CI/CD and observability tooling. **JMeter** and **Gatling** remain strong where GUI-driven authoring or broader protocol coverage is needed. Performance testing is the umbrella discipline; [Load Testing](./load-testing.md), [Stress Testing](./stress-testing.md), and [Scalability Testing](./scalability-testing.md) are its specific test types.

## What is it?

Performance testing measures how a system behaves under load — throughput, latency, and error rate as concurrent users or request volume increases — rather than whether a single request returns the correct result. It's the point where SDET work starts overlapping directly with SRE concerns: SLOs, capacity planning, and the difference between a system that degrades gracefully and one that falls over.

## Tool Landscape

| Tool | Best For |
|---|---|
| **k6** | Modern, code-first API/service-level performance testing |
| **JMeter** | Broadest protocol coverage (HTTP, JDBC, JMS), GUI-driven authoring |
| **Gatling** | High-throughput-per-node testing with strong built-in reporting |
| **Locust** | Python-based, full-code flexibility |
| **Artillery** | Node.js/YAML, low-code quick setup |
| **NeoLoad / LoadRunner** | Enterprise, legacy protocol coverage |
| **Vegeta / wrk** | Lightweight raw-throughput benchmarking CLIs |
| **Tsung** | Multi-protocol (including XMPP) distributed load generation |

## When to Use

- Establishing a latency/throughput baseline so future regressions are detectable
- Validating a service meets its SLO before a launch or high-traffic event
- Diagnosing a suspected bottleneck (a new endpoint, a DB query, a downstream dependency) in isolation

## Recommended Stack

For an SRE-facing path, the stack is bigger than the load-generation tool itself: **k6 → Grafana → Prometheus → OpenTelemetry**. Running k6 without correlating results against the system's own telemetry only tells you "requests succeeded or failed" — pairing it with dashboards and traces reveals *why* latency degraded under load.

## Key Takeaways

- 💡 A performance test without an SLO to compare against is just a number — define the acceptable p95/p99 latency and error-rate threshold before running the test
- 🔥 k6's JS-based scripting means the same engineers writing Playwright/API tests can write performance tests without a second DSL — the main reason it's displaced JMeter on JS-native teams
- ⚠️ Testing from a single load-generation region against a globally distributed service understates real-world latency
- ✅ Run tests against an environment that mirrors production scale (data volume, instance sizing) — numbers from an undersized environment don't transfer
- ⚡ Ramp load gradually rather than an instant step to peak — gradual ramps reveal early degradation signals an instant spike masks

## Common Mistakes

**Mistake**: Running a performance test once before a big launch and never again.
**Why it fails**: Performance characteristics drift as code changes — a system meeting its SLO three months ago can silently regress; it needs to be a recurring CI check, not a one-time event.

**Mistake**: Treating "the test completed without errors" as success without checking the actual latency distribution.
**Why it fails**: A system can return 100% successful responses while p99 latency is 10x the SLO — error rate and latency are separate signals.

## Advanced Usage

### Correlating performance tests with distributed traces

Run k6 against a service instrumented with OpenTelemetry, and use trace data (not just k6's own output) to identify exactly which downstream call degrades first under load — turning "the system got slow" into "this database connection pool exhausted at 400 concurrent users."

## Scenarios & How to Respond

**Scenario: A stakeholder wants to skip performance testing before a high-traffic launch to save time.**
Audience & tone: Stakeholder — pragmatic, risk-framed.
Response: "A performance test here takes half a day; an outage during the launch costs far more in both the incident and the trust hit — I'd rather find the breaking point now, on our terms."

## See Also

- [Load Testing](./load-testing.md)
- [Stress Testing](./stress-testing.md)
- [Scalability Testing](./scalability-testing.md)
- [Observability-Driven Testing](../observability-test-governance/observability-driven-testing.md)

---

**Related Records**: Load Testing, Stress Testing, Scalability Testing, Observability-Driven Testing
