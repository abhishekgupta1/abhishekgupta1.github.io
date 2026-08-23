---
title: "Infrastructure as Code (IaC) Testing"
description: "Static analysis (**Checkov**, **TFLint**, **tfsec**) catches misconfigurations and policy violations *before* `apply` — cheap, fast, no real infrastructure involved."
sidebar_position: 3
tags: [test-automation, sdet, tooling]
---

# Infrastructure as Code (IaC) Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Delivery Pipeline & Infrastructure
**Created**: 2026-08-23
**Tags**: terraform, iac, terratest, checkov, tflint, tfsec

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 150" role="img" aria-labelledby="mm-iac-title mm-iac-desc">
<title id="mm-iac-title">IaC testing as a pipeline from static check to real apply to teardown</title>
<desc id="mm-iac-desc">Terraform code first passes cheap static analysis catching known-bad patterns, then a real apply against a throwaway environment via Terratest catches what static analysis can't, then resources are always destroyed.</desc>
<defs>
  <marker id="mm-iac-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<text class="mm-flow-label" x="290" y="40" text-anchor="middle">cheap, fast, catches known-bad patterns</text>
<text class="mm-flow-label" x="525" y="40" text-anchor="middle">catches what static analysis can't</text>

<rect class="mm-n1" x="10" y="70" width="140" height="56" rx="10"/>
<text class="mm-node-title" x="80" y="93" text-anchor="middle">Terraform Code</text>
<text class="mm-node-sub" x="80" y="110" text-anchor="middle">module under test</text>

<path class="mm-arrow" d="M150,98 L190,98" marker-end="url(#mm-iac-arrow)"/>

<rect class="mm-n3" x="190" y="70" width="200" height="56" rx="10"/>
<text class="mm-node-title" x="290" y="93" text-anchor="middle">Static Analysis</text>
<text class="mm-node-sub" x="290" y="110" text-anchor="middle">Checkov, TFLint, tfsec — no real infra</text>

<path class="mm-arrow" d="M390,98 L430,98" marker-end="url(#mm-iac-arrow)"/>

<rect class="mm-n4" x="430" y="70" width="190" height="56" rx="10"/>
<text class="mm-node-title" x="525" y="93" text-anchor="middle">Real Apply</text>
<text class="mm-node-sub" x="525" y="110" text-anchor="middle">Terratest — throwaway environment</text>

<path class="mm-arrow" d="M620,98 L660,98" marker-end="url(#mm-iac-arrow)"/>

<rect class="mm-n5" x="660" y="70" width="110" height="56" rx="10"/>
<text class="mm-node-title" x="715" y="93" text-anchor="middle">Destroy</text>
<text class="mm-node-sub" x="715" y="110" text-anchor="middle">always</text>
</svg>

<p class="mental-model__caption">IaC code first passes cheap, fast static analysis that catches known-bad patterns before anything real exists, then the modules that matter get a real apply against a throwaway environment to catch what static analysis structurally can't — and every provisioned resource is torn down afterward, even on failure.</p>
</div>

## Quick Reference

Static analysis (**Checkov**, **TFLint**, **tfsec**) catches misconfigurations and policy violations *before* `apply` — cheap, fast, no real infrastructure involved. **Terratest** goes further: it runs a real `terraform apply` against a throwaway environment and asserts on the actual deployed resources, catching the class of bug static analysis can't. Use both — they're complementary, not competing.

## What is it?

IaC testing validates infrastructure-as-code (Terraform, CloudFormation, CDK) the same way application testing validates application code: catching mistakes before they reach a real, possibly production, environment. This spans a spectrum from static linting and policy-as-code (fast, no real resources) to full integration tests that provision, verify, and tear down real cloud resources.

## Tool Landscape

| Tool | Purpose |
|---|---|
| **Terraform** | Infrastructure automation (the subject under test) |
| **Terratest** | Real-apply integration testing — provisions, asserts on, and destroys real resources |
| **Checkov** | Static security/compliance scanning across Terraform, CloudFormation, Kubernetes manifests |
| **TFLint** | Terraform-specific linting for provider best practices and possible errors |
| **tfsec** | Static security scanning purpose-built for Terraform, similar role to Checkov with a narrower, Terraform-specific focus |
| **Kitchen-Terraform** | Full provision/verify/destroy cycle combining Test Kitchen with InSpec verification |
| **LocalStack** | AWS simulation for fast, no-cost local iteration on IaC modules |
| **AWS CDK assertions** | Native assertion library for testing CDK-defined infrastructure without a full deploy |

## When to Use

- Validating a Terraform module before it's used by other teams, as you would test a shared library
- Checking IaC changes for security misconfigurations (public S3 buckets, overly permissive IAM) before merge
- Testing infrastructure changes against a throwaway environment before they touch staging or production

## Recommended Stack

**TFLint + Checkov (or tfsec)** as a fast, PR-blocking static gate; **Terratest** for the modules that matter most — shared/reusable modules, anything provisioning security-sensitive resources — run against a real throwaway environment; **LocalStack** where a full `apply` against real cloud infrastructure is too slow or costly for the feedback loop needed.

## Key Takeaways

- 💡 Static analysis and real-apply testing catch different bug classes — Checkov/TFLint/tfsec catch known-bad patterns, Terratest catches "the plan looked fine but the actual deployed resource doesn't behave as expected"
- 🔥 Testing a shared/reusable Terraform module with the same rigor as a shared code library is non-negotiable once more than one team consumes it
- ⚠️ Terratest tests provision real cloud resources and cost real money and time — reserve them for the modules with the highest blast radius rather than running full-apply tests on every trivial IaC change
- ✅ Always tear down Terratest-provisioned resources in a deferred cleanup step, even on test failure — orphaned test infrastructure is a silent, recurring cost leak
- ⚡ Policy-as-code (Checkov custom policies, Sentinel, OPA) turns tribal infrastructure-security knowledge into an automated, PR-blocking gate

## Common Mistakes

**Mistake**: Relying only on static linting and treating that as sufficient IaC testing.
**Why it fails**: Static tools catch known-bad patterns but can't verify a module actually provisions working, correctly-connected resources — a module can pass every static check and still deploy a security group that doesn't allow the traffic it needs.

**Mistake**: Not cleaning up resources provisioned by a failed Terratest run.
**Why it fails**: A failed test run that leaves real cloud resources behind is a direct, compounding cost that silently inflates a cloud bill.

## Advanced Usage

### Connecting IaC testing to FinOps

Terratest-provisioned test resources should be tagged and tracked the same way production resources are — untagged test infrastructure is exactly the kind of "invisible spend" that's hardest to attribute and easiest to leave running by accident.

## Scenarios & How to Respond

**Scenario: A direct report pushes back on adding Terratest coverage, saying "the plan already looks right."**
Audience & tone: Direct report — coaching, use a concrete example rather than an abstract argument.
Response: "A clean plan tells us Terraform will do what we told it to — it doesn't tell us the result actually works the way we intended. Let's add one Terratest check for the riskiest part of this module and see what it catches."

## See Also

- [Infrastructure Testing](./infrastructure-testing.md)
- [Cloud Testing](./cloud-testing.md)
- [CI/CD Test Automation](./ci-cd-automation.md)

---

**Related Records**: Infrastructure Testing, Cloud Testing, CI/CD Test Automation
