---
title: "Test Automation Design Patterns"
description: "**Page Object Model (POM)** is the standard pattern for UI test abstraction; the **Screenplay Pattern** is a more composable, actor-centric alternative worth adopting once POM's class-per-page structure starts feeling rigid at scale; the **Builder Pattern** (via a Test Data Builder) is the standard for constructing complex test data readably."
sidebar_position: 2
tags: [test-automation, sdet, tooling]
---

# Test Automation Design Patterns

**Type**: Reference
**Difficulty**: ⭐⭐⭐ (Advanced)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Test Automation Engineering & Architecture
**Created**: 2026-08-23
**Tags**: design-patterns, page-object-model, screenplay-pattern, builder-pattern

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 230" role="img" aria-labelledby="mm-patterns-title mm-patterns-desc">
<title id="mm-patterns-title">One recurring structural problem, three named patterns solving different slices of it</title>
<desc id="mm-patterns-desc">A recurring structural problem in test code is solved by three proven, reusable patterns: Page Object Model for UI element encapsulation, Test Data Builder for readable object construction, and the Screenplay Pattern for scaling past POM's class-per-page rigidity.</desc>
<defs>
  <marker id="mm-patterns-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n5" x="300" y="20" width="200" height="56" rx="10"/>
<text class="mm-node-title" x="400" y="43" text-anchor="middle">Structural Problem</text>
<text class="mm-node-sub" x="400" y="60" text-anchor="middle">recurring, not one-off</text>

<path class="mm-arrow" d="M340,76 L140,150" marker-end="url(#mm-patterns-arrow)"/>
<path class="mm-arrow" d="M400,76 L400,150" marker-end="url(#mm-patterns-arrow)"/>
<path class="mm-arrow" d="M460,76 L660,150" marker-end="url(#mm-patterns-arrow)"/>

<rect class="mm-n1" x="20" y="150" width="240" height="60" rx="10"/>
<text class="mm-node-title" x="140" y="176" text-anchor="middle">Page Object Model</text>
<text class="mm-node-sub" x="140" y="193" text-anchor="middle">encapsulate UI elements/actions</text>

<rect class="mm-n2" x="280" y="150" width="240" height="60" rx="10"/>
<text class="mm-node-title" x="400" y="176" text-anchor="middle">Test Data Builder</text>
<text class="mm-node-sub" x="400" y="193" text-anchor="middle">readable complex object construction</text>

<rect class="mm-n3" x="540" y="150" width="220" height="60" rx="10"/>
<text class="mm-node-title" x="650" y="176" text-anchor="middle">Screenplay Pattern</text>
<text class="mm-node-sub" x="650" y="193" text-anchor="middle">actor/task model — scales past POM</text>
</svg>

<p class="mental-model__caption">Design patterns are proven, reusable answers to the same recurring structural problems every test suite runs into: Page Object Model encapsulates UI elements behind business-meaningful methods, Test Data Builder makes complex test data readable under change, and the Screenplay Pattern is the deliberate upgrade once POM's class-per-page structure becomes a genuine bottleneck at scale.</p>
</div>

## Quick Reference

**Page Object Model (POM)** is the standard pattern for UI test abstraction; the **Screenplay Pattern** is a more composable, actor-centric alternative worth adopting once POM's class-per-page structure starts feeling rigid at scale; the **Builder Pattern** (via a Test Data Builder) is the standard for constructing complex test data readably.

## What is it?

Design patterns in test automation are the same idea as in application code: proven, reusable solutions to recurring structural problems. They implement the separation-of-concerns principle from [Test Automation Framework Architecture](./test-automation-framework-architecture.md) in concrete, well-understood ways rather than each team reinventing its own ad hoc abstraction.

## Core Concepts

| Pattern | Problem It Solves |
|---|---|
| **Page Object Model (POM)** | Encapsulates a UI page's elements/interactions behind one class, so tests call methods (`loginPage.login()`) instead of raw selectors |
| **Screenplay Pattern** | Models tests around actors performing tasks and asking questions, composing better than POM's class-per-page model at large scale |
| **Builder Pattern / Test Data Builder** | Constructs complex test objects readably, with sensible defaults and targeted overrides, instead of long positional constructors |
| **Factory Pattern** | Centralizes object/fixture creation logic, reused across many tests |
| **Facade Pattern** | Provides a simplified interface over a complex subsystem (e.g., a single API client facade over many endpoint-specific calls) |
| **Strategy Pattern** | Swaps interchangeable behaviors (e.g., different wait strategies, different environment configs) without changing calling code |

## When to Use

- Any UI automation effort of meaningful size — POM (or Screenplay) as a default, not an optional nicety
- Constructing test data with many optional fields and combinations — Builder pattern over positional arguments or giant fixture files
- A framework has grown complex enough that a new pattern (Screenplay over POM) would meaningfully reduce duplication or rigidity

## Recommended Stack

POM as the default starting pattern for UI automation given its ubiquity and low learning curve; Screenplay once a POM-based framework's class-per-page structure becomes a genuine bottleneck (very large suites, many cross-cutting actor behaviors); Test Data Builder for any non-trivial test data construction, regardless of layer.

## Key Takeaways

- 💡 Patterns exist to be applied where they solve a real problem, not adopted wholesale as a checklist — POM is close to universally useful for UI tests, Screenplay is a deliberate upgrade for specific scale problems
- 🔥 The Screenplay Pattern's actor/task/question model composes better than POM at scale because behaviors (not pages) become the reusable unit — a login "task" can be reused across contexts a page-object method can't cleanly express
- ⚠️ Adopting Screenplay before POM's limitations are actually being felt adds real learning-curve cost for a benefit the team doesn't need yet
- ✅ The Test Data Builder pattern's biggest payoff is readability under change — adding a new optional field to a builder doesn't require touching every existing call site, unlike a positional constructor
- ⚡ These patterns transfer across tools — POM works identically in spirit whether the underlying driver is Playwright, Selenium, or WebdriverIO

## Common Mistakes

**Mistake**: Implementing Page Objects that expose raw Selenium/Playwright locators directly to test code instead of business-meaningful methods.
**Why it fails**: It only partially achieves the abstraction's purpose — tests are still coupled to implementation detail, just one layer removed, and a UI change still ripples into test code.

**Mistake**: Adopting the Screenplay Pattern for a small, simple suite "because it's the more modern pattern."
**Why it fails**: Screenplay's composability benefit only pays for its added complexity at real scale — for a small suite, POM's simplicity is the better trade.

## Advanced Usage

### Combining patterns

A mature framework often combines several patterns at once: Page Objects (or Screenplay tasks) for UI interaction, a Builder for test data, and a Facade over a complex API surface — each solving its own specific structural problem rather than one pattern trying to do everything.

## Scenarios & How to Respond

**Scenario: A team's Page Object classes have grown to thousands of lines each, and tests are hard to write without deep framework knowledge.**
Audience & tone: Direct report/team — diagnostic, pattern-aware.
Response: "That's a sign POM's class-per-page structure has outgrown this suite's complexity — this is exactly the scenario the Screenplay Pattern is designed for. Let's pilot it on one feature area before committing to a full migration."

## See Also

- [Test Automation Framework Architecture](./test-automation-framework-architecture.md)
- [Test Data Management](../test-execution-operations/test-data-management.md)
- [Web UI & End-to-End Automation](../functional-test-automation/web-ui-end-to-end-automation.md)

---

**Related Records**: Test Automation Framework Architecture, Test Data Management, Web UI & End-to-End Automation
