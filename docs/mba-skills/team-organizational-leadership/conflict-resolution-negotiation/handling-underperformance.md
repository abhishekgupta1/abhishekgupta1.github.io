---
title: "Handling Underperformance"
description: "Diagnose before you act: is this a skill gap, a will/motivation problem, an unclear-expectations problem, or a situational/personal problem? Each has a different fix."
sidebar_position: 2
tags: [leadership, management, mba]
---

# Handling Underperformance

**Type**: Workflow
**Difficulty**: ⭐⭐⭐⭐ (Advanced)
**Domain**: Team & Organizational Leadership
**Concept Group**: Conflict Resolution & Negotiation
**Created**: 2026-08-18
**Tags**: underperformance, difficult-conversations, PIP, feedback

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-underperf-title mm-underperf-desc">
<title id="mm-underperf-title">Diagnosing underperformance before acting</title>
<desc id="mm-underperf-desc">A sustained performance gap fans out into four possible root causes — skill gap, will or motivation, unclear expectations, or a situational problem — each of which converges on a different, targeted fix rather than a generic response.</desc>
<defs>
  <marker id="mm-underperf-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n3" x="20" y="115" width="160" height="70" rx="10"/>
<text class="mm-node-title" x="100" y="145" text-anchor="middle">Sustained gap</text>
<text class="mm-node-sub" x="100" y="161" text-anchor="middle">3+ missed</text>
<text class="mm-node-sub" x="100" y="174" text-anchor="middle">commitments</text>

<path class="mm-arrow" d="M180,135 L286,39" marker-end="url(#mm-underperf-arrow)"/>
<path class="mm-arrow" d="M180,145 L286,106" marker-end="url(#mm-underperf-arrow)"/>
<path class="mm-arrow" d="M180,155 L286,173" marker-end="url(#mm-underperf-arrow)"/>
<path class="mm-arrow" d="M180,165 L286,240" marker-end="url(#mm-underperf-arrow)"/>

<rect class="mm-n2" x="290" y="12" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="380" y="34" text-anchor="middle">Skill gap</text>
<text class="mm-node-sub" x="380" y="51" text-anchor="middle">training, pairing</text>

<rect class="mm-n4" x="290" y="79" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="380" y="101" text-anchor="middle">Will / motivation</text>
<text class="mm-node-sub" x="380" y="118" text-anchor="middle">re-engage, listen</text>

<rect class="mm-n5" x="290" y="146" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="380" y="168" text-anchor="middle">Unclear expectations</text>
<text class="mm-node-sub" x="380" y="185" text-anchor="middle">reset the agreement</text>

<rect class="mm-n6" x="290" y="213" width="180" height="55" rx="10"/>
<text class="mm-node-title" x="380" y="235" text-anchor="middle">Situational</text>
<text class="mm-node-sub" x="380" y="252" text-anchor="middle">support, flexibility</text>

<path class="mm-arrow" d="M470,39 L596,140" marker-end="url(#mm-underperf-arrow)"/>
<path class="mm-arrow" d="M470,106 L596,148" marker-end="url(#mm-underperf-arrow)"/>
<path class="mm-arrow" d="M470,173 L596,158" marker-end="url(#mm-underperf-arrow)"/>
<path class="mm-arrow" d="M470,240 L596,166" marker-end="url(#mm-underperf-arrow)"/>

<rect class="mm-n1" x="600" y="115" width="160" height="70" rx="10"/>
<text class="mm-node-title" x="680" y="145" text-anchor="middle">Targeted fix</text>
<text class="mm-node-sub" x="680" y="161" text-anchor="middle">not a generic</text>
<text class="mm-node-sub" x="680" y="174" text-anchor="middle">PIP by default</text>
</svg>

<p class="mental-model__caption">Underperformance has four distinct root causes — a skill gap, a will or motivation problem, unclear expectations, or something situational — and a generic "try harder" conversation only helps by accident; diagnosing which cause you're actually facing is what makes the fix land.</p>
</div>

<a class="topic-crosslink" href="/cheatsheets/team-organizational-leadership">📋 Quick reference: Team & Organizational Leadership →</a>

