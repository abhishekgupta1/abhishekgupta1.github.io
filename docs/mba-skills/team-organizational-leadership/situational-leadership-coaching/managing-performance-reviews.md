---
title: "Managing Performance Reviews"
description: "A good performance review contains zero surprises."
sidebar_position: 3
tags: [leadership, management, mba]
---

# Managing Performance Reviews

**Type**: Workflow
**Difficulty**: ⭐⭐⭐ (Intermediate)
**Domain**: Team & Organizational Leadership
**Concept Group**: Situational Leadership & Coaching
**Created**: 2026-08-18
**Tags**: performance-reviews, feedback, calibration, career-growth

## Quick Reference

A good performance review contains **zero surprises**. It's a written summary of feedback the engineer has already heard in [1-on-1s](./running-1-on-1s.md), backed by specific evidence tied to their [level's expectations](../talent-retention-hiring/building-career-progression-frameworks.md), not a first disclosure of concerns.

## What is it?

A performance review is a periodic (usually semi-annual or annual), documented evaluation of an engineer's impact against the expectations of their role and level. It serves three audiences at once: the engineer (growth and clarity), the calibration process (fairness across the org), and the historical record (protecting both the engineer and the company if a dispute arises later). Good reviews are boring to read because there's nothing in them the engineer hasn't already heard.

## When to Use

- At your organization's standard review cadence (commonly every 6 or 12 months)
- Before a promotion case is submitted, to build a paper trail of evidence
- When formally documenting a performance improvement plan (PIP) — see [Handling Underperformance](../conflict-resolution-negotiation/handling-underperformance.md)

## Detailed Example

Writing a review for a mid-level engineer, using a level-anchored structure:

```
1. Level expectations recap (2-3 sentences)
   "At the Mid-level, we expect independent execution on well-scoped
   projects, some technical mentorship of junior engineers, and reliable
   cross-team communication."

2. Evidence of impact (specific, dated, verifiable)
   - "Led the checkout-latency project (Mar–May), cutting p99 by 34%
     against a 30% target."
   - "Reviewed 40+ PRs from two junior engineers with detailed, kind
     feedback (per their own comments in 1-on-1s)."
   - Avoid: "Did a great job this half" (not evidence, not specific)

3. Growth areas (already discussed in prior 1-on-1s — no surprises)
   "We talked in April about proactively flagging scope risk earlier;
   the auth-migration project slipped 2 weeks partly because the risk
   wasn't raised until it was blocking. This is the one area I want to
   see continued growth on."

4. Rating and rationale, calibrated against peers at the same level
5. Forward-looking: what does the next 6 months look like, and what
   would justify a promotion conversation
```

Note what's absent: nothing here is news. If "proactively flagging scope risk" only appears for the first time in the written review, that's a process failure that happened months earlier, not in the writing of this document.

## Key Takeaways

- 💡 Use specific, dated, falsifiable evidence — "shipped X, which did Y" — not adjectives like "strong" or "solid"
- 🔥 Calibrate against the level's actual bar, not against the rest of the team informally — otherwise reviews drift with whoever happens to be on the team that cycle
- ⚠️ Never introduce a new criticism for the first time in a written review — it damages trust and is often against company policy for cause
- ✅ Write the review as if the engineer will read it twice: once emotionally, once rationally. Structure and evidence help the second read land
- ⚡ Separate "rating" conversations from "growth" conversations where possible — a lower-than-hoped rating can drown out growth feedback if delivered in the same breath without pause

## Common Mistakes

**Mistake**: Recency bias — the review reflects the last 4-6 weeks, not the full period.
**Why it fails**: It's unfair to engineers whose strong early-period work gets forgotten, and it teaches engineers to "perform" right before review season instead of sustaining good work. [1-on-1 notes](./running-1-on-1s.md) kept over the whole period are the fix.

**Mistake**: Grade inflation to avoid a hard conversation.
**Why it fails**: It removes the engineer's ability to act on real feedback, and it becomes a serious liability later if you need to document a performance pattern for a PIP — a paper trail of inflated reviews undermines the case.

## Advanced Usage

### Calibration sessions

In most orgs, ratings go through a calibration meeting where managers compare notes across teams before finalizing. Come with your evidence written down in advance — vague verbal impressions lose calibration arguments to managers who bring specifics, regardless of whose engineer is actually stronger.

### Connecting reviews to leveling frameworks

