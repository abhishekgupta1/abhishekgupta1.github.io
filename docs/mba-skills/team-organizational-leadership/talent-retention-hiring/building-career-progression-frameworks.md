---
title: "Building Career Progression Frameworks"
description: "A good framework defines each level along a few consistent dimensions (e.g., scope, technical depth, mentorship, communication) with behavioral, observable criteria — not vague adjectives."
sidebar_position: 2
tags: [leadership, management, mba]
---

# Building Career Progression Frameworks

**Type**: Template
**Difficulty**: ⭐⭐⭐⭐ (Advanced)
**Domain**: Team & Organizational Leadership
**Concept Group**: Talent Retention & Hiring
**Created**: 2026-08-18
**Tags**: career-framework, leveling, promotion, growth

## Quick Reference

A good framework defines each level along a few consistent **dimensions** (e.g., scope, technical depth, mentorship, communication) with **behavioral, observable criteria** — not vague adjectives. Engineers should be able to read their level's row and know concretely what's expected, and read the next level's row and know what changes.

## What is it?

A career progression framework (leveling framework, ladder) is a shared, written definition of what's expected at each seniority level, along multiple dimensions of impact. Its job is to make growth and promotion legible — replacing "you'll know it when you see it" judgment calls with a shared, referenceable standard that both the engineer and their manager (and calibration committee) can point to.

## When to Use

- Building or revising a leveling system for the org
- An engineer asks "what would it take for me to get promoted?" and the honest answer is currently vague
- [Performance reviews](../situational-leadership-coaching/managing-performance-reviews.md) feel inconsistent across managers because there's no shared reference point
- Designing [interview criteria](./crafting-tech-interview-loops.md) that should map to the same bar used internally

## Detailed Example

A simplified two-level excerpt of a framework, using four dimensions:

```
Dimension: Scope of Ownership
  Mid-level:  Owns well-defined projects (weeks to a couple months)
              within a single service, with guidance on cross-team
              dependencies.
  Senior:     Owns ambiguous, multi-quarter initiatives spanning
              multiple services; identifies cross-team dependencies
              proactively rather than being told about them.

Dimension: Technical Depth
  Mid-level:  Solid in the team's core stack; can debug most
              production issues independently within familiar systems.
  Senior:     Recognized as a go-to for a specific technical domain;
              can debug unfamiliar systems methodically under pressure.

Dimension: Mentorship & Influence
  Mid-level:  Reviews peers' PRs constructively; occasionally helps
              onboard new hires.
  Senior:     Actively mentors 1-2 engineers; influences technical
              direction beyond their own immediate project via design
              reviews and RFCs.

Dimension: Communication
  Mid-level:  Communicates clearly within the team; status is legible
              to the manager without prompting.
  Senior:     Communicates tradeoffs and risk clearly to
              cross-functional stakeholders (PM, other teams);
              proactively raises risk before being asked.
```

The key test of a good framework: two different managers, given the same engineer's actual work, should land on roughly the same level assessment. If they wouldn't, the criteria are still too vague.

## Key Takeaways

- 💡 Use observable, behavioral language ("proactively raises risk before being asked") instead of trait language ("is a strong communicator") — behaviors can be evidenced; traits can only be asserted
- 🔥 Keep the number of dimensions small (4-6) — more granularity feels rigorous but becomes unusable in practice and encourages box-checking over holistic judgment
- ⚠️ Don't let the framework silently reward visibility over impact — "influences technical direction" should be evidenced by outcomes, not by who talks most in meetings
- ✅ Publish the framework to the whole team, not just managers — a framework only managers can see doesn't make growth legible to the people it's meant to guide
- ⚡ Revisit the framework roughly annually; a framework that never changes eventually stops matching how the org actually creates value

## Common Mistakes

**Mistake**: Writing level criteria as a checklist of technologies or years of experience.
**Why it fails**: Years of experience and tech-stack familiarity don't reliably predict impact, and this framing invites "time served" promotion arguments instead of impact-based ones — which erodes the framework's credibility over time.

**Mistake**: Building the framework once and never using it in actual review or promotion conversations.
**Why it fails**: A framework that isn't actually the basis for [performance reviews](../situational-leadership-coaching/managing-performance-reviews.md) and promotion cases becomes theater — engineers correctly conclude that the real criteria are informal and political, which is exactly what the framework was meant to prevent.

