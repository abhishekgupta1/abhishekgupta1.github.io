---
title: "Running 1-on-1s"
description: "The 1-on-1 belongs to the engineer, not you."
sidebar_position: 2
tags: [leadership, management, mba]
---

# Running 1-on-1s

**Type**: Workflow
**Difficulty**: ⭐⭐ (Basic-Intermediate)
**Domain**: Team & Organizational Leadership
**Concept Group**: Situational Leadership & Coaching
**Created**: 2026-08-18
**Tags**: 1-on-1s, coaching, trust, feedback

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 260" role="img" aria-labelledby="mm-oneonone-title mm-oneonone-desc">
<title id="mm-oneonone-title">The default 1-on-1 agenda order, repeating on cadence</title>
<desc id="mm-oneonone-desc">A 1-on-1 runs the engineer's agenda first, their career and growth second, and the manager's own items last if time remains, then repeats on a steady weekly or biweekly cadence.</desc>
<defs>
  <marker id="mm-oneonone-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="30" y="90" width="190" height="70" rx="10"/>
<text class="mm-node-title" x="125" y="120" text-anchor="middle">Their agenda first</text>
<text class="mm-node-sub" x="125" y="137" text-anchor="middle">blockers, frustrations,</text>
<text class="mm-node-sub" x="125" y="150" text-anchor="middle">open questions</text>

<path class="mm-arrow" d="M220,125 L296,125" marker-end="url(#mm-oneonone-arrow)"/>

<rect class="mm-n2" x="300" y="90" width="190" height="70" rx="10"/>
<text class="mm-node-title" x="395" y="120" text-anchor="middle">Career and growth</text>
<text class="mm-node-sub" x="395" y="137" text-anchor="middle">second priority</text>

<path class="mm-arrow" d="M490,125 L566,125" marker-end="url(#mm-oneonone-arrow)"/>

<rect class="mm-n4" x="570" y="90" width="190" height="70" rx="10"/>
<text class="mm-node-title" x="665" y="120" text-anchor="middle">Manager's items</text>
<text class="mm-node-sub" x="665" y="137" text-anchor="middle">last, if time remains</text>

<path class="mm-arrow" d="M650,160 C650,230 250,230 100,162" marker-end="url(#mm-oneonone-arrow)"/>
<text class="mm-flow-label" x="375" y="222" text-anchor="middle">repeats weekly (biweekly for senior ICs)</text>
</svg>

<p class="mental-model__caption">A 1-on-1 has a strict default order — the engineer's agenda first, their career and growth second, and the manager's own items last if time allows — repeating on a steady cadence so small problems surface while they're still small.</p>
</div>

## Quick Reference

