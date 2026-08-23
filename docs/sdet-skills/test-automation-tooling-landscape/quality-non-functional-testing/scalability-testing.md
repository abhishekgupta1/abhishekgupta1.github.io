---
title: "Scalability Testing"
description: "Scalability testing verifies that adding resources — horizontal (more instances) or vertical (bigger instances) — actually improves throughput proportionally, and that autoscaling mechanisms react correctly under real load."
sidebar_position: 4
tags: [test-automation, sdet, tooling]
---

# Scalability Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Quality & Non-Functional Testing
**Created**: 2026-08-23
**Tags**: scalability-testing, autoscaling, capacity-planning, soak-testing

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 240" role="img" aria-labelledby="mm-scaletest-title mm-scaletest-desc">
<title id="mm-scaletest-title">Doubling infrastructure forks into proportional scaling or a hidden bottleneck</title>
<desc id="mm-scaletest-desc">Adding twice the infrastructure either produces proportionally higher throughput, confirming scalability, or is capped by a shared bottleneck like a single database, revealing a real scalability problem that scalability testing exists to surface.</desc>
<defs>
  <marker id="mm-scaletest-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n3" x="300" y="15" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="38" text-anchor="middle">Add 2x Resources</text>
<text class="mm-node-sub" x="390" y="54" text-anchor="middle">horizontal or vertical</text>

<path class="mm-arrow" d="M350,70 L190,130" marker-end="url(#mm-scaletest-arrow)"/>
<path class="mm-arrow" d="M430,70 L590,130" marker-end="url(#mm-scaletest-arrow)"/>

<rect class="mm-n6" x="60" y="130" width="260" height="65" rx="10"/>
<text class="mm-node-title" x="190" y="155" text-anchor="middle">Throughput ≈ 2x</text>
<text class="mm-node-sub" x="190" y="172" text-anchor="middle">scales proportionally — good</text>

<rect class="mm-n1" x="460" y="130" width="260" height="65" rx="10"/>
<text class="mm-node-title" x="590" y="155" text-anchor="middle">Throughput ≈ 1.3x</text>
<text class="mm-node-sub" x="590" y="172" text-anchor="middle">shared DB/queue caps it</text>

<text class="mm-flow-label" x="390" y="223" text-anchor="middle">scalability testing exists to find out which one actually happens</text>
</svg>

<p class="mental-model__caption">Doubling infrastructure doesn't guarantee doubled throughput — a shared, non-scaling bottleneck (a single database, a serialized queue) can quietly cap capacity well below the naive expectation, and scalability testing is what surfaces which outcome you actually get before it becomes a production incident.</p>
</div>

## Quick Reference

Scalability testing verifies that adding resources — horizontal (more instances) or vertical (bigger instances) — actually improves throughput proportionally, and that autoscaling mechanisms react correctly under real load. **Soak testing** (sustained load over a long duration) is closely related, verifying stability doesn't degrade over time even without increasing load.

## What is it?

A system that handles 2x traffic on 2x infrastructure isn't guaranteed by having handled 1x traffic on 1x infrastructure — bottlenecks (a single shared database, a non-scaling cache, a serialized queue) can prevent proportional improvement. Scalability testing runs the same load test at multiple infrastructure sizes to verify throughput actually scales, and validates that autoscaling triggers correctly and quickly enough to matter.

## Tool Landscape

| Tool | Role |
|---|---|
| **k6 / Gatling / Locust** | Generating comparable load profiles at different infrastructure scales to compare throughput |
| **Kubernetes HPA** (Horizontal Pod Autoscaler) | The scaling mechanism itself, under test — see [Kubernetes Testing](../delivery-pipeline-infrastructure/kubernetes-testing.md) |
| **Prometheus / Grafana** | Observing whether scaling events actually trigger at the expected threshold and in the expected time window |

## When to Use

- Validating that Kubernetes HPA or cloud auto-scaling groups react correctly under real load, not just in theory
- Capacity planning for anticipated growth — proving infrastructure investment will actually deliver proportional capacity
- Diagnosing a bottleneck that prevents linear scaling (a shared resource, a serialization point) before it becomes a production incident

## Recommended Stack

Run identical load profiles at multiple instance counts/sizes with k6 or Gatling, observe via Prometheus/Grafana whether throughput scales proportionally and whether autoscaling reacts within an acceptable time window; combine with [Stress Testing](./stress-testing.md) to find the point where scaling stops helping.

## Key Takeaways

- 💡 "Scales" means throughput improves proportionally with added resources — a system that needs 4x resources for 2x throughput has a real scalability problem worth investigating
- 🔥 Autoscaling reaction time matters as much as its eventual correctness — a system that scales up 5 minutes after a spike started still failed users during those 5 minutes
- ⚠️ A shared, non-scaling bottleneck (a single database instance, a serialized queue) caps scalability no matter how many application instances are added — scalability testing exists specifically to surface this class of bug
- ✅ Soak testing (sustained load over hours, not minutes) catches degradation load tests miss entirely — memory leaks, connection pool exhaustion, and disk-space growth only show up over time
- ⚡ Vertical and horizontal scaling have different failure modes — verify both if your infrastructure strategy might use either

## Common Mistakes

**Mistake**: Assuming linear scalability without testing it, based on adding "more of the same" infrastructure.
**Why it fails**: A shared resource bottleneck can silently cap throughput well below the naive expectation, and the gap is only visible once real load is applied at the new scale.

**Mistake**: Running a scalability test for only a few minutes at each scale level.
**Why it fails**: Short runs miss soak-testing-class issues (memory leaks, slow resource exhaustion) that only manifest after sustained load — scalability and soak testing should be run together, not treated as fully separate.

## Advanced Usage

### Testing autoscaling reaction time specifically

Apply a sudden load increase (a spike pattern) and measure the time between the load increase and the autoscaler's first successful new instance becoming healthy and serving traffic — this number, not just the eventual scaled throughput, is often the actual user-facing risk.

## Scenarios & How to Respond

**Scenario: An SRE asks whether the team's Kubernetes HPA configuration will actually handle a projected 3x traffic increase.**
Audience & tone: SRE peer — technical, collaborative.
Response: "Let's not guess — I'll run a scalability test ramping to 3x current load against a staging cluster with the same HPA config, and we'll watch both eventual throughput and how long the scale-up takes to kick in. That gives us a real answer instead of an assumption."

## See Also

- [Load Testing](./load-testing.md)
- [Stress Testing](./stress-testing.md)
- [Kubernetes Testing](../delivery-pipeline-infrastructure/kubernetes-testing.md)

---

**Related Records**: Load Testing, Stress Testing, Kubernetes Testing
