---
title: "Production Testing"
description: "Production testing runs synthetic checks and monitors against the live system continuously — **Checkly**, **Datadog Synthetic Monitoring**, **New Relic Synthetics**, **Grafana Synthetic Monitoring**, **Pingdom**, and **Catchpoint** are the standard tools — verifying real, deployed behavior that no amount of pre-production testing can fully guarantee."
sidebar_position: 6
tags: [test-automation, sdet, tooling]
---

# Production Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Test Execution & Operations
**Created**: 2026-08-23
**Tags**: production-testing, synthetic-monitoring, checkly, canary, shift-right

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-prodtest-title mm-prodtest-desc">
<title id="mm-prodtest-title">Outside-in synthetic checks continuously probing the live system</title>
<desc id="mm-prodtest-desc">Synthetic checks from multiple external vantage points continuously exercise the live production system, feeding results into alerting and dashboards, verifying real deployed behavior the way an actual user or dependency would experience it.</desc>
<defs>
  <marker id="mm-prodtest-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<text class="mm-flow-label" x="390" y="15" text-anchor="middle">outside-in, continuous - not a one-time check</text>

<rect class="mm-n1" x="30" y="30" width="190" height="50" rx="10"/>
<text class="mm-node-title" x="125" y="52" text-anchor="middle">Vantage Point A</text>
<text class="mm-node-sub" x="125" y="68" text-anchor="middle">synthetic checks</text>

<rect class="mm-n2" x="295" y="30" width="190" height="50" rx="10"/>
<text class="mm-node-title" x="390" y="52" text-anchor="middle">Vantage Point B</text>
<text class="mm-node-sub" x="390" y="68" text-anchor="middle">synthetic checks</text>

<rect class="mm-n3" x="560" y="30" width="190" height="50" rx="10"/>
<text class="mm-node-title" x="655" y="52" text-anchor="middle">Vantage Point C</text>
<text class="mm-node-sub" x="655" y="68" text-anchor="middle">synthetic checks</text>

<path class="mm-arrow" d="M150,80 L330,145" marker-end="url(#mm-prodtest-arrow)"/>
<path class="mm-arrow" d="M390,80 L390,145" marker-end="url(#mm-prodtest-arrow)"/>
<path class="mm-arrow" d="M630,80 L450,145" marker-end="url(#mm-prodtest-arrow)"/>

<rect class="mm-n5" x="290" y="145" width="200" height="60" rx="10"/>
<text class="mm-node-title" x="390" y="170" text-anchor="middle">Production System</text>
<text class="mm-node-sub" x="390" y="186" text-anchor="middle">the live, deployed thing</text>

<path class="mm-arrow" d="M390,205 L390,235" marker-end="url(#mm-prodtest-arrow)"/>

<rect class="mm-n4" x="270" y="235" width="240" height="50" rx="10"/>
<text class="mm-node-title" x="390" y="257" text-anchor="middle">Alerting and Dashboards</text>
<text class="mm-node-sub" x="390" y="273" text-anchor="middle">correlated with real telemetry</text>
</svg>

<p class="mental-model__caption">Production testing runs scripted checks from outside the system - the way a real user or external dependency experiences it - continuously against the live, deployed system, feeding results into the same alerting and dashboards as real telemetry rather than testing only before release.</p>
</div>

## Quick Reference

Production testing runs synthetic checks and monitors against the live system continuously — **Checkly**, **Datadog Synthetic Monitoring**, **New Relic Synthetics**, **Grafana Synthetic Monitoring**, **Pingdom**, and **Catchpoint** are the standard tools — verifying real, deployed behavior that no amount of pre-production testing can fully guarantee.

## What is it?

Production testing is [Shift-Right Testing](../foundations-strategy/shift-right-testing.md) made concrete: synthetic transactions (scripted user journeys run continuously against production, often via Playwright under the hood), uptime/latency checks, and canary analysis that treat the live system itself as a thing that needs continuous, automated verification — not just something monitored passively for alerts after a human notices a problem.

## Tool Landscape