## Advanced Usage

### Using the framework to reduce attrition

Engineers frequently leave not because growth is impossible, but because it's *illegible* — they can't tell whether they're on track. A framework that's used consistently in every review directly addresses one of the most common, addressable drivers covered in [Reducing Developer Attrition](./reducing-developer-attrition.md).

### Cross-checking the framework against your interview bar

Periodically sample: would a candidate hired at "Senior" through your [interview loop](./crafting-tech-interview-loops.md) actually be rated "Senior" against this framework six months in? A consistent mismatch in either direction means your hiring bar and your internal bar have drifted apart.

## Scenarios & How to Respond

These move across all four audiences from [Adapting Communication Tone by Audience](../situational-leadership-coaching/adapting-communication-tone-by-audience.md) — the engineer (supportive), a peer manager (collaborative), and leadership (concise, evidence-first).

**Scenario: An engineer believes they're already operating at the next level and wants to know why they haven't been promoted.**
Audience & tone: Direct report — supportive and developmental, concrete rather than an opinion contest.
Response: Walk through the framework's dimensions with them concretely, evidence by evidence: "Let's go through each dimension together — here's where I see strong evidence, and here's where I don't yet." Where they genuinely meet the bar, build the case. Where there's a gap, name the specific dimension and missing evidence rather than a vague "not quite there yet" — ambiguity here is a direct driver of [regretted attrition](./reducing-developer-attrition.md).

**Scenario: The framework doesn't map well to a specialist role (e.g., a security engineer, a data platform specialist).**
Audience & tone: Peer managers who own the framework — collaborative, proposing a fix rather than unilaterally reinterpreting it.
Response: Don't force a generalist framework onto a role where the dimensions mean something different. Raise it with fellow managers: "Should we define a specialist track for this, or agree in writing how these dimensions translate for this role?" Do it before someone's promotion case depends on it, not reactively.

**Scenario: A manager writes an inflated scope description to help their engineer's promotion case.**
Audience & tone: Peer manager — collaborative but direct; push back on the evidence, not the intent.
Response: Push back on vague or padded language directly: "Proactively drove alignment across three teams — on what, specifically, with what outcome?" If you're the manager being asked to inflate, resist even under pressure to advocate for your engineer — a promotion won on inflated evidence sets someone up to visibly struggle at the next level, which is a worse outcome for them than a later, real promotion.

**Scenario: Two different managers, given the same engineer's work, land on different level assessments.**
Audience & tone: Peer managers — collaborative, framework-focused rather than defending individual judgment.
Response: Treat this as a framework problem, not a personnel problem: "Let's both walk through the same evidence against the same dimension language and find exactly where we diverge." That specific point is what needs sharper, more behavioral wording in the framework.

**Scenario: The tech stack or org has shifted enough that some level criteria feel outdated.**
Audience & tone: Peer managers and senior ICs — collaborative, proactive rather than reactive.
Response: Don't let the framework silently drift out of sync. Schedule a deliberate revision (roughly annually) with input from senior ICs, not just managers, since they're closest to what "senior-level work" actually looks like day to day now.

**Scenario: Leadership pushes back on a promotion case you believe is well-supported by the framework.**
Audience & tone: Upper management — concise, evidence-first, willing to name a non-merit objection directly.
Response: Ask specifically: "Which dimension or evidence do you see as insufficient?" If it's a legitimate gap, incorporate it. If the pushback isn't tied to the framework's actual criteria, say so plainly: "This meets every criterion we've defined for this level — if the reason is budget, let's name that separately rather than reinterpreting the bar." Letting the framework bend quietly under non-merit pressure destroys its credibility for every future case.

## See Also

- [Managing Performance Reviews](../situational-leadership-coaching/managing-performance-reviews.md)
- [Crafting Tech Interview Loops](./crafting-tech-interview-loops.md)
- [Reducing Developer Attrition](./reducing-developer-attrition.md)
- [Adapting Communication Tone by Audience](../situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Managing Performance Reviews, Crafting Tech Interview Loops, Reducing Developer Attrition
