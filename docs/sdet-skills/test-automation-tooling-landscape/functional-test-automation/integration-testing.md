---
title: "Integration Testing"
description: "Integration testing verifies that multiple real collaborating parts — a service and its real database, two services communicating — work together correctly, using **Testcontainers** for disposable real infrastructure wherever the alternative would be mocking away the exact behavior you need to verify."
sidebar_position: 6
tags: [test-automation, sdet, tooling]
---

# Integration Testing

**Type**: Reference
**Difficulty**: ⭐⭐ (Intermediate)
**Domain**: Test Automation Tooling Landscape
**Concept Group**: Functional Test Automation
**Created**: 2026-08-23
**Tags**: integration-testing, testcontainers, localstack, real-dependencies

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 220" role="img" aria-labelledby="mm-integration-title mm-integration-desc">
<title id="mm-integration-title">Spinning up the real thing instead of a mock of it</title>
<desc id="mm-integration-desc">A test run spins up a real, disposable Testcontainers instance of the actual database or broker, exercises the code against that real engine, then tears it down — catching bugs that only appear at the seam.</desc>
<defs>
  <marker id="mm-integration-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n5" x="20" y="85" width="170" height="55" rx="10"/>
<text class="mm-node-title" x="105" y="108" text-anchor="middle">Test run starts</text>
<text class="mm-node-sub" x="105" y="125" text-anchor="middle">no shared test DB</text>

<path class="mm-arrow" d="M190,112 L230,110" marker-end="url(#mm-integration-arrow)"/>

<rect class="mm-n1" x="230" y="65" width="320" height="90" rx="10"/>
<text class="mm-node-title" x="390" y="98" text-anchor="middle">Real disposable container</text>
<text class="mm-node-sub" x="390" y="116" text-anchor="middle">Testcontainers: Postgres, Kafka, Redis</text>
<text class="mm-node-sub" x="390" y="132" text-anchor="middle">not a simulation</text>

<path class="mm-arrow" d="M550,110 L590,112" marker-end="url(#mm-integration-arrow)"/>

<rect class="mm-n2" x="590" y="85" width="170" height="55" rx="10"/>
<text class="mm-node-title" x="675" y="108" text-anchor="middle">Assert, then tear down</text>
<text class="mm-node-sub" x="675" y="125" text-anchor="middle">real engine behavior</text>

<text class="mm-flow-label" x="390" y="190" text-anchor="middle">catches bugs a mock would hide — SQL quirks, serialization, real timeouts</text>
</svg>

<p class="mental-model__caption">Integration testing deliberately gives up isolation for fidelity: instead of mocking the database or message broker, Testcontainers spins up the real thing as a disposable container for the run, so the test catches whatever the real engine actually does — including the SQL dialect quirks and serialization mismatches a mock would quietly hide.</p>
</div>

## Quick Reference

Integration testing verifies that multiple real collaborating parts — a service and its real database, two services communicating — work together correctly, using **Testcontainers** for disposable real infrastructure wherever the alternative would be mocking away the exact behavior you need to verify.

## What is it?

Unit and component tests isolate a part from its dependencies; integration tests deliberately do the opposite — run the real database, real message broker, or real downstream service alongside the code under test to catch the class of bug that only appears at the seams (a SQL dialect quirk, a serialization mismatch, a real network timeout).

## Tool Landscape

| Tool | Role |
|---|---|
| **Testcontainers** | Spins up real, disposable Docker containers (Postgres, Kafka, Redis) for the test run |
| **Spring Boot Test** | JVM-specific integration test support, often combined with Testcontainers |
| **Pytest** / **JUnit** | Test runners orchestrating integration test setup/teardown, language-agnostic to the dependency being tested |
| **LocalStack** | Emulates AWS services locally for integration testing AWS-dependent code without real cloud cost |

## When to Use

- Verifying real interaction with an owned dependency (your database, your message broker, your cache)
- Catching bugs a unit test's mocks would hide (a real SQL constraint violation, a real Kafka consumer-group rebalance)
- Validating a data migration or schema change against a real database engine before it reaches a shared environment

## Recommended Stack

Testcontainers as the default for any test needing a real database/broker/cache; LocalStack for AWS-service-dependent integration tests; reserve full staging-environment tests for cross-service E2E scenarios integration tests alone can't cover.

## Key Takeaways

- 💡 Mocking a database means testing your assumptions about its behavior — Testcontainers tests the real engine instead, closing a fidelity gap that quietly causes production surprises
- 🔥 Disposable, per-run containers avoid both shared-test-database pollution and "works on my machine" environment drift
- ⚠️ Integration tests are meaningfully slower than unit tests (real container startup) — reserve them for what actually needs real-engine fidelity, not every test
- ✅ LocalStack's fidelity varies by AWS service — verify coverage for the specific service you depend on before relying on it fully
- ⚡ CI runners need Docker-in-Docker or equivalent support for Testcontainers-based suites — factor this into CI infrastructure planning early

## Common Mistakes

**Mistake**: Using a shared, long-lived test database across the whole team's integration tests.
**Why it fails**: Tests become order-dependent and pollute each other's state, producing intermittent failures that have nothing to do with the code under test.

**Mistake**: Writing integration tests for every scenario a unit test could already cover with a mock.
**Why it fails**: It pays real-container speed cost for no additional fidelity benefit — reserve integration tests for scenarios where mock behavior could plausibly diverge from the real engine's.

## Advanced Usage

### Integration testing distributed/async systems

Testcontainers' Kafka/RabbitMQ modules extend the same real-dependency pattern to event-driven systems — see [Event-Driven & Messaging Testing](../distributed-systems-resilience-testing/event-driven-messaging-testing.md) for the specific assertion patterns (polling/await instead of immediate checks) async integration testing requires.

## Scenarios & How to Respond

**Scenario: A team wants to skip integration tests and rely solely on unit tests with mocks to save CI time.**
Audience & tone: Direct report — supportive, but pushing on the real risk.
Response: "Mocks are great for speed, but they can't catch a real SQL constraint or serialization bug — I've seen those reach production specifically because the mock didn't match real engine behavior. Let's scope integration tests to just the handful of seams where that risk is highest, rather than all-or-nothing."

## See Also

- [Component Testing](./component-testing.md)
- [Contract Testing](./contract-testing.md)
- [Mocking & Service Virtualization](./mocking-service-virtualization.md)

---

**Related Records**: Component Testing, Contract Testing, Mocking & Service Virtualization
