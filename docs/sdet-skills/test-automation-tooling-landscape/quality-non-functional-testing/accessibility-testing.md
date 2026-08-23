---
title: "Accessibility Testing"
description: "**axe-core** is the tool to standardize on — it's the underlying engine behind most other accessibility tools on this list (including Lighthouse's a11y audit), it's free, and it integrates directly into a Playwright/Selenium suite so accessibility checks run as part of the normal test cycle instead of a separate audit pass."
sidebar_position: 6
tags: [test-automation, sdet, tooling]
---

# Accessibility Testing

**Type**: Reference
**Difficulty**: ⭐⭐ (Intermediate)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Quality & Non-Functional Testing
**Created**: 2026-08-23
**Tags**: accessibility, a11y, wcag, axe-core, compliance

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 220" role="img" aria-labelledby="mm-a11y-title mm-a11y-desc">
<title id="mm-a11y-title">WCAG conformance splits into what automation catches and what still needs a human</title>
<desc id="mm-a11y-desc">WCAG success criteria fork into automatable checks like axe-core covers (contrast, missing labels, ARIA misuse) and checks that structurally require manual or assistive-technology testing (reading order, keyboard traps, focus management).</desc>
<defs>
  <marker id="mm-a11y-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n3" x="300" y="15" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="390" y="38" text-anchor="middle">WCAG Success Criteria</text>
<text class="mm-node-sub" x="390" y="54" text-anchor="middle">what "accessible" means</text>

<path class="mm-arrow" d="M350,70 L190,120" marker-end="url(#mm-a11y-arrow)"/>
<path class="mm-arrow" d="M430,70 L590,120" marker-end="url(#mm-a11y-arrow)"/>

<rect class="mm-n1" x="50" y="120" width="280" height="65" rx="10"/>
<text class="mm-node-title" x="190" y="145" text-anchor="middle">Automated (axe-core)</text>
<text class="mm-node-sub" x="190" y="162" text-anchor="middle">contrast, labels, ARIA — ~⅓–½ of criteria</text>

<rect class="mm-n4" x="450" y="120" width="280" height="65" rx="10"/>
<text class="mm-node-title" x="590" y="145" text-anchor="middle">Manual + Assistive Tech</text>
<text class="mm-node-sub" x="590" y="162" text-anchor="middle">reading order, keyboard traps, focus</text>

<text class="mm-flow-label" x="390" y="207" text-anchor="middle">both are required for real sign-off — neither alone is enough</text>
</svg>

<p class="mental-model__caption">WCAG conformance splits in two: automated scanners like axe-core reliably catch a meaningful slice of violations (contrast, missing labels, bad ARIA), but structurally can't judge whether a screen reader's reading order makes sense or a widget traps keyboard focus — that half still needs a human with assistive technology.</p>
</div>

## Quick Reference

**axe-core** is the tool to standardize on — it's the underlying engine behind most other accessibility tools on this list (including Lighthouse's a11y audit), it's free, and it integrates directly into a Playwright/Selenium suite so accessibility checks run as part of the normal test cycle instead of a separate audit pass.

## Tool Landscape

| Tool | Purpose |
|---|---|
| **axe-core** | Accessibility automation, the underlying engine for most tools below |
| **Deque axe DevTools** | Browser extension + CI-integrable product built on axe-core |
| **Pa11y** | CLI-based automated accessibility audits, CI-friendly |
| **Lighthouse** | Accessibility + performance, axe-core-based audit built into Chrome DevTools |
| **WAVE** | Visual, in-page annotation for manual/exploratory review |
| **Accessibility Insights** | Microsoft tool combining automated checks with guided manual workflows (tab-order, screen reader spot checks) |
| **IBM Equal Access** | Accessibility Checker browser extension and toolkit, IBM Equal Access ruleset as an axe-core alternative/complement |

## What is it?

Accessibility testing checks whether an interface can actually be used by people relying on assistive technology — screen readers, keyboard-only navigation, sufficient color contrast — against the WCAG standard. Automated tools like axe-core reliably catch a meaningful subset of WCAG violations (missing alt text, insufficient contrast, missing form labels, bad ARIA usage) but structurally can't catch everything: whether a screen reader's reading order actually makes sense, or whether a keyboard trap exists in a complex widget, needs manual or assistive-technology-driven testing.

## When to Use

