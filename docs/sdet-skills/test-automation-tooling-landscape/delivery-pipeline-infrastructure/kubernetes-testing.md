---
title: "Kubernetes Testing"
description: "Kubernetes testing spans manifest validation (**kubeval**, **kubeconform**, **kube-score**, **Polaris**), in-cluster test execution (**Testkube**, `helm test`), security posture (**kube-bench**), and chaos/resilience (**LitmusChaos**, **Chaos Mesh**) — each solving a different layer of 'is this cluster actually healthy and correctly configured.'."
sidebar_position: 5
tags: [test-automation, sdet, tooling]
---

# Kubernetes Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Delivery Pipeline & Infrastructure
**Created**: 2026-08-23
**Tags**: kubernetes, helm, testkube, kube-bench, chaos-mesh, eks

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 320" role="img" aria-labelledby="mm-k8s-title mm-k8s-desc">
<title id="mm-k8s-title">Kubernetes testing as layers from manifest validation up to chaos, with security running alongside</title>
<desc id="mm-k8s-desc">Cheap manifest validation runs before deploy; post-deploy verification and chaos/resilience testing build on top of that; a scheduled security posture scan runs continuously alongside deployment, not just once at cluster setup.</desc>
<defs>
  <marker id="mm-k8s-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="140" y="240" width="320" height="56" rx="10"/>
<text class="mm-node-title" x="300" y="263" text-anchor="middle">Manifest Validation</text>
<text class="mm-node-sub" x="300" y="280" text-anchor="middle">kubeconform, kube-score — before deploy</text>

<path class="mm-arrow" d="M300,240 L300,206" marker-end="url(#mm-k8s-arrow)"/>

<rect class="mm-n2" x="190" y="150" width="220" height="56" rx="10"/>
<text class="mm-node-title" x="300" y="173" text-anchor="middle">Deploy + Verify</text>
<text class="mm-node-sub" x="300" y="190" text-anchor="middle">helm test, kubectl, Testkube</text>

<path class="mm-arrow" d="M300,150 L300,116" marker-end="url(#mm-k8s-arrow)"/>

<rect class="mm-n4" x="230" y="60" width="140" height="56" rx="10"/>
<text class="mm-node-title" x="300" y="83" text-anchor="middle">Chaos Test</text>
<text class="mm-node-sub" x="300" y="100" text-anchor="middle">LitmusChaos, Chaos Mesh</text>

<text class="mm-flow-label" x="480" y="118" text-anchor="middle">continuous,</text>
<text class="mm-flow-label" x="480" y="132" text-anchor="middle">not one-time</text>

<rect class="mm-n5" x="540" y="150" width="210" height="60" rx="10"/>
<text class="mm-node-title" x="645" y="176" text-anchor="middle">kube-bench (CIS)</text>
<text class="mm-node-sub" x="645" y="193" text-anchor="middle">scheduled security posture</text>

<path class="mm-arrow" d="M410,178 L540,180" marker-end="url(#mm-k8s-arrow)"/>
</svg>

<p class="mental-model__caption">Kubernetes testing builds upward — cheap manifest validation catches misconfiguration before anything deploys, post-deploy verification checks the running workload, and chaos testing proves resilience actually holds — while a security posture scan (kube-bench) runs on a recurring schedule alongside the whole stack rather than once at cluster setup.</p>
</div>

## Quick Reference

Kubernetes testing spans manifest validation (**kubeval**, **kubeconform**, **kube-score**, **Polaris**), in-cluster test execution (**Testkube**, `helm test`), security posture (**kube-bench**), and chaos/resilience (**LitmusChaos**, **Chaos Mesh**) — each solving a different layer of "is this cluster actually healthy and correctly configured."

## What is it?

Kubernetes introduces a distinct testing surface beyond application logic: correctness now depends on orchestration behavior — scheduling, health checks, networking policy, autoscaling — that only exists once workloads are actually running in a cluster. A deployment that's functionally correct at the application layer can still fail in production due to a misconfigured liveness probe, a Service selector that matches zero pods, or an HPA threshold that never triggers.

## Tool Landscape