A review is only as fair as the [career progression framework](../talent-retention-hiring/building-career-progression-frameworks.md) it's measured against. If your org's level definitions are vague, invest in making them concrete before investing more in review-writing technique — otherwise you're calibrating precisely against an imprecise target.

## Scenarios & How to Respond

These scenarios span three of the four audiences from [Adapting Communication Tone by Audience](./adapting-communication-tone-by-audience.md) — the engineer receiving the review (supportive, developmental), the peer lead you're gathering input from or calibrating against (collaborative), and, where a rating decision needs defending upward, upper management (concise, evidence-first).

**Scenario: The engineer disagrees with their rating in the review conversation.**
Audience & tone: Direct report — supportive, non-defensive, genuinely willing to revise.
Response: Ask them to walk through their own evidence first — an open question, not a rebuttal: "Tell me what impact you feel this doesn't capture." If it surfaces something you missed, revise. If your evidence still holds, restate it calmly: "I hear that you see it differently — here's the specific evidence behind this rating, and I'm open to revisiting if there's something I'm missing." Offer a follow-up conversation once they've had time to process, rather than forcing resolution in the same meeting.

**Scenario: You have limited direct visibility because the engineer works mostly with another team (matrix org).**
Audience & tone: Peer lead — collaborative, specific ask rather than an open-ended favor.
Response: Don't write the review from secondhand impressions alone. Proactively request written input from the other team's lead well before the deadline, framed as a joint ask: "Can we align on what you saw from [engineer] this cycle? Specifically, what did they ship, and how was their cross-team communication?" Cross-check it against your own [1-on-1 notes](./running-1-on-1s.md) for consistency before finalizing, then deliver the synthesized picture to the engineer in the usual supportive register.

**Scenario: A strong performer had one clearly bad quarter (missed a deadline, a difficult project).**
Audience & tone: Direct report — supportive but honest, no softening into vague praise.
Response: Don't let recency bias tank a review that should reflect the full period, but don't paper over the bad quarter either. Name both honestly: the sustained pattern of strong work, and the specific quarter's shortfall, then ask, "What's your own read on what changed that quarter?" before offering yours. One bad quarter shouldn't single-handedly move the rating unless it reveals something durable, not situational.

**Scenario: Calibration downgrades the rating you proposed.**
Audience & tone: First peer managers in the calibration room (collaborative, evidence-based advocacy), then the direct report (supportive, honest about the outcome).
Response: Before delivering the review, understand why — ask the calibration committee for the specific comparison that drove the change, not just the outcome: "Help me understand the comparison — what set the peers who scored higher apart?" If the reasoning is sound, incorporate it honestly into what you share with the engineer. If you disagree, advocate with specifics in the calibration meeting itself — after the fact is too late to change the number, but you can still make sure what you tell the engineer doesn't feel arbitrary.

**Scenario: The engineer is currently on a documented performance improvement plan during the review cycle.**
Audience & tone: Direct report (clear, no new surprises) and HR/upper management (concise, consistent with the documented record).
Response: The formal review should reference the PIP's specific, already-established criteria — this is not the moment to introduce new concerns. Coordinate closely with HR on timing and wording so the review and the PIP status tell one consistent story to anyone reading both. See [Handling Underperformance](../conflict-resolution-negotiation/handling-underperformance.md) for the process that should already be underway by this point.

**Scenario: The engineer reacts to a "meets expectations" (not "exceeds") rating as if they were denied a promotion.**
Audience & tone: Direct report — clear and developmental; separate the two topics explicitly rather than letting ambiguity sit.
Response: Separate the two conversations explicitly — a rating and a promotion aren't the same decision. Clarify what "meets expectations" actually means at their level, and if promotion is genuinely on their mind, ask directly: "Do you want to talk about what promotion would actually require?" and address it against the [career framework](../talent-retention-hiring/building-career-progression-frameworks.md) rather than letting the rating stand in as an ambiguous verdict.

## See Also

- [Running 1-on-1s](./running-1-on-1s.md)
- [Delegating Effectively Based on Engineer Seniority](./delegating-effectively-based-on-engineer-seniority.md)
- [Handling Underperformance](../conflict-resolution-negotiation/handling-underperformance.md)
- [Building Career Progression Frameworks](../talent-retention-hiring/building-career-progression-frameworks.md)
- [Adapting Communication Tone by Audience](./adapting-communication-tone-by-audience.md)

---

**Related Records**: Running 1-on-1s, Handling Underperformance, Building Career Progression Frameworks
