---
title: "Security Testing"
description: "Security testing splits into distinct categories that get conflated as one thing: **SAST** (Semgrep, SonarQube — scan source code for vulnerable patterns), **dependency scanning** (Snyk, OWASP Dependency-Check, Trivy — find known CVEs in third-party packages/images), and **DAST** (OWASP ZAP, Burp Suite — attack a running app like an external actor would)."
sidebar_position: 7
tags: [test-automation, sdet, tooling]
---

# Security Testing

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Quality & Non-Functional Testing
**Created**: 2026-08-23
**Tags**: security-testing, dast, sast, dependency-scanning, owasp

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 230" role="img" aria-labelledby="mm-sectest-title mm-sectest-desc">
<title id="mm-sectest-title">Three distinct scan layers combine into a real security posture</title>
<desc id="mm-sectest-desc">SAST, dependency scanning, and DAST each catch a different class of vulnerability. None substitutes for the others, so a real security posture requires all three layers feeding into it together.</desc>
<defs>
  <marker id="mm-sectest-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="20" y="20" width="220" height="60" rx="10"/>
<text class="mm-node-title" x="130" y="45" text-anchor="middle">SAST</text>
<text class="mm-node-sub" x="130" y="62" text-anchor="middle">Semgrep, SonarQube — code patterns</text>

<rect class="mm-n2" x="280" y="20" width="220" height="60" rx="10"/>
<text class="mm-node-title" x="390" y="45" text-anchor="middle">Dependency Scanning</text>
<text class="mm-node-sub" x="390" y="62" text-anchor="middle">Snyk, Trivy — known CVEs</text>

<rect class="mm-n4" x="540" y="20" width="220" height="60" rx="10"/>
<text class="mm-node-title" x="650" y="45" text-anchor="middle">DAST</text>
<text class="mm-node-sub" x="650" y="62" text-anchor="middle">ZAP, Burp — attacks running app</text>

<path class="mm-arrow" d="M150,80 L340,150" marker-end="url(#mm-sectest-arrow)"/>
<path class="mm-arrow" d="M390,80 L390,150" marker-end="url(#mm-sectest-arrow)"/>
<path class="mm-arrow" d="M630,80 L440,150" marker-end="url(#mm-sectest-arrow)"/>

<rect class="mm-n5" x="250" y="150" width="280" height="60" rx="10"/>
<text class="mm-node-title" x="390" y="175" text-anchor="middle">Real Security Posture</text>
<text class="mm-node-sub" x="390" y="192" text-anchor="middle">none of the three substitutes for another</text>
</svg>

<p class="mental-model__caption">Security testing isn't one tool — SAST, dependency scanning, and DAST each catch a genuinely different class of vulnerability, and a team running only one of the three has a real, specific blind spot, not just "less coverage."</p>
</div>

## Quick Reference

Security testing splits into distinct categories that get conflated as one thing: **SAST** (Semgrep, SonarQube — scan source code for vulnerable patterns), **dependency scanning** (Snyk, OWASP Dependency-Check, Trivy — find known CVEs in third-party packages/images), and **DAST** (OWASP ZAP, Burp Suite — attack a running app like an external actor would). A real security posture needs at least one tool from each category — they catch different things and none substitutes for the others.

## What is it?

Security testing automates the search for exploitable weaknesses — insecure code patterns, vulnerable dependencies, and runtime vulnerabilities (injection, auth bypass, XSS) — before an attacker finds them instead. Unlike most testing categories on this list, false negatives here are asymmetric: a missed functional bug is annoying, a missed security vulnerability can be a breach, which is why layering multiple scan types (rather than picking one "best" tool) is the norm rather than overkill.

## Tool Landscape

| Tool | Purpose |
|---|---|
| **OWASP ZAP** | Web/API security (DAST), free and CI-integrable |
| **Burp Suite** | Web security testing (DAST), industry-standard for manual/pentest-driven work |
| **Nuclei** | Fast, template-based vulnerability scanning against known CVEs/misconfigurations |
| **Nikto** | Web server misconfiguration and outdated-software scanning |
| **Trivy** | Container image, filesystem, and IaC misconfiguration scanning |
| **Snyk** | Dependency (SCA) and code security, strong IDE/CI integration |
| **Semgrep** | Fast, rule-based SAST with a large open ruleset |
| **SonarQube** | Code quality + security rule checks, CI quality-gate integration |
| **OWASP Dependency-Check** | Free SCA cross-referencing dependencies against the NVD |
| **Checkmarx** (commercial) | Enterprise SAST/SCA platform with broad language coverage and compliance reporting |
| **Veracode** (commercial) | Enterprise application security platform (SAST/DAST/SCA) common in regulated industries |
| **Grype** | Fast, open-source container/filesystem vulnerability scanner, often paired with Syft for SBOM generation |
| **Dependabot** (GitHub-native) | Automated dependency-update PRs when a known vulnerability is detected, complementing rather than replacing a dedicated SCA scan |

