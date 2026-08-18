---
title: "Category 1: Performance & Underperformance"
description: "Scenarios 1–6 of the Manager Response Library: Performance & Underperformance."
sidebar_position: 1
tags: [management, playbook, mba]
---

# Category 1: Performance & Underperformance

**Part of**: Manager Response Library

---

## 1. A senior engineer is consistently missing sprint deadlines without warning

**Core Objective**: Convert a recurring, silent pattern into an open one — get the engineer surfacing risk early instead of you discovering it at the deadline.

**Mental Model / Leadership Principle**: The missed deadline isn't the real problem; the *silence* leading up to it is. A senior engineer who flags risk on day 3 of a 10-day task is doing their job even if the date still slips. Your job is to fix the silence, not just the slippage.

**Step-by-Step Action Strategy**:
1. Name the pattern with specifics, not the most recent instance alone — three examples beats one.
2. Ask an open, diagnostic question before proposing a fix; don't assume you know the cause.
3. Agree on a concrete, low-friction early-warning mechanism (e.g., a mid-sprint check-in) for the next cycle.
4. Set a specific date to review whether the new mechanism is working.

**Exact Word-for-Word Script (Do's)**:
> "I want to talk about the last three sprints — the auth work, the migration, and the dashboard task all slipped by more than a few days, and I didn't hear about the risk until close to the deadline each time. Help me understand what's been happening."
>
> "Going forward, can we agree that the moment something looks at risk — even a 20% chance — you flag it to me the same day, not at the deadline? That's the actual thing I need to fix here, more than the dates themselves."
>
> "Let's check back in three weeks and see if this is working better for both of us."

**Phrases to Avoid (Don'ts)**:
- "You need to just manage your time better." (vague, no actionable mechanism)
- "This is the third time — what's going on with you?" (accusatory framing, invites defensiveness over disclosure)
- Saying nothing until the formal review cycle, letting the pattern run silently for months.

**Related Records**: [Handling Underperformance](../team-organizational-leadership/conflict-resolution-negotiation/handling-underperformance.md), [Sprint Velocity & Burndowns](../engineering-governance-operations/resource-allocation-capacity-planning/sprint-velocity-burndowns.md)

---

## 2. A team member is delivering buggy/low-quality work that affects production

**Core Objective**: Stop the production impact quickly while diagnosing whether this is a skill gap, a process gap, or a motivation problem — each needs a different fix.

**Mental Model / Leadership Principle**: Separate the incident from the pattern. The immediate production issue needs containment now; the underlying quality trend needs a slower, diagnostic conversation — don't collapse both into one heated exchange.

**Step-by-Step Action Strategy**:
1. Contain the immediate impact first (rollback, hotfix, incident process) — this is not the moment for the performance conversation.
2. Separately, review the pattern: is this one bad incident or a recurring trend across recent PRs?
3. If it's a pattern, have a direct, private, evidence-based conversation diagnosing the cause.
4. Agree on a concrete quality safeguard (more thorough review on their PRs for a defined period, pairing, or a checklist) with a review date.

**Exact Word-for-Word Script (Do's)**:
> "I want to separate two things: fixing what's live right now, and a longer conversation about a pattern I've noticed in the last few PRs. Let's handle the first one now."
>
> (Separately) "Looking back at the last month, there've been three production issues traced to code you shipped. I want to understand what's driving that — is it the review process, time pressure, or something about how these specific areas of the code work?"
>
> "Let's add an extra review pass on your PRs in this area for the next few weeks while we get this back on track — not a punishment, just a safeguard while we figure out the root cause together."

**Phrases to Avoid (Don'ts)**:
- "You keep breaking things." (character framing instead of pattern framing)
- Publicly naming who caused an incident during the live firefight.
- Skipping the diagnostic conversation and jumping straight to "be more careful."

**Related Records**: [Handling Underperformance](../team-organizational-leadership/conflict-resolution-negotiation/handling-underperformance.md), [Delegating Effectively Based on Engineer Seniority](../team-organizational-leadership/situational-leadership-coaching/delegating-effectively-based-on-engineer-seniority.md)

---

## 3. An employee exhibits low motivation, quiet quitting, or burnout signs

**Core Objective**: Understand the actual cause (burnout, disengagement, or an unaddressed grievance) before responding — treating burnout like a motivation problem, or vice versa, makes it worse.

**Mental Model / Leadership Principle**: Lead with concern, not correction. The behavior (doing the minimum, disengaging in meetings) is a symptom; your first job is diagnosis, not a performance conversation.

**Step-by-Step Action Strategy**:
1. Name the change you've observed, specifically and without judgment.
2. Ask an open question and then actually listen — resist the urge to fill silence with a solution.
3. Based on the cause, respond appropriately: workload relief for burnout, a growth conversation for stalled development, a direct fix for an unaddressed grievance.
4. Follow up in a shorter cycle than usual (1-2 weeks) to check whether it's improving.

**Exact Word-for-Word Script (Do's)**:
> "I've noticed you seem less engaged the last few weeks compared to before — quieter in standups, and a few things have felt like the bare minimum. I wanted to check in, no judgment, just want to understand what's going on."
>
> "Is this about workload, something about the work itself, or something outside of work? Whatever it is, I'd rather know than guess."
>
> "What would actually help right now — less on your plate, a different kind of work, or something else?"

**Phrases to Avoid (Don'ts)**:
- "You don't seem like yourself lately, is everything okay?" as an opener that skips straight to a solution before listening.
- "We need you to bring more energy to the team." (vague, guilt-inducing, no actionable path)
- Ignoring it and hoping it resolves on its own before the next review cycle.

**Related Records**: [Running 1-on-1s](../team-organizational-leadership/situational-leadership-coaching/running-1-on-1s.md), [Reducing Developer Attrition](../team-organizational-leadership/talent-retention-hiring/reducing-developer-attrition.md)

---

## 4. An employee becomes defensive or emotional during a critical performance review

**Core Objective**: De-escalate without abandoning the substance of the feedback — the goal is a review that lands, not just one that ends peacefully.

**Mental Model / Leadership Principle**: A defensive reaction usually means the feedback feels like a surprise or an attack, not that the feedback is wrong. Slow down, validate the emotion, and only then return to the evidence — don't retreat from the substance to manage the discomfort.

**Step-by-Step Action Strategy**:
1. Pause and let them respond fully without interrupting or defending your position.
2. Acknowledge the emotion explicitly before returning to content.
3. Re-anchor in specific evidence, calmly, without escalating your own tone.
4. Offer a follow-up conversation once they've had time to process, rather than forcing full resolution in the room.

**Exact Word-for-Word Script (Do's)**:
> "I can see this is landing hard, and I want to give you space to react before we keep going."
>
> "I hear that this feels unfair — I want to make sure I'm not missing something. Walk me through how you see it."
>
> "Here's the specific evidence behind what I'm saying — I'm open to revisiting if there's context I don't have. Let's take a break and pick this back up tomorrow if that would help."

**Phrases to Avoid (Don'ts)**:
- "Calm down, let's be professional about this." (dismisses the emotion instead of addressing it)
- Backing off the substance entirely to end the discomfort ("okay, maybe it's not that big a deal").
- Matching their escalation with your own raised tone or defensiveness.

**Related Records**: [Managing Performance Reviews](../team-organizational-leadership/situational-leadership-coaching/managing-performance-reviews.md)

---

## 5. Delivering a formal Performance Improvement Plan (PIP) or tough review

**Core Objective**: Deliver a clear, fair, well-documented message with zero surprises — the engineer should already recognize everything in it from prior conversations.

**Mental Model / Leadership Principle**: If anything in this conversation is news to them, something upstream failed. Your job here is to state the pattern plainly, name the specific bar, and be honest about the stakes — clarity is the kindest thing you can offer, even when the content is hard.

**Step-by-Step Action Strategy**:
1. State the purpose of the meeting directly in the first sentence — don't bury it.
2. Walk through the specific, dated pattern and the gap against the role's expectations.
3. Present the plan: concrete criteria, timeline, and support available.
4. Give them room to respond, and confirm they understand both the expectations and the stakes.

**Exact Word-for-Word Script (Do's)**:
> "I want to be direct about why we're meeting: we're putting you on a formal improvement plan. This isn't a surprise given our conversations over the last two months about [specific pattern], but I know it's still hard to hear."
>
> "Here's specifically what needs to change, by when, and what support I'll provide — [specific criteria, timeline, resources]."
>
> "I want this to succeed, and I'm going to be checking in with you every week rather than waiting until the end to see how it went. What questions do you have?"

**Phrases to Avoid (Don'ts)**:
- Softening the stakes to reduce your own discomfort ("this is really just a formality, don't worry too much").
- Vague criteria ("just do better") instead of specific, measurable expectations.
- Introducing a new criticism for the first time in this meeting.

**Related Records**: [Managing Performance Reviews](../team-organizational-leadership/situational-leadership-coaching/managing-performance-reviews.md), [Handling Underperformance](../team-organizational-leadership/conflict-resolution-negotiation/handling-underperformance.md)

---

## 6. Managing a high performer who has a toxic attitude or creates team friction

**Core Objective**: Protect team health without losing the high performer's output — make clear that behavior is evaluated as seriously as delivery.

**Mental Model / Leadership Principle**: Talent doesn't buy an exemption from the behavioral bar. If you let it, you're implicitly telling the rest of the team that results matter more than how people are treated — a message that quietly drives your best collaborative people out.

**Step-by-Step Action Strategy**:
1. Gather specific, observable examples of the behavior's impact — not vague "attitude" complaints.
2. Have a direct conversation naming both their strong output and the specific behavioral pattern.
3. Set clear, specific behavioral expectations with the same rigor as a delivery expectation.
4. Follow up concretely — treat continued friction as seriously as continued missed deadlines would be.

**Exact Word-for-Word Script (Do's)**:
> "Your technical output has been genuinely strong this quarter — I want to be clear about that. I also need to talk about how you're interacting with the team, because I've heard specific feedback that's concerning."
>
> "In the design review last week, [specific example] — that came across as dismissive to two people who mentioned it separately. That's not okay, regardless of whether the technical point was right."
>
> "I need to see this change. Strong results don't offset how people are treated on this team — both matter, and I'll be watching for both going forward."

**Phrases to Avoid (Don'ts)**:
- "I know you're just passionate / a straight shooter" as an excuse that lets the behavior slide.
- Addressing it only vaguely to avoid conflict with someone whose output you rely on.
- Praising results publicly while only ever addressing behavior privately and softly — the team notices the imbalance.

**Related Records**: [Resolving Architectural Deadlocks](../team-organizational-leadership/conflict-resolution-negotiation/resolving-architectural-deadlocks.md), [Handling Underperformance](../team-organizational-leadership/conflict-resolution-negotiation/handling-underperformance.md)

---

**Next**: [Category 2: Conflict & Interpersonal Dynamics](./category-2-conflict-interpersonal-dynamics.md)
