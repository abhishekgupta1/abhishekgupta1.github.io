---
title: "Infrastructure Testing"
description: "Infrastructure testing is the umbrella discipline of verifying that provisioned infrastructure — however it was created — actually matches its intended, secure, compliant configuration."
sidebar_position: 2
tags: [test-automation, sdet, tooling]
---

# Infrastructure Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Delivery Pipeline & Infrastructure
**Created**: 2026-08-23
**Tags**: infrastructure-testing, inspec, compliance, drift-detection

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-infra-title mm-infra-desc">
<title id="mm-infra-title">Infrastructure testing as catching drift between declared config and deployed reality</title>
<desc id="mm-infra-desc">A scheduled, deploy-independent compliance scan compares declared IaC configuration against the actual deployed reality, flagging drift caused by manual out-of-band changes.</desc>
<defs>
  <marker id="mm-infra-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="40" y="20" width="280" height="60" rx="10"/>
<text class="mm-node-title" x="180" y="46" text-anchor="middle">Declared Config</text>
<text class="mm-node-sub" x="180" y="63" text-anchor="middle">IaC in Git — source of truth</text>

<rect class="mm-n3" x="460" y="20" width="280" height="60" rx="10"/>
<text class="mm-node-title" x="600" y="46" text-anchor="middle">Deployed Reality</text>
<text class="mm-node-sub" x="600" y="63" text-anchor="middle">actual running resources</text>

<text class="mm-flow-label" x="400" y="55" text-anchor="middle">drift?</text>

<path class="mm-arrow" d="M250,80 L340,150" marker-end="url(#mm-infra-arrow)"/>
<path class="mm-arrow" d="M550,80 L440,150" marker-end="url(#mm-infra-arrow)"/>

<rect class="mm-n2" x="250" y="150" width="280" height="60" rx="10"/>
<text class="mm-node-title" x="390" y="176" text-anchor="middle">Compliance Scan</text>
<text class="mm-node-sub" x="390" y="193" text-anchor="middle">InSpec — scheduled, deploy-independent</text>

<path class="mm-arrow" d="M390,210 L390,240" marker-end="url(#mm-infra-arrow)"/>

<rect class="mm-n4" x="250" y="240" width="280" height="50" rx="10"/>
<text class="mm-node-title" x="390" y="263" text-anchor="middle">Gap Found</text>
<text class="mm-node-sub" x="390" y="280" text-anchor="middle">flag before it becomes an incident</text>
</svg>

<p class="mental-model__caption">Declared IaC configuration and the infrastructure's deployed reality can silently diverge — a manual console change or out-of-band hotfix drifts the running state away from what's in Git — so a scheduled, deploy-independent compliance scan checks the actual state directly and flags the gap before it causes a surprising diff or a real security incident.</p>
</div>

## Quick Reference

Infrastructure testing is the umbrella discipline of verifying that provisioned infrastructure — however it was created — actually matches its intended, secure, compliant configuration. [Infrastructure as Code Testing](./infrastructure-as-code-iac-testing.md) covers testing the *code that defines* infrastructure; this record covers verifying the *deployed reality*, including drift from manual changes IaC alone can't catch.

## What is it?

Infrastructure can drift from its declared state — a manual console change, an emergency hotfix applied out-of-band, a resource created outside the IaC pipeline entirely. Infrastructure testing verifies the actual running state of cloud resources, servers, and networking against a compliance baseline, independent of whether that state currently matches source-controlled IaC.

## Tool Landscape

| Tool | Role |
|---|---|
| **InSpec** | Compliance-as-code — tests the actual state of a running system against defined profiles (CIS benchmarks, custom org policy) |
| **Kitchen-Terraform** | Test Kitchen integration for verifying Terraform-provisioned infrastructure with InSpec profiles in a full provision/verify/destroy cycle |
| **AWS Config / Azure Policy** | Cloud-native continuous compliance monitoring, complementary to a dedicated testing tool |
| **Terratest** | Also usable here for asserting on real deployed resource state (see [IaC Testing](./infrastructure-as-code-iac-testing.md)) |

## When to Use

- Verifying a deployed environment matches its declared configuration (drift detection)
- Running scheduled compliance audits against production infrastructure independent of any deploy event
- Validating a server/VM's actual configuration (patch level, open ports, running services) against a security baseline

## Recommended Stack

InSpec run on a schedule against production (not just at deploy time) to catch drift from manual changes; Kitchen-Terraform where a full provision-verify-destroy cycle is needed to validate both the IaC and the resulting real infrastructure together.

## Key Takeaways

- 💡 IaC testing verifies the *code*; infrastructure testing verifies the *deployed reality* — a system can pass every IaC test and still drift out of compliance later via a manual change
- 🔥 Scheduled, deploy-independent compliance scans are what catch "someone clicked a change in the console" before it causes a surprising `apply` diff or a real security gap
- ⚠️ InSpec profiles need to be kept current with actual compliance requirements — a stale profile provides false assurance just as much as no profile at all
- ✅ Treat infrastructure test failures (drift, compliance violations) with the same urgency as a failing application test — infrastructure drift is a common, under-monitored source of production incidents
- ⚡ Cloud-native tools (AWS Config, Azure Policy) provide continuous, real-time compliance monitoring that complements rather than replaces a dedicated, versioned test suite

## Common Mistakes

**Mistake**: Assuming IaC testing alone guarantees ongoing compliance.
**Why it fails**: IaC tests verify the code at the moment it's tested — they say nothing about a manual change made to the live environment an hour after deploy.

**Mistake**: Running compliance scans only during incident response, not as a standing practice.
**Why it fails**: Drift accumulates silently between scans — by the time an incident triggers a scan, the compliance gap may have existed for months.

## Advanced Usage

### Drift detection as a scheduled check

Run a scheduled `terraform plan` (showing unexpected diffs against real state) or an InSpec compliance scan against production on a cadence, independent of any deploy, to catch out-of-band changes before they cause a surprising `apply` diff or an undetected compliance gap later.

## Scenarios & How to Respond

**Scenario: A security audit finds production infrastructure doesn't match the documented IaC.**
Audience & tone: Stakeholder/compliance — own it plainly, pair the explanation with the fix.
Response: "That's drift from a manual change outside our IaC pipeline — we're adding a scheduled InSpec compliance scan so this class of drift is caught within hours instead of at the next audit."

## See Also

- [Infrastructure as Code (IaC) Testing](./infrastructure-as-code-iac-testing.md)
- [Cloud Testing](./cloud-testing.md)
- [Kubernetes Testing](./kubernetes-testing.md)

---

**Related Records**: Infrastructure as Code (IaC) Testing, Cloud Testing, Kubernetes Testing