| Tool | Focus | Best For |
|---|---|---|
| **Checkly** | Playwright-based synthetic monitoring | Teams wanting synthetic checks written in the same tool/language as their E2E suite |
| **Datadog Synthetic Monitoring** | API + browser synthetic checks | Teams already on Datadog wanting unified observability + synthetic checks |
| **New Relic Synthetics** | API + browser synthetic checks | Teams already on New Relic, similar positioning to Datadog's offering |
| **Grafana Synthetic Monitoring** | API + browser checks, Prometheus-native | Teams on the open-source Grafana/Prometheus stack wanting synthetic checks without a separate vendor |
| **Pingdom** | Uptime/latency checks | Simple, focused uptime monitoring, often a first synthetic-monitoring tool a team adopts |
| **Catchpoint** | Enterprise synthetic + real-user monitoring | Large enterprises needing global vantage points and detailed network-path diagnostics |
| **Playwright** | Underlying automation engine | Directly authoring synthetic transaction scripts, whether self-hosted or via Checkly |

## When to Use

- Continuously verifying a critical user journey (login, checkout) works on the live system, not just at deploy time
- Catching a regression that only manifests under real production conditions (real CDN, real DNS, real third-party integrations)
- Providing an independent, outside-in health signal that doesn't depend on the application's own internal monitoring being correctly instrumented

## Recommended Stack

Checkly or self-hosted Playwright scripts for synthetic transaction monitoring of critical journeys; a broader synthetic monitoring platform (Datadog/New Relic Synthetics) when already standardized on that observability vendor; pair with [Observability-Driven Testing](../observability-test-governance/observability-driven-testing.md) so synthetic check failures correlate directly with real telemetry.

## Key Takeaways

- 💡 Synthetic monitoring is outside-in verification — it tests the system the way a real user (or an external dependency) experiences it, catching issues internal monitoring alone might miss (a broken CDN config, a DNS issue, a third-party integration outage)
- 🔥 Playwright-based synthetic checks (Checkly or self-hosted) let a team reuse existing E2E test-writing skill directly for production monitoring, rather than learning a separate synthetic-monitoring DSL
- ⚠️ Synthetic checks running too infrequently (e.g., once an hour) can miss short-duration incidents entirely — frequency needs to match the acceptable time-to-detection for the journey being monitored
- ✅ Global vantage points matter for user-facing latency claims — a synthetic check running from one region says nothing about a real user's experience on another continent
- ⚡ Production testing complements, not replaces, pre-production testing — it exists specifically to catch the class of issue (real infrastructure, real scale, real third-party behavior) pre-production environments can't fully replicate

## Common Mistakes

**Mistake**: Treating passing synthetic checks as proof the system is fully healthy.
**Why it fails**: Synthetic checks verify specific, scripted journeys — they say nothing about journeys or edge cases not covered by the script, which is why they complement rather than replace broader observability.

**Mistake**: Running synthetic checks too infrequently to catch short outages.
**Why it fails**: A check running every hour can miss a 10-minute outage entirely, giving false confidence that "everything's been fine" when a real, unnoticed incident occurred.

## Advanced Usage

### Correlating synthetic failures with real telemetry

Wire synthetic check failures directly into the same alerting/observability pipeline as real user-facing metrics ([Observability-Driven Testing](../observability-test-governance/observability-driven-testing.md)) so a synthetic failure and a real error-rate spike are investigated as one incident, not two disconnected signals.

## Scenarios & How to Respond

**Scenario: A stakeholder asks why the team needs synthetic monitoring when there's already application logging and alerting.**
Audience & tone: Stakeholder — concrete, complementary framing.
Response: "Application logging tells us what our own code is doing — it can't tell us if a user actually can't reach us due to a CDN or DNS issue outside our application. Synthetic checks are the outside-in view that catches exactly that class of issue."

## See Also

- [Shift-Right Testing](../foundations-strategy/shift-right-testing.md)
- [Observability-Driven Testing](../observability-test-governance/observability-driven-testing.md)
- [Continuous Testing](../foundations-strategy/continuous-testing.md)

---

**Related Records**: Shift-Right Testing, Observability-Driven Testing, Continuous Testing
