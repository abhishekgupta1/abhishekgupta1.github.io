---
title: "Test Automation Tooling Landscape Cheat Sheet"
description: "Quick reference for the modern test automation tooling landscape — pyramid layers, tool-by-tool comparisons, and decision heuristics."
tags: [test-automation, sdet, tooling, cheat-sheet]
hide_table_of_contents: true
---

# Test automation tooling landscape cheatsheet

A one-page reference to the modern tooling landscape. For the full
tool-by-tool breakdown across every layer, see the
[complete guide](/docs/sdet-skills/test-automation-tooling-landscape/test-automation-tools-technology-landscape).

<a class="topic-crosslink" href="/docs/sdet-skills/test-automation-tooling-landscape/test-automation-tools-technology-landscape">📖 Full guide: Tooling Landscape →</a>

<div class="cheat-sheet cheat-sheet--sdet">

<div class="cheat-card">

#### The modern pyramid

```
        E2E / UI  (few, slow, high confidence)
      Integration / Contract
   Component            API
Unit  (many, fast, cheap)
```

The expanded pyramid adds contract, API, and observability-driven layers
between unit and full E2E — not just "more UI tests."

</div>

<div class="cheat-card">

#### Web UI / E2E — pick one

| Tool | Best for |
|---|---|
| Playwright | modern, multi-browser, fastest-growing |
| Selenium | broadest ecosystem, legacy support |
| Cypress | JS-only, great DX, single-tab limits |
| WebdriverIO | flexible, plugin-heavy |

</div>

<div class="cheat-card">

#### Mobile

| Tool | Best for |
|---|---|
| Appium | cross-platform, mature |
| Maestro | fast, YAML-based, simpler setup |
| Native (Espresso/XCUITest) | fastest, platform-locked |

</div>

<div class="cheat-card">

#### API & backend

- REST: Rest Assured (Java), Postman/Newman, `requests` (Python).
- Contract testing: Pact — catches breaking changes between services before deploy.
- Testcontainers — spin up real dependencies (DB, queue) in Docker for integration tests instead of mocking everything.

</div>

<div class="cheat-card">

#### Unit testing by language

| Language | Frameworks |
|---|---|
| JS/TS | Jest, Vitest |
| Python | pytest |
| Java | JUnit 5, TestNG |
| .NET | xUnit, NUnit |

</div>

<div class="cheat-card">

#### Performance

| Tool | Best for |
|---|---|
| k6 | code-first, CI-native, modern |
| JMeter | GUI + mature ecosystem, steeper CI setup |
| Gatling | Scala DSL, detailed reports |
| Locust | Python, simple distributed load |

</div>

<div class="cheat-card">

#### Visual & accessibility

- Visual regression: Percy, Chromatic, Playwright's `toHaveScreenshot`.
- Accessibility: axe-core (integrates directly with Playwright/Selenium), Lighthouse for audits.

</div>

<div class="cheat-card">

#### Security testing categories

- SAST — scans source code for known vulnerability patterns.
- DAST — attacks a running app (OWASP ZAP, Burp).
- SCA — scans dependencies for known CVEs (Snyk, Dependabot).
- Map coverage to the OWASP Top 10, not just "run a scanner."

</div>

<div class="cheat-card">

#### Chaos & resilience

Tools: Chaos Monkey, Gremlin, Litmus (Kubernetes-native). Inject failure
(latency, pod kills, network partition) deliberately to verify the system
degrades gracefully instead of cascading.

</div>

<div class="cheat-card">

#### Choosing a stack: heuristics

- Match tooling to team language — Java shop → Java-first tools (Rest Assured, Selenium, TestNG).
- Prefer code-first tools once the team outgrows GUI-driven ones (JMeter → k6, Postman → Rest Assured).
- New service → build the contract/API layer before UI E2E; it's cheaper to maintain and catches more bugs per test.

</div>

</div>