## Quick Reference

Diagnose before you act: is this a **skill gap**, a **will/motivation problem**, an **unclear-expectations problem**, or a **situational/personal problem**? Each has a different fix. Address it directly and early via a specific, factual conversation — not through hints in a 1-on-1 or by waiting for the next review cycle.

## What is it?

Underperformance is a sustained gap between what an engineer's role requires and what they're delivering. It's different from a single missed deadline or a bad week — the signature is a pattern: recurring missed commitments, code quality below the team's bar, or disengagement, observed over weeks, not days. Handling it well means being both kind and clear — the two are not in tension, but ambiguity ("just try to do better") is neither.

## When to Use

- You notice the same category of problem (missed deadlines, low code quality, poor communication) at least 2-3 times
- A pattern emerges across multiple [1-on-1s](../situational-leadership-coaching/running-1-on-1s.md) or peer feedback
- Before it reaches a formal [performance review](../situational-leadership-coaching/managing-performance-reviews.md) cycle — reviews should document a pattern already being addressed, not introduce it

## Detailed Example

An engineer has missed three consecutive sprint commitments.

**Step 1 — Diagnose privately first.** Before the conversation, gather specifics: which commitments, by how much, what was said about why at the time. Consider the four causes:
- *Skill gap*: are the tasks genuinely above their current ability?
- *Will/motivation*: has something changed — disengagement, burnout, a conflict with the work itself?
- *Unclear expectations*: did they actually agree the estimate was realistic, or was it imposed?
- *Situational*: is something happening outside work?

**Step 2 — Have the conversation directly, with specifics, not generalities.**
> "I want to talk about the last three sprints — the auth refactor, the API migration, and the dashboard work all slipped by more than a week each. I want to understand what's happening, because it's a pattern I need to address with you."

Not: "You've seemed kind of behind lately." Vague framing invites a vague response and no real resolution.

**Step 3 — Listen for the actual cause before proposing a fix.** If it's a skill gap, that points toward [more directive delegation](../situational-leadership-coaching/delegating-effectively-based-on-engineer-seniority.md) and targeted mentorship. If it's motivation tied to the work itself, that's a different, harder conversation about fit. If it's personal circumstances, that may call for temporary accommodation, not a performance process.

**Step 4 — Agree on specific, observable next steps and a check-in date.** "Let's check in in 3 weeks on whether the next two sprints land on estimate." Document this — even informally — so there's a record if the pattern continues and a formal PIP becomes necessary.

**Step 5 — If it continues, escalate to a formal process** (PIP or equivalent) with HR involved, using the documented pattern from steps 1-4 as evidence. By this point nothing in the formal process should be new information to the engineer.

## Key Takeaways

- 💡 Diagnose the cause before choosing the fix — a skill-gap problem treated as a motivation problem (or vice versa) wastes the conversation and damages trust
- 🔥 Address it within 1-2 weeks of the pattern becoming clear — delay reads as either not noticing or not caring, both of which are worse than an early, direct conversation
- ⚠️ Never let a serious performance issue reach a written review as its first documented mention — it's unfair to the engineer and often not defensible if formal action follows
- ✅ Separate the person from the pattern in your language: "these three deliverables slipped" not "you're not committed" — factual framing keeps the conversation about the work
- ⚡ Underperformance conversations are also a check on you: is the team, delegation mode, or expectation-setting part of the cause? Not every gap is the engineer's alone

## Common Mistakes

**Mistake**: Avoiding the conversation because it feels uncomfortable, hoping the pattern self-corrects.
**Why it fails**: It almost never self-corrects, and the delay costs the engineer the chance to fix it before it's treated as a formal issue — which is a worse outcome for them than an early, direct, low-stakes conversation.

