---
title: "Load Testing"
description: "Load testing answers one specific question: does the system meet its SLA/SLO under expected, normal traffic — not extreme or spike conditions, which are the domain of Stress Testing and Scalability Testing."
sidebar_position: 2
tags: [test-automation, sdet, tooling]
---

# Load Testing

**Type**: Reference
**Difficulty**: ⭐⭐ (Intermediate)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Quality & Non-Functional Testing
**Created**: 2026-08-23
**Tags**: load-testing, k6, jmeter, sla, capacity

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 190" role="img" aria-labelledby="mm-loadtest-title mm-loadtest-desc">
<title id="mm-loadtest-title">Load testing checks expected traffic against a defined SLA</title>
<desc id="mm-loadtest-desc">Real historical traffic data shapes a realistic load profile, which is run against the system, and the resulting latency and error rate are compared against a defined SLA to produce a pass or fail result.</desc>
<defs>
  <marker id="mm-loadtest-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n5" x="10" y="65" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="95" y="90" text-anchor="middle">Historical Traffic</text>
<text class="mm-node-sub" x="95" y="107" text-anchor="middle">real peak, not a guess</text>

<path class="mm-arrow" d="M180,95 L205,95" marker-end="url(#mm-loadtest-arrow)"/>

<rect class="mm-n1" x="210" y="65" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="295" y="90" text-anchor="middle">Load Test</text>
<text class="mm-node-sub" x="295" y="107" text-anchor="middle">sustained, expected traffic</text>

<path class="mm-arrow" d="M380,95 L405,95" marker-end="url(#mm-loadtest-arrow)"/>

<rect class="mm-n3" x="410" y="65" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="495" y="90" text-anchor="middle">Latency &amp; Error Rate</text>
<text class="mm-node-sub" x="495" y="107" text-anchor="middle">p95, p99, error %</text>

<path class="mm-arrow" d="M580,95 L605,95" marker-end="url(#mm-loadtest-arrow)"/>

<rect class="mm-n4" x="610" y="65" width="165" height="60" rx="10"/>
<text class="mm-node-title" x="692" y="90" text-anchor="middle">SLA Gate</text>
<text class="mm-node-sub" x="692" y="107" text-anchor="middle">pass / fail vs. SLO</text>

<text class="mm-flow-label" x="390" y="155" text-anchor="middle">exceeding this expected level on purpose is stress or scalability testing, not load testing</text>
</svg>

<p class="mental-model__caption">Load testing answers one narrow question: at realistic, expected traffic — sourced from real historical data, not a guess — does latency and error rate stay inside the defined SLA? Anything past that expected level is a different test.</p>
</div>

## Quick Reference

Load testing answers one specific question: does the system meet its SLA/SLO under **expected, normal** traffic — not extreme or spike conditions, which are the domain of [Stress Testing](./stress-testing.md) and [Scalability Testing](./scalability-testing.md).

## What is it?

A load test applies a realistic, sustained traffic profile — matching expected peak usage, not a worst-case extreme — and verifies latency, throughput, and error rate stay within defined bounds. It's the baseline performance test every production-facing service should have before launch, distinct from finding the breaking point (stress testing) or verifying resources scale proportionally (scalability testing).

## Tool Landscape

| Tool | Notes |
|---|---|
| **k6** | Scripted, code-first virtual-user ramping to a target load level |
| **JMeter** | Thread-group-based load modeling, GUI or CLI |
| **Gatling** | Async engine, efficient at generating high concurrent load per node |
| **Locust** | Python-defined user behavior, distributed master-worker execution |

## When to Use

- Pre-launch validation that a service meets its defined SLA under expected traffic
- Recurring regression testing to catch performance drift after code changes
- Sizing infrastructure for a known, expected traffic level (versus stress testing's unknown-breaking-point goal)

## Recommended Stack

k6 scripted against expected peak concurrent users/RPS, run in CI on a schedule (not just pre-launch), with results compared against a stored baseline — see [Performance Testing](./performance-testing.md) for the full observability-paired stack.

## Key Takeaways

- 💡 Load testing verifies "does it meet the SLA at expected traffic," which is a narrower and more common question than "where does it break" (stress testing)
- 🔥 A realistic traffic *profile* (request mix, think-time between actions) matters as much as raw request volume — a load test using unrealistic uniform request patterns can pass while missing real bottlenecks
- ⚠️ "Expected traffic" should come from real analytics/historical peak data, not a guess — an arbitrary target number produces a test that proves nothing about actual risk
- ✅ Running load tests in CI as a recurring, lightweight check catches performance regressions before they compound into a launch-week surprise
- ⚡ Load test results are only meaningful against a defined SLA — always define acceptable p95/p99 latency and error rate before running, not after

## Common Mistakes

**Mistake**: Defining "expected load" as an arbitrary round number instead of derived from real traffic data.
**Why it fails**: The test proves the system handles a number that may not reflect actual risk — either overtesting (wasted effort) or undertesting (false confidence) relative to real peak traffic.

**Mistake**: Running load tests only against a scaled-down staging environment.
**Why it fails**: Results from an undersized environment don't transfer to production capacity — the test needs to run against production-equivalent scale to be meaningful.

## Advanced Usage

### Realistic traffic modeling

Model request mix (the actual proportion of read vs. write endpoints, search vs. checkout) and think-time between user actions rather than a flat, uniform request rate — this is what separates a load test that predicts real production behavior from one that just generates numbers.

## Scenarios & How to Respond

**Scenario: An engineering manager asks what "expected load" means for an upcoming feature launch.**
Audience & tone: Manager — data-driven, collaborative.
Response: "I'd pull historical peak traffic for comparable features plus any marketing/launch projections from the product team, and build the load profile from that rather than guessing — that's what makes the pass/fail result actually meaningful."

## See Also

- [Performance Testing](./performance-testing.md)
- [Stress Testing](./stress-testing.md)
- [Scalability Testing](./scalability-testing.md)

---

**Related Records**: Performance Testing, Stress Testing, Scalability Testing