The 1-on-1 belongs to the engineer, not you. Default agenda: **their agenda first, career/growth second, your items last (if there's time)**. Cadence: weekly for most engineers, biweekly for very senior/autonomous ones. If you're doing status updates in a 1-on-1, you're wasting it — that belongs in async standups or docs.

## What is it?

A 1-on-1 is a recurring, private conversation between a manager and a direct report whose purpose is to build trust and surface problems while they're still small. It is not a status meeting — status can be gathered asynchronously. It's the mechanism through which you actually practice [situational leadership](./delegating-effectively-based-on-engineer-seniority.md): you can't calibrate delegation mode for someone you don't understand, and you don't understand someone from ticket updates.

## When to Use

- Every direct report, every week (or biweekly for senior ICs who've explicitly asked for less frequency), without fail
- Especially important in the first 90 days of a new hire or a new manager relationship, when trust is being established
- When something feels "off" with an engineer but you can't point to a specific incident — the 1-on-1 is where that gets named

## Detailed Example

A weekly 30-minute 1-on-1 with a mid-level engineer, structured:

```
0:00–0:02  Open: "What's on your mind?" (their agenda, always first)
0:02–0:15  Their topics — could be a blocker, a frustration with a teammate,
           a question about a design decision, or nothing at all some weeks
0:15–0:22  Your prompts if they didn't bring it up themselves:
           - "How are you feeling about the pace of the X project?"
           - "Anything I did or didn't do recently that made your week harder?"
0:22–0:27  Career/growth check-in (not every week — maybe every 3-4 weeks):
           "How does this quarter's work connect to what you told me you
           want next?"
0:27–0:30  Your items, only if time remains — and only things that need
           two-way discussion, not announcements
```

If in week 3 the engineer mentions offhand that a teammate keeps rewriting their PRs without discussion, that's the actual content of the meeting — drop the rest of the agenda and dig in. That thread, left unaddressed, becomes [inter-team or interpersonal friction](../conflict-resolution-negotiation/navigating-inter-team-friction.md) three months later.

## Key Takeaways

- 💡 If you find yourself talking more than the engineer, invert the ratio — your job in this meeting is to listen and unblock, not report
- 🔥 Keep a running doc per engineer; patterns across weeks (recurring frustration, repeated blockers) are more informative than any single meeting
- ⚠️ Never use the 1-on-1 to deliver a first-time piece of serious negative feedback out of nowhere — that erodes the psychological safety that makes the meeting useful. Serious issues need [their own dedicated conversation](../conflict-resolution-negotiation/handling-underperformance.md), flagged in advance
- ✅ Protect the meeting from cancellation — canceling a 1-on-1 repeatedly signals to the engineer that they're not a priority, even when that's not the intent
- ⚡ Ask "what's the thing you're not telling me because you're not sure it's worth mentioning?" occasionally — it surfaces the small stuff before it compounds

## Common Mistakes

**Mistake**: Turning the meeting into a project status update.
**Why it fails**: Status is knowable from tickets, dashboards, and standups. Using the one dedicated private hour for status wastes the only structural opportunity to catch what those channels can't show — how the engineer actually feels about the work.

**Mistake**: Only running 1-on-1s when something is wrong.
**Why it fails**: If the meeting only happens during a crisis, the engineer associates it with being in trouble, and stops being candid in it — right when candor matters most.

## Advanced Usage

### Adjusting structure by delegation mode

An engineer you're coaching (per [situational delegation](./delegating-effectively-based-on-engineer-seniority.md)) needs more of your time spent unblocking specifics; an engineer in Empower mode needs the 1-on-1 to be almost entirely about career trajectory and organizational context, since day-to-day unblocking isn't the bottleneck for them.

### Using 1-on-1 notes as review input

A running per-engineer notes doc, kept honestly over a quarter, is the single best source material for writing an evidence-based [performance review](./managing-performance-reviews.md) — it prevents recency bias, where only the last two weeks before the review actually get remembered.

## Scenarios & How to Respond

All of these are **direct-report** conversations. Per [Adapting Communication Tone by Audience](./adapting-communication-tone-by-audience.md), the register throughout should stay supportive, clear, and empathetic, built on open-ended prompts rather than statements that close the conversation down.

**Scenario: The engineer says "nothing to discuss" almost every week.**
Audience & tone: Direct report — supportive, curious, not interrogating.
Response: Don't accept it as the default and skip to your items. Ask a specific, non-generic prompt instead of "anything on your mind?" — e.g., "What's the most annoying part of your week been?" or "What would you change about how the team works if you could?" If it's every week for a month, name it directly and gently: "I've noticed we don't have much to talk about lately — is this meeting useful to you right now, or should we use the time differently?"

**Scenario: The engineer uses the whole meeting to vent about a teammate.**
Audience & tone: Direct report — empathetic listening first, then a clarifying, non-judgmental question.
Response: Let them finish without defending the other person. Then separate venting from action with an open question: "Do you want me to do something about this, or did you mainly need to say it out loud?" A recurring complaint about the same person is a signal worth tracking — it may need [direct intervention as inter-team or interpersonal friction](../conflict-resolution-negotiation/navigating-inter-team-friction.md), which shifts the audience to a peer-manager conversation with the other person's manager.

**Scenario: The engineer discloses a serious personal issue (health, family, mental health).**
Audience & tone: Direct report — entirely empathetic; set aside every other register for this conversation.
Response: Prioritize their wellbeing over the agenda immediately. Ask what support would actually help ("what would make the next few weeks easier for you?") rather than assuming. Loop in HR only with their knowledge and only where necessary. This stays outside performance-review material unless and until it affects sustained delivery, and even then it's handled with the same care, not folded into a standard [underperformance](../conflict-resolution-negotiation/handling-underperformance.md) conversation.

**Scenario: The engineer asks directly for a raise or promotion mid-meeting.**
Audience & tone: Direct report — clear and developmental; a real answer, not deflection.
Response: Don't say "let's see" — give a real answer even if it's not the one they want, framed around growth: "Here's what I'd need to see before I could make that case — [specific gap] — and here's a project where you could show it." If they're not on track, say so plainly, tied to the [career framework](../talent-retention-hiring/building-career-progression-frameworks.md). Ambiguity here is one of the most common drivers of [regretted attrition](../talent-retention-hiring/reducing-developer-attrition.md).

**Scenario: You (the manager) keep having to cancel or reschedule the meeting.**
Audience & tone: Direct report — accountable and clear, a real acknowledgment rather than a throwaway apology.
Response: Recognize the cost even if it feels like a minor scheduling issue — repeated cancellations read as "you're not a priority." If a conflict is unavoidable, reschedule within the same day and say so directly: "Sorry for moving this again — I know it matters, let's make sure we don't lose it."

**Scenario: A new hire's first 1-on-1 in week one.**
Audience & tone: Direct report — supportive and oriented toward listening, minimal evaluation.
Response: Shift the ratio further toward listening and orientation. Ask open questions: "What's been confusing so far?" and "What did you expect that hasn't matched reality yet?" Avoid loading it with career-framework talk this early — the priority is surfacing onboarding friction while it's still cheap to fix.

**Scenario: The engineer is in a different timezone with minimal working-hours overlap.**
Audience & tone: Direct report — same supportive register, adapted for reduced synchronous time.
Response: Protect the 1-on-1 as the one synchronous slot even if everything else is async — don't let it be the first thing cut for scheduling convenience. Between meetings, keep a shared async doc so items don't pile up silently for two weeks waiting for the one overlapping hour.

## See Also

- [Delegating Effectively Based on Engineer Seniority](./delegating-effectively-based-on-engineer-seniority.md)
- [Managing Performance Reviews](./managing-performance-reviews.md)
- [Handling Underperformance](../conflict-resolution-negotiation/handling-underperformance.md)
- [Adapting Communication Tone by Audience](./adapting-communication-tone-by-audience.md)

---

**Related Records**: Delegating Effectively Based on Engineer Seniority, Managing Performance Reviews, Handling Underperformance