**Mistake**: Skipping straight to a formal PIP without an informal, documented attempt to address it first.
**Why it fails**: Most performance policies (and most engineers' sense of fairness) expect a real opportunity to improve before formal consequences. Skipping it damages trust across the whole team, not just with the individual.

## Advanced Usage

### When underperformance is actually a team-fit problem

Sometimes the honest diagnosis is that the engineer is a poor fit for this specific team or role, not underperforming in an absolute sense. In that case, the kindest and most effective path may be helping them find a better-fit role internally or externally, rather than running a PIP designed for skill-building when the real gap is fit.

### Underperformance vs. a values-driven decision

Distinguish "not meeting the bar" from "reasonably disagreeing with how something should be built." The latter is [an architectural or negotiation problem](./resolving-architectural-deadlocks.md), not a performance one — conflating them (punishing dissent as underperformance) is a fast way to lose your most opinionated senior engineers.

## Scenarios & How to Respond

Most of these are **direct-report** conversations — keep them supportive and developmental per [Adapting Communication Tone by Audience](../situational-leadership-coaching/adapting-communication-tone-by-audience.md), even when the content is hard. The last scenario shifts to **upper management**, where the register needs to be concise and evidence-first.

**Scenario: A previously strong performer's output suddenly drops (possible burnout).**
Audience & tone: Direct report — concerned, not accusatory.
Response: Lead with concern, not accusation. Ask directly and privately: "Your output has changed over the last few weeks compared to before — is something going on, work-related or not?" If it's burnout, the fix is workload and possibly time off, not a performance conversation. Don't default to the standard underperformance playbook until you've ruled out that the person, not their effort, has changed.

**Scenario: A new hire isn't ramping as fast as expected.**
Audience & tone: Direct report — supportive and developmental, diagnostic before corrective.
Response: Check your assumption of "expected" first against how long ramp actually took for the last 2-3 hires, not a gut feeling. If they're genuinely behind, ask them directly and non-judgmentally: "What's been the hardest part of ramping up so far — is there something in the onboarding process that's not working for you?" Many "slow ramp" cases are onboarding-process failures wearing the costume of an individual performance problem.

**Scenario: The engineer disputes the feedback ("that's not fair, here's why").**
Audience & tone: Direct report — calm, non-escalating, genuinely evaluative rather than defensive.
Response: Don't treat pushback as denial to overcome — treat it as information to evaluate. Ask them to walk through their side with specifics: "Help me understand your view of the [auth-migration slip] — what happened from where you sat?" If their account changes your read, say so and adjust. If it doesn't, restate the pattern with the same evidence again, calmly, without escalating tone to match theirs.

**Scenario: The underperformance seems tied to an undisclosed personal crisis.**
Audience & tone: Direct report — fully empathetic; suspend the performance frame for this conversation.
Response: If they disclose it, prioritize support over process — pause the formal performance track and discuss what accommodation is reasonable. If you suspect it but they haven't disclosed it, ask gently: "Is everything okay outside of work? No pressure to share, just want to understand" — rather than guessing and acting on the guess.

**Scenario: The engineer is remote, and you have limited day-to-day visibility into their work.**
Audience & tone: Direct report — supportive, framed around closing an information gap together rather than suspicion.
Response: Anchor the conversation in outcomes and artifacts you can point to, and say so plainly: "I want to make sure I'm seeing the full picture of your work — can we do a lightweight written update for the next few weeks so I have better visibility?" This often clarifies whether the issue is output or just your visibility into it.

**Scenario: A skip-level or HR is pushing you to start a formal PIP faster than you think is fair.**
Audience & tone: Upper management / HR — concise, evidence-based, a clear ask rather than a vague objection.
Response: Push back with your actual documentation, stated plainly: "I don't have the paper trail to make this fair yet — two documented instances and one direct conversation, not three. I need three weeks to have that conversation and document the pattern before a formal process would hold up." If the pressure is about business urgency you don't control, state the minimum you need rather than either capitulating silently or resisting without a concrete ask.

## See Also

- [Managing Performance Reviews](../situational-leadership-coaching/managing-performance-reviews.md)
- [Delegating Effectively Based on Engineer Seniority](../situational-leadership-coaching/delegating-effectively-based-on-engineer-seniority.md)
- [Reducing Developer Attrition](../talent-retention-hiring/reducing-developer-attrition.md)
- [Adapting Communication Tone by Audience](../situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Managing Performance Reviews, Delegating Effectively Based on Engineer Seniority, Reducing Developer Attrition
