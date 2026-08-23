---
title: "Flaky Test Management"
description: "A flaky test — one that fails intermittently without a corresponding code change — should be tracked and quarantined visibly, not silently retried or ignored."
sidebar_position: 3
tags: [test-automation, sdet, tooling]
---

# Flaky Test Management

**Type**: Reference
**Difficulty**: ⭐⭐ (Intermediate)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Test Execution & Operations
**Created**: 2026-08-23
**Tags**: flaky-tests, test-intelligence, reportportal, launchable, buildpulse

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 360" role="img" aria-labelledby="mm-flaky-title mm-flaky-desc">
<title id="mm-flaky-title">Triage fork for an intermittently failing test</title>
<desc id="mm-flaky-desc">A test fails intermittently with no code change. Silently retrying or ignoring it hides the signal and erodes trust in CI; quarantining it visibly instead preserves the signal, keeps the pipeline unblocked, and leads to it being fixed or removed.</desc>
<defs>
  <marker id="mm-flaky-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n5" x="280" y="15" width="220" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="38" text-anchor="middle">Test fails</text>
<text class="mm-node-sub" x="390" y="54" text-anchor="middle">no code change, still red</text>

<path class="mm-arrow" d="M330,100 L150,170" marker-end="url(#mm-flaky-arrow)"/>
<text class="mm-flow-label" x="200" y="130" text-anchor="middle">ignore / auto-retry</text>

<path class="mm-arrow" d="M450,100 L630,170" marker-end="url(#mm-flaky-arrow)"/>
<text class="mm-flow-label" x="580" y="130" text-anchor="middle">quarantine and track</text>

<rect class="mm-n4" x="40" y="170" width="220" height="55" rx="10"/>
<text class="mm-node-title" x="150" y="193" text-anchor="middle">Silent retry</text>
<text class="mm-node-sub" x="150" y="209" text-anchor="middle">hides the real signal</text>

<path class="mm-arrow" d="M150,225 L150,270" marker-end="url(#mm-flaky-arrow)"/>

<rect class="mm-n6" x="40" y="270" width="220" height="55" rx="10"/>
<text class="mm-node-title" x="150" y="293" text-anchor="middle">Trust erodes</text>
<text class="mm-node-sub" x="150" y="309" text-anchor="middle">"red" stops meaning broken</text>

<rect class="mm-n2" x="520" y="170" width="220" height="55" rx="10"/>
<text class="mm-node-title" x="630" y="193" text-anchor="middle">Quarantine</text>
<text class="mm-node-sub" x="630" y="209" text-anchor="middle">visible, tracked, unblocks CI</text>

<path class="mm-arrow" d="M630,225 L630,270" marker-end="url(#mm-flaky-arrow)"/>

<rect class="mm-n3" x="520" y="270" width="220" height="55" rx="10"/>
<text class="mm-node-title" x="630" y="293" text-anchor="middle">Fix or remove</text>
<text class="mm-node-sub" x="630" y="309" text-anchor="middle">prioritized backlog item</text>
</svg>

<p class="mental-model__caption">When a test fails intermittently with no matching code change, silently retrying or ignoring it hides the exact signal a team needs and slowly erodes trust in "red means broken" - visibly quarantining it instead preserves that signal, keeps the pipeline moving, and turns the flake into a tracked fix-or-remove item.</p>
</div>

## Quick Reference

A flaky test — one that fails intermittently without a corresponding code change — should be tracked and quarantined visibly, not silently retried or ignored. **ReportPortal**'s AI-based failure classification and dedicated test-intelligence tools (**Launchable**, **BuildPulse**, **Trunk**) exist specifically to surface flakiness patterns a manual review of CI logs would miss.

## What is it?

Flaky tests erode the core value proposition of a test suite: that red means broken and green means safe. Left unmanaged, a suite with even a small flaky-test population trains a team to ignore red results ("that one's just flaky"), which eventually hides a real regression behind the same excuse. Flaky test management is the discipline of detecting, tracking, quarantining, and ultimately fixing or removing flaky tests systematically.

## Tool Landscape

| Tool | Role |
|---|---|
| **ReportPortal** | AI-assisted failure classification, distinguishing likely flakiness from real regressions across historical runs |
| **Launchable** | Predictive test selection and flakiness insights, using historical data to prioritize which tests to run |
| **BuildPulse** | Dedicated flaky test detection and tracking, integrates with existing CI providers |
| **Trunk** | Flaky test detection and CI analytics, with automatic quarantine workflows |
| **Datadog CI Visibility** | CI pipeline and test analytics including flakiness tracking, if already using Datadog |
| **GitHub Actions Test Analytics** | Native test result trend tracking for teams on GitHub Actions |

## When to Use

- A team has started distrusting CI results ("just re-run it") — a strong signal flakiness has already become a cultural problem
- Introducing test retries and needing visibility into which tests are retried, and how often, rather than silent pass-on-retry
- Scaling a test suite past the point where manually tracking flaky tests in a spreadsheet or tribal knowledge is sustainable

## Recommended Stack

ReportPortal for teams wanting AI-assisted failure classification alongside general reporting; a dedicated tool (BuildPulse, Trunk) for teams specifically prioritizing flaky test detection and automatic quarantine workflows integrated with existing CI.

## Key Takeaways

- 💡 A flaky test is a specific signal, not a nuisance to dismiss — it means either a race condition in the application, a race condition in the test itself, or unreliable test infrastructure, all of which are worth knowing about
- 🔥 Silent retries that make flaky tests "pass eventually" hide the exact signal a team needs to act on — visible quarantine (tracked, not deleted or silently retried) preserves the signal while unblocking the pipeline
- ⚠️ Ignoring flaky tests compounds — each ignored flaky test further erodes trust in "red means broken," until the whole suite's signal value degrades
- ✅ Track flakiness rate as an explicit, visible metric per test, not just an anecdotal team feeling — this is what turns "that test seems flaky" into a prioritized backlog item
- ⚡ AI-based failure classification (ReportPortal) can distinguish "this failure pattern matches known flakiness" from "this is a new failure signature," meaningfully speeding up triage at scale

## Common Mistakes

**Mistake**: Adding automatic retries to every test as a blanket policy to reduce CI noise.
**Why it fails**: It masks real race conditions and application bugs behind a green checkmark just as often as it masks test-infra timing issues — see [Common Test Automation Mistakes](../test-automation-tools-technology-landscape.md#27-common-test-automation-mistakes).

**Mistake**: Deleting a flaky test instead of quarantining and tracking it.
**Why it fails**: Deletion removes the coverage entirely and loses the signal that something needs fixing — quarantine keeps the test visible as backlog work while unblocking the pipeline.

## Advanced Usage

### Flakiness rate as a quality gate input

Track flakiness rate per test/suite over time and treat a rising trend as an actionable signal in its own right — a suite whose flakiness rate is climbing is heading toward the same trust erosion regardless of current pass rate.

## Scenarios & How to Respond

**Scenario: A developer says "just re-run it, it's probably just flaky" about a failing PR check.**
Audience & tone: Direct report/peer — curious, not dismissive.
Response: "Let's check if it's a tracked flaky test first — if it's not, treating an unknown failure as 'probably flaky' is exactly how a real regression slips through. If it is tracked, let's bump its priority since it's clearly still causing friction."

## See Also

- [Test Automation Pyramid](../foundations-strategy/test-automation-pyramid.md)
- [Parallel Test Execution](./parallel-test-execution.md)
- [Test Reporting & Analytics](../observability-test-governance/test-reporting-analytics.md)

---

**Related Records**: Test Automation Pyramid, Parallel Test Execution, Test Reporting & Analytics
