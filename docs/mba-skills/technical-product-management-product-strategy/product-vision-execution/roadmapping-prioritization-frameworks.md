---
title: "Roadmapping & Prioritization Frameworks"
description: "RICE (Reach × Impact × Confidence ÷ Effort) is best for comparing a long backlog of discrete features on relative value."
sidebar_position: 3
tags: [product-management, tpm, mba]
---

# Roadmapping & Prioritization Frameworks

**Type**: Framework
**Difficulty**: ⭐⭐⭐ (Intermediate)
**Domain**: Technical Product Management & Product Strategy
**Concept Group**: Product Vision & Execution
**Created**: 2026-08-18
**Tags**: prioritization, RICE, Kano, MoSCoW, roadmapping

## Quick Reference

**RICE** (Reach × Impact × Confidence ÷ Effort) is best for comparing a long backlog of discrete features on relative value. **Kano** categorizes features by the type of satisfaction they drive (Must-Be, Performance, Delighter) and is best for balancing a roadmap across feature types. **MoSCoW** (Must/Should/Could/Won't) is best for scoping a single release under a fixed deadline. Pick the framework that matches the decision you're actually making — they're not interchangeable.

## What is it?

These are structured decision frameworks for deciding what to build, replacing gut-feel or whoever's loudest with an explicit, comparable, and defensible method. Each framework is suited to a different kind of prioritization decision — comparing many disparate ideas, balancing a portfolio of feature types, or scoping a fixed release — and using the wrong one for the situation (e.g., MoSCoW for comparing a hundred backlog ideas) produces a worse outcome than picking correctly.

## When to Use

- **RICE**: quarterly or roadmap-level planning with a long list of candidate features competing for the same capacity
- **Kano**: assessing whether the roadmap is balanced (are we only shipping table-stakes features and never anything delightful, or vice versa?)
- **MoSCoW**: scoping a specific release with a hard deadline, where the question is "what's actually in v1"

## Detailed Example

**RICE**, comparing three backlog candidates:

```
Feature A (bulk export):
  Reach: 2,000 users/quarter | Impact: 1 (medium) | Confidence: 80%
  Effort: 4 person-weeks
  RICE score = (2000 × 1 × 0.8) / 4 = 400

Feature B (new integration):
  Reach: 500 users/quarter | Impact: 3 (high) | Confidence: 60%
  Effort: 6 person-weeks
  RICE score = (500 × 3 × 0.6) / 6 = 150

Feature C (UI polish on a low-traffic page):
  Reach: 200 users/quarter | Impact: 0.5 (low) | Confidence: 90%
  Effort: 1 person-week
  RICE score = (200 × 0.5 × 0.9) / 1 = 90

Ranking: A > B > C — bulk export wins on reach and confidence
  despite lower per-user impact than the integration.
```

**Kano**, categorizing the same backlog:
```
Bulk export     → Performance feature (more is better, linear satisfaction)
New integration → Delighter (unexpected, drives strong satisfaction if present, low dissatisfaction if absent)
Basic security  → Must-Be (expected; absence causes strong dissatisfaction,
                   presence doesn't drive much extra satisfaction)

A healthy roadmap has all three categories represented — an
all-Delighter roadmap risks leaving Must-Be gaps that quietly erode
trust; an all-Must-Be roadmap risks a product that never excites anyone.
```

**MoSCoW**, scoping a release with a fixed 6-week deadline:
```
Must have:    Core workflow works end-to-end, basic error handling
Should have:  Bulk export (high value, but launch works without it)
Could have:   New integration (nice if time allows)
Won't have (this release): UI polish — explicitly deferred, not forgotten
```

## Key Takeaways

- 💡 RICE's "Confidence" factor exists specifically to prevent high-uncertainty, high-reach ideas from crowding out well-validated ones — don't skip filling it in honestly just because it's the hardest number to estimate
- 🔥 Kano is best used qualitatively as a portfolio-balance check, not as a precise scoring exercise — the value is noticing "we have no Delighters this quarter," not computing a Kano score to the decimal
- ⚠️ MoSCoW's "Won't have" category should be stated explicitly and communicated, not left implicit — an unstated "won't have" gets silently re-litigated later by whoever assumed it was included
- ✅ Recalculate RICE scores when a key input changes materially (new usage data changes Reach, a design spike changes Effort) — a stale RICE ranking is worse than no ranking, because it carries false confidence
- ⚡ These frameworks structure the conversation, they don't replace judgment — use the framework's output as the starting point for a discussion, not as an automatic, unquestioned verdict

## Common Mistakes

**Mistake**: Using RICE scores as an unquestionable ranking without discussing edge cases (e.g., a low-RICE item that's a hard compliance requirement).
**Why it fails**: Some things need to be built regardless of RICE score (legal requirements, critical fixes) — treating the framework as the sole decision-maker instead of a decision-support tool leads to defensible-looking but wrong prioritization.

**Mistake**: Applying MoSCoW to a full quarter's backlog instead of a single scoped release.
**Why it fails**: MoSCoW works because it forces hard tradeoffs against a fixed, near-term deadline — applied to a longer, less time-boxed horizon, everything drifts toward "Should have" and the framework stops forcing any real decision.

## Advanced Usage

### Combining frameworks across planning horizons

Use RICE for quarterly backlog ranking, then MoSCoW to scope the specific release that quarter's top-ranked items land in — the two frameworks operate at different altitudes and combine naturally rather than competing.

### Feeding discovery and metrics data into RICE inputs

The "Reach" and "Impact" estimates in RICE are only as good as the data behind them — [product discovery](./product-discovery-user-research.md) findings and [metrics](./north-star-product-metrics.md) baselines should directly inform these numbers rather than being estimated from intuition alone.

## Scenarios & How to Respond

**Scenario: A stakeholder wants their pet feature prioritized despite a low RICE score.**
Audience & tone: Stakeholder — pragmatic, transparent about the tradeoff, per [Adapting Communication Tone by Audience](../../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md).
Response: Show the scoring plainly and invite them into the tradeoff rather than just saying no: "Here's how it scores against the rest of the backlog and why — if you believe the reach or impact estimate is off, let's revisit those inputs together. If we prioritize this, here's what it would displace."

**Scenario: A direct report's roadmap is entirely Kano "Must-Be" features with nothing exciting for customers.**
Audience & tone: Direct report — supportive, developmental, open-ended rather than dictating the fix.
Response: Raise it as a coaching question: "Looking at the roadmap through a Kano lens, I notice it's all table-stakes work — what would it look like to find room for even one Delighter this quarter?" Let them work out the specific tradeoff rather than prescribing which feature to add.

**Scenario: Leadership demands the full backlog "just get done" without accepting a Won't-Have list.**
Audience & tone: Upper management — concise, tradeoff-explicit, solution alongside the constraint.
Response: "With current capacity, committing to everything means every item slips its date. Here's the Must/Should/Could split I'd recommend to hit the deadline on the highest-value pieces — happy to revisit if the deadline or capacity changes." State the constraint as fact, not opinion, and offer the structured alternative.

## See Also

- [Product Discovery & User Research](./product-discovery-user-research.md)
- [North Star & Product Metrics](./north-star-product-metrics.md)
- [Sprint Velocity & Burndowns](../../engineering-governance-operations/resource-allocation-capacity-planning/sprint-velocity-burndowns.md)
- [Adapting Communication Tone by Audience](../../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Product Discovery & User Research, North Star & Product Metrics, Sprint Velocity & Burndowns