| Tool | Layer | Purpose |
|---|---|---|
| **Helm Test** | Application | Runs test pods defined in a chart against a deployed release |
| **`kubectl`** | Application | Scripted assertions on rollout status, pod health, endpoint counts |
| **Testkube** | Application/CI | Kubernetes-native test execution and orchestration platform — runs existing test suites (Postman, k6, Cypress, and more) as Kubernetes-native jobs with centralized results |
| **kubeval** | Manifest validation | Validates Kubernetes manifests against the Kubernetes OpenAPI schema |
| **kubeconform** | Manifest validation | Faster, actively maintained alternative to kubeval with the same schema-validation role |
| **kube-score** | Manifest validation | Static analysis of manifests for best-practice violations (missing resource limits, missing probes) |
| **Polaris** | Manifest validation | Similar best-practice/policy scanning to kube-score, with a dashboard view across a cluster |
| **kube-bench** | Security | Checks a cluster's configuration against CIS Kubernetes Benchmark |
| **LitmusChaos / Chaos Mesh** | Resilience | Kubernetes-native fault injection — pod kill, network chaos, resource stress |
| **Testcontainers** | Adjacent | Testing application code's interaction with Kubernetes-adjacent dependencies, not Kubernetes itself |
| **Prometheus** | Observability | Asserting on cluster/application metrics as part of post-deploy validation |

## When to Use

- Validating a Helm chart or manifest set before it's deployed to a shared or production cluster
- Verifying pod health, Service/Ingress reachability, and HPA behavior after a deployment
- Auditing a cluster's security posture against a recognized benchmark (CIS)
- Testing resilience to pod/node failure and network degradation within the cluster

## Recommended Stack

kubeconform + kube-score (or Polaris) as fast, PR-blocking manifest validation; `helm test` and scripted `kubectl` checks as the first line of post-deploy verification; Testkube once test execution volume across a team justifies centralized, in-cluster orchestration; kube-bench on a schedule for security posture; LitmusChaos/Chaos Mesh for resilience validation — see [Chaos & Resilience Testing](../distributed-systems-resilience-testing/chaos-resilience-testing.md).

## Summary

- 💡 Manifest validation (kubeconform, kube-score) is the cheapest, fastest Kubernetes testing investment available — it catches a meaningful class of misconfiguration before anything is ever deployed
- 🔥 A liveness/readiness probe misconfiguration is one of the most common, highest-impact Kubernetes bugs — it causes either premature restarts or traffic sent to unready pods, and it's entirely catchable with static analysis (kube-score/Polaris) before deploy
- ⚠️ Testkube's value scales with test-execution volume and team count — a single small team running a handful of tests may not need centralized in-cluster orchestration yet
- ✅ kube-bench should run on a recurring schedule, not just once at cluster setup — configuration drift and new CIS benchmark versions both erode a one-time compliance snapshot's relevance
- ⚡ Combining chaos tooling (LitmusChaos/Chaos Mesh) with observability (Prometheus) turns "did the pod get killed" into "did the system recover within its SLO," which is the actually actionable resilience signal

## Common Mistakes

**Mistake**: Deploying manifests without any schema/best-practice validation and relying solely on `kubectl apply` succeeding as proof of correctness.
**Why it fails**: `kubectl apply` succeeding means the manifest is syntactically valid, not that it follows best practices — a manifest with no resource limits or missing probes applies cleanly and causes real production issues later.

**Mistake**: Treating a one-time kube-bench scan at cluster setup as sufficient ongoing security validation.
**Why it fails**: Cluster configuration drifts over time (new workloads, RBAC changes, updated node pools) — a stale compliance snapshot provides false assurance.

## Advanced Usage

### A practical post-deploy validation flow

Chain manifest validation → rollout status check → Helm test hooks → pod health check → Service/Ingress reachability → HPA behavior under synthetic load → Prometheus metrics assertion, gating promotion on all of them passing — see the [Kubernetes validation flow diagram](../test-automation-tools-technology-landscape.md#a-practical-validation-flow-for-a-kubernetes-deployment) for the full sequence.

## Scenarios & How to Respond

**Scenario: An SRE asks why a rolling deployment reached 100% traffic despite an unhealthy pod.**
Audience & tone: SRE peer — direct, root-cause focused.
Response: "That points to a misconfigured or missing readiness probe — the rollout considered the pod healthy before it actually was. I'll add kube-score to the manifest pipeline so missing/misconfigured probes get caught before deploy, not after a bad rollout."

## See Also

- [Cloud Testing](./cloud-testing.md)
- [Chaos & Resilience Testing](../distributed-systems-resilience-testing/chaos-resilience-testing.md)
- [Observability-Driven Testing](../observability-test-governance/observability-driven-testing.md)

---

**Related Records**: Cloud Testing, Chaos & Resilience Testing, Observability-Driven Testing