- Gating CI on baseline WCAG violations (contrast, missing labels, ARIA misuse) before merge
- Auditing an existing product for compliance risk (many industries have legal accessibility obligations)
- Validating a new component against accessibility requirements before it ships into a shared design system
- Combined with manual keyboard-navigation and screen-reader testing for any critical user flow — automation alone is not sufficient sign-off

## Recommended Stack

Integrate **axe-core directly into the existing Playwright E2E suite** (via `@axe-core/playwright`) so accessibility assertions run on every page the suite already visits, at effectively zero extra infrastructure cost. Use **Lighthouse** in CI as a lightweight secondary signal (it also covers performance and SEO in the same run) and reserve a **manual pass with actual assistive technology** (VoiceOver, NVDA, keyboard-only) for critical flows before major releases — automated coverage catches roughly a third to half of WCAG success criteria; the rest genuinely requires a human.

## Summary

- 💡 axe-core powers a large share of the accessibility tooling ecosystem (Lighthouse's a11y audit uses it under the hood) — learning it once transfers directly to understanding most other tools' output
- 🔥 Integrating axe checks into an existing Playwright/Selenium suite costs almost nothing incrementally — the browser session and page navigation are already happening; you're just adding an assertion
- ⚠️ Passing 100% of automated axe checks is not the same as being accessible — automated tools structurally cannot evaluate reading order, focus management in complex widgets, or whether alt text is actually meaningful (vs. present)
- ✅ Treat accessibility violations with the same CI-gating seriousness as functional test failures, not as a separate lower-priority audit — accessibility debt compounds the same way technical debt does
- ⚡ Fix accessibility issues at the design-system/component level rather than per-page — a missing-label bug in a shared form component multiplies across every page that uses it, so the fix belongs at the source

## Common Mistakes

**Mistake**: Treating a clean automated axe-core scan as full accessibility sign-off.
**Why it fails**: Automated scanning covers a meaningful but partial slice of WCAG — a page can pass every automated check while still being unusable with a screen reader due to a confusing reading order or a keyboard trap in a custom widget, neither of which automated tools reliably detect.

**Mistake**: Running accessibility scans only as a pre-launch audit rather than continuously in CI.
**Why it fails**: Violations accumulate silently as new components and pages ship — a periodic audit finds a large backlog all at once (expensive and demoralizing to fix), where continuous CI gating catches each violation at the PR that introduced it, when it's cheapest to fix.

## Advanced Usage

### Scoping axe rules to avoid noise on known exceptions

axe-core supports rule-level and element-level exclusions — use this deliberately for genuine exceptions (a third-party embed you don't control) rather than broadly disabling rules to make a scan pass, which just hides real violations instead of fixing them.

### Pairing automated scans with a manual severity triage

Not every automated violation carries equal user impact — a missing `alt` on a decorative image is lower severity than a form input with no accessible label blocking a screen-reader user from submitting a form. Triage automated findings by real user impact rather than treating every axe rule violation as equally urgent.

## Scenarios & How to Respond

**Scenario: A direct report says accessibility testing can wait until after launch since it's not a functional bug.**
Audience & tone: Direct report — supportive but firm on reframing the risk, per [Adapting Communication Tone by Audience](../../../mba-skills/team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md).
Response: "It costs almost nothing to add axe checks to the suite we already have — and fixing this after launch means fixing it across every page it's shipped to instead of at the one component now. Let's add the check this sprint rather than carry the debt forward."

**Scenario: Upper management asks what the accessibility exposure is before a compliance review.**
Audience & tone: Upper management — concise, risk-quantified.
Response: "Our automated coverage catches roughly a third to half of WCAG criteria today with zero open critical violations — the remaining gap is manual assistive-technology testing on our top flows, which I'd recommend completing before the review rather than relying on automated coverage alone."

## See Also

- [Web UI & End-to-End Automation](../functional-test-automation/web-ui-end-to-end-automation.md)
- [Visual & UI Regression Testing](./visual-ui-regression-testing.md)
- [Test Management Tools](../observability-test-governance/test-management-tools.md)
- [Test Reporting & Analytics](../observability-test-governance/test-reporting-analytics.md)
- [Adapting Communication Tone by Audience](../../../mba-skills/team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Web UI & End-to-End Automation, Visual & UI Regression Testing, Test Management & Reporting
