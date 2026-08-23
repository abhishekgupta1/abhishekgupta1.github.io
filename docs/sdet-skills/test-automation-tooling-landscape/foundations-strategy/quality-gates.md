---
title: "Quality Gates"
description: "A quality gate is a pipeline checkpoint that blocks progression (merge, deploy, release) unless defined, measurable criteria are met — test pass rate, coverage threshold, security scan results, performance baseline — turning 'quality' from a subjective judgment call into an enforced, automatable rule."
sidebar_position: 6
tags: [test-automation, sdet, tooling]
---

# Quality Gates

**Type**: Reference
**Difficulty**: ⭐⭐ (Intermediate)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Foundations & Strategy
**Created**: 2026-08-23
**Tags**: quality-gates, ci-cd, pipeline-gating, release-criteria

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-qgates-title mm-qgates-desc">
<title id="mm-qgates-title">A gate that blocks progression unless measurable criteria are met</title>
<desc id="mm-qgates-desc">A code change reaches a quality gate; if criteria are met it proceeds to deploy, and if not it is blocked and routed back to be fixed and resubmitted.</desc>
<defs>
  <marker id="mm-qgates-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="20" y="115" width="160" height="60" rx="10"/>
<text class="mm-node-title" x="100" y="140" text-anchor="middle">Code Change</text>
<text class="mm-node-sub" x="100" y="156" text-anchor="middle">PR opened</text>

<path class="mm-arrow" d="M180,145 L260,145" marker-end="url(#mm-qgates-arrow)"/>

<rect class="mm-n5" x="260" y="115" width="180" height="60" rx="10"/>
<text class="mm-node-title" x="350" y="140" text-anchor="middle">Quality Gate</text>
<text class="mm-node-sub" x="350" y="156" text-anchor="middle">criteria met?</text>

<path class="mm-arrow" d="M440,135 L540,80" marker-end="url(#mm-qgates-arrow)"/>
<text class="mm-flow-label" x="490" y="90" text-anchor="middle">met</text>

<rect class="mm-n2" x="540" y="20" width="200" height="55" rx="10"/>
<text class="mm-node-title" x="640" y="43" text-anchor="middle">Deploy</text>
<text class="mm-node-sub" x="640" y="59" text-anchor="middle">progresses</text>

<path class="mm-arrow" d="M400,175 L400,225" marker-end="url(#mm-qgates-arrow)"/>
<text class="mm-flow-label" x="470" y="205" text-anchor="middle">not met</text>

<rect class="mm-n4" x="280" y="225" width="240" height="55" rx="10"/>
<text class="mm-node-title" x="400" y="248" text-anchor="middle">Blocked</text>
<text class="mm-node-sub" x="400" y="264" text-anchor="middle">fix required</text>

<path class="mm-arrow" d="M280,255 C160,270 90,220 95,180" marker-end="url(#mm-qgates-arrow)"/>
<text class="mm-flow-label" x="130" y="245" text-anchor="middle">fix and resubmit</text>
</svg>

<p class="mental-model__caption">A quality gate turns "should we ship this?" into an enforced rule: a change that meets defined criteria proceeds toward deploy automatically, while one that doesn't is blocked and sent back to be fixed - not merged on a human's judgment call.</p>
</div>

## Quick Reference

A quality gate is a pipeline checkpoint that blocks progression (merge, deploy, release) unless defined, measurable criteria are met — test pass rate, coverage threshold, security scan results, performance baseline — turning "quality" from a subjective judgment call into an enforced, automatable rule.

## What is it?

Without gates, passing tests are advisory — a human can merge or deploy despite red results. A quality gate makes specific criteria a hard requirement at a specific pipeline stage, removing the "should we ship this?" debate for anything the gate already covers. Gates exist at multiple stages (PR merge, pre-deploy, post-deploy) with different criteria appropriate to each.

## Core Concepts

| Gate | Typical Criteria | Stage |
|---|---|---|
| **Merge gate** | Unit/API tests pass, coverage doesn't regress, SAST/SCA clean | PR |
| **Pre-deploy gate** | Full regression suite passes, container scan clean | Post-merge, pre-release |
| **Release gate** | Performance smoke test within baseline, DAST clean | Pre-production |
| **Post-deploy gate** | Synthetic smoke tests pass, error rate/latency within baseline | Production |

## When to Use

- Defining what "done" and "safe to ship" mean objectively for a team or org
- Introducing a new test category (security, performance) and deciding whether it should block or just report
- Diagnosing why bad changes keep reaching production despite "having tests"

## Recommended Stack

Implement gates natively in CI/CD (GitLab CI/GitHub Actions required-status-checks, SonarQube quality gates for code metrics) rather than as an informal team norm — see [CI/CD Test Automation](../delivery-pipeline-infrastructure/ci-cd-automation.md).

## Key Takeaways

- 💡 A gate is only as strong as its enforcement — a "gate" a human can override at will is a suggestion, not a gate
- 🔥 Not every check needs to be a blocking gate — some belong as visible, non-blocking reports (informational) until the team trusts the signal enough to block on it
- ⚠️ Too many blocking gates on the PR path recreates the "slow pipeline nobody trusts" problem — reserve blocking gates for genuinely release-critical criteria
- ✅ Gate criteria should be specific and measurable ("p99 latency within 10% of baseline"), not vague ("performance looks okay")
- ⚡ Quality gates are where the testing pyramid becomes organizationally enforced, not just architecturally intended

## Common Mistakes

**Mistake**: Making every new test category a hard blocking gate from day one.
**Why it fails**: A newly introduced check (e.g., a fresh accessibility scan) often has a backlog of pre-existing failures — blocking immediately halts all work until the backlog is cleared, which teams route around rather than fix.

**Mistake**: Allowing routine manual overrides of a gate "just this once."
**Why it fails**: Every override erodes the gate's credibility; a gate that's regularly bypassed stops being treated as a real requirement by the team.

## Advanced Usage

### Phased gate rollout

Introduce a new check as report-only, let the team burn down the existing failures, then flip it to blocking once the pass rate is near 100% — this avoids the "immediately blocks everyone" failure mode above while still reaching enforced quality over time.

## Scenarios & How to Respond

**Scenario: A team lead wants to bypass a failing security gate to hit a release deadline.**
Audience & tone: Peer/leadership — firm, but collaborative on the alternative.
Response: "I can't recommend bypassing it — that gate exists because of a real risk class. Let's scope what's actually failing: if it's a false positive we can suppress it with justification, and if it's real, let's assess whether it's release-blocking severity or can ship behind a tracked follow-up."

## See Also

- [Continuous Testing](./continuous-testing.md)
- [CI/CD Test Automation](../delivery-pipeline-infrastructure/ci-cd-automation.md)
- [Flaky Test Management](../test-execution-operations/flaky-test-management.md)

---

**Related Records**: Continuous Testing, CI/CD Test Automation, Flaky Test Management