## When to Use

- Gating a CI/CD pipeline against known-vulnerable dependencies before deploy (Snyk/Trivy/Dependency-Check)
- Running static analysis on every PR to catch insecure patterns (hardcoded secrets, SQL injection risk, unsafe deserialization) at review time
- Periodic or pre-release DAST scans (ZAP/Burp) against a running staging environment to catch runtime vulnerabilities SAST can't see
- Scanning container images for known CVEs before they're pushed to a registry (Trivy)

## Recommended Stack

Wire dependency and container scanning (Snyk or Trivy) directly into CI/CD as a hard gate — this is the highest-value, lowest-effort layer, since most real-world breaches trace back to a known, already-patched CVE in a dependency nobody updated. Add Semgrep for SAST on every PR (fast, low false-positive rate compared to older-generation SAST tools). Reserve OWASP ZAP for scheduled DAST runs against staging rather than every PR — it's slower and needs a running environment, so it fits a nightly or pre-release cadence better than a per-commit gate.

## Key Takeaways

- 💡 SAST, dependency scanning, and DAST catch different vulnerability classes — a team running only one has a real, specific blind spot, not just "less coverage"
- 🔥 Most real-world breaches involve a known, already-disclosed CVE in an unpatched dependency, not a novel zero-day — dependency scanning with an actual patch/upgrade process is disproportionately high-leverage for the effort
- ⚠️ A security scanner generating hundreds of low-severity findings that nobody triages is worse than no scanner — it trains the team to ignore the tool, which means the one critical finding buried in the noise gets missed too
- ✅ Fail CI on critical/high severity findings only at first, and expand the gate as the team builds triage capacity — gating on every finding from day one usually gets the check disabled under deadline pressure instead of actually fixing anything
- ⚡ Trivy scans both dependencies and container images in one tool — if you're already containerized, it covers more ground per tool adopted than a dependency-only scanner

## Common Mistakes

**Mistake**: Running a DAST scan once before a major release and treating it as the security testing strategy.
**Why it fails**: Vulnerabilities get introduced continuously as code changes — a scan run once a quarter leaves a window where a real vulnerability sits in production undetected for weeks or months; security scanning needs the same continuous-CI treatment as functional tests.

**Mistake**: Enabling every available scanner at maximum severity threshold on day one.
**Why it fails**: The resulting flood of findings (many low-severity or false-positive) overwhelms triage capacity, and the realistic outcome is the whole gate gets disabled rather than the backlog actually getting worked through — a scoped, high-severity-only start that expands over time survives contact with a real team's bandwidth.

## Advanced Usage

### Shifting DAST left with authenticated, targeted scans

Rather than an unauthenticated crawl of an entire staging app, configure ZAP with authenticated sessions and target specific high-risk flows (auth, payment, admin) — this finds more real vulnerabilities per scan minute than a broad unauthenticated crawl, which mostly rediscovers the same public-facing surface repeatedly.

### Secrets scanning as a pre-commit gate

Layer a dedicated secrets scanner (many SAST tools, including Semgrep, support this) as a pre-commit or pre-push hook, not just a CI-time check — catching a leaked credential before it's pushed avoids the far more expensive remediation of a secret that's already in git history and needs rotation.

## Scenarios & How to Respond

**Scenario: A direct report wants to disable the CI security gate because it's blocking a release over a low-severity finding.**
Audience & tone: Direct report — coaching toward triage rather than a blanket bypass, per [Adapting Communication Tone by Audience](../../../mba-skills/team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md).
Response: "Don't disable the gate — let's check if this specific finding qualifies for a scoped, documented exception instead. If it's genuinely low-risk and low-priority, we suppress that one finding with a reason on record, not turn off the check for everything."

**Scenario: Upper management asks why security scanning is slowing down the release cadence.**
Audience & tone: Upper management — concise, risk-framed, not defensive.
Response: "It's catching real, known-exploitable issues before they ship — the alternative isn't 'faster releases,' it's the same issues reaching production and costing far more to remediate after a breach or disclosure. We're tuning the gate to only block on high-severity findings to keep the friction proportional."

## See Also

- [CI/CD Automation](../delivery-pipeline-infrastructure/ci-cd-automation.md)
- [Cloud Testing](../delivery-pipeline-infrastructure/cloud-testing.md)
- [Infrastructure Testing](../delivery-pipeline-infrastructure/infrastructure-testing.md)
- [API Automation](../functional-test-automation/api-automation.md)
- [Adapting Communication Tone by Audience](../../../mba-skills/team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: CI/CD Automation, Cloud & Infrastructure Testing, API & Backend Test Automation
