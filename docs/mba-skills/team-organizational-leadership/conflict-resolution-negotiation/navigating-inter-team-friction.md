---
title: "Navigating Inter-Team Friction"
description: "Recurring inter-team friction is almost always a structural problem (unclear ownership, misaligned incentives, competing priorities) wearing a personal costume."
sidebar_position: 1
tags: [leadership, management, mba]
---

# Navigating Inter-Team Friction

**Type**: Workflow
**Difficulty**: ⭐⭐⭐ (Intermediate)
**Domain**: Team & Organizational Leadership
**Concept Group**: Conflict Resolution & Negotiation
**Created**: 2026-08-18
**Tags**: conflict-resolution, cross-team, negotiation, ownership

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 300" role="img" aria-labelledby="mm-interteam-title mm-interteam-desc">
<title id="mm-interteam-title">Peeling surface friction back to its structural cause</title>
<desc id="mm-interteam-desc">Visible inter-team friction sits on top of a structural root cause such as unclear ownership or misaligned incentives. Fixing the structure, not the relationship, is what makes the friction fade.</desc>
<defs>
  <marker id="mm-interteam-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="220" y="20" width="260" height="58" rx="10"/>
<text class="mm-node-title" x="350" y="44" text-anchor="middle">Surface friction</text>
<text class="mm-node-sub" x="350" y="61" text-anchor="middle">blame, tense meetings</text>

<path class="mm-arrow" d="M350,78 L350,136" marker-end="url(#mm-interteam-arrow)"/>
<text class="mm-flow-label" x="440" y="112" text-anchor="middle">peel back</text>

<rect class="mm-n3" x="190" y="140" width="340" height="70" rx="10"/>
<text class="mm-node-title" x="360" y="167" text-anchor="middle">Structural root cause</text>
<text class="mm-node-sub" x="360" y="184" text-anchor="middle">unclear ownership, misaligned incentives,</text>
<text class="mm-node-sub" x="360" y="197" text-anchor="middle">competing priorities</text>

<path class="mm-arrow" d="M530,175 L606,175" marker-end="url(#mm-interteam-arrow)"/>

<rect class="mm-n2" x="610" y="140" width="150" height="70" rx="10"/>
<text class="mm-node-title" x="685" y="167" text-anchor="middle">Fix the structure</text>
<text class="mm-node-sub" x="685" y="184" text-anchor="middle">shared doc, OKR,</text>
<text class="mm-node-sub" x="685" y="197" text-anchor="middle">escalation path</text>

<path class="mm-arrow" d="M685,138 C685,60 555,20 482,44" marker-end="url(#mm-interteam-arrow)"/>
<text class="mm-flow-label" x="600" y="30" text-anchor="middle">friction fades</text>
</svg>

<p class="mental-model__caption">Recurring inter-team friction is almost always a structural problem — unclear ownership, misaligned incentives, or competing priorities — wearing a personal costume, so fixing the structure underneath the argument does more than trying to fix the relationship on top of it.</p>
</div>

## Quick Reference

Recurring inter-team friction is almost always a **structural** problem (unclear ownership, misaligned incentives, competing priorities) wearing a personal costume. Fix the structure — a shared doc of ownership boundaries, a joint OKR, an escalation path — before trying to fix the relationship.

## What is it?

Inter-team friction is repeated conflict between two or more teams — over who owns a system, whose priorities win when they conflict, or who's at fault when something breaks at a boundary. It's distinct from a one-off disagreement: the signature is that the same argument keeps recurring in slightly different clothes (this sprint it's a Slack thread about an outage; last sprint it was a roadmap disagreement; the root cause is the same unresolved question).

## When to Use

- Two teams have had the same category of disagreement more than twice
- Postmortems keep naming "unclear ownership" or "miscommunication between teams" as a contributing factor
- An engineer on your team complains about another team's responsiveness, code quality, or decisions more than once
- Before a joint project kicks off, to pre-empt friction rather than clean it up after

## Detailed Example

Two teams — Platform and Checkout — keep clashing. Checkout says Platform's API changes break them without warning; Platform says Checkout doesn't read the deprecation notices and blocks their velocity.

**Wrong approach**: A joint meeting where each side re-litigates the last three incidents, tempers rise, and the meeting ends with a vague "let's communicate better" — which fixes nothing because "communicate better" isn't an action either side can take Monday morning.

**Right approach**:
1. **Separate the people problem from the structure problem.** Talk to each team lead 1:1 first: "What do you actually need from the other team that you're not getting?" Often this surfaces that Platform has no formal deprecation-notice process, not that anyone is acting in bad faith.
2. **Name the structural gap explicitly.** In this case: no shared contract for breaking-change notice periods.
3. **Negotiate a concrete, written agreement** in a joint session, e.g.: "Platform gives 2 weeks' notice via a specific channel for breaking changes; Checkout designates one on-call engineer to review that channel weekly." Put it in a doc both leads sign off on.
4. **Set a review date** (e.g., in 6 weeks) to check whether the agreement is actually holding, rather than assuming one meeting fixed it permanently.

## Key Takeaways

- 💡 Ask "what would need to be true for this to stop happening?" — it moves the conversation from blame to design
- 🔥 Get agreements in writing; verbal "let's do better" resolutions evaporate within a sprint
- ⚠️ Don't mediate by taking either team's side, even privately — your job is the process, not the verdict, or you become a target next time
- ✅ Involve both team leads in defining the fix, not just in hearing about it — ownership of the solution prevents it from being seen as one side "winning"
- ⚡ If the same friction recurs after a documented agreement, escalate to org design (unclear ownership at the reporting-line level) rather than repeating the same conversation a third time

## Common Mistakes

**Mistake**: Treating repeated friction as a personality clash and solving it with a "get along" conversation.
**Why it fails**: If the underlying incentives are still misaligned (e.g., both teams are measured on metrics that trade off against each other), the friction returns as soon as the immediate tension cools, just with different people.

**Mistake**: Escalating to a shared manager to "just decide" every time, without building a durable process.
**Why it fails**: It doesn't scale — you become a permanent arbitration bottleneck, and the teams never develop the muscle to resolve friction themselves. Related: [Resolving Architectural Deadlocks](./resolving-architectural-deadlocks.md) covers when a decision genuinely needs to be forced versus negotiated.

## Advanced Usage

### Distinguishing structural friction from a values conflict

Some inter-team friction really is a values conflict (e.g., one team prioritizes shipping speed, the other prioritizes reliability, and both are right for their context). In that case, the fix isn't a process doc — it's an explicit, leadership-sanctioned tradeoff decision that both teams can point to when they disagree ("Leadership has decided reliability wins for payment-path changes; speed wins elsewhere").

### Pre-empting friction in joint projects

Before two teams start a joint initiative, spend 30 minutes explicitly agreeing on: decision rights (who has final say on what), escalation path (who do we go to if we disagree), and communication cadence. This single meeting prevents most of the friction that would otherwise surface three weeks in.

## Scenarios & How to Respond

These are almost all **peer-manager** conversations. Per [Adapting Communication Tone by Audience](../situational-leadership-coaching/adapting-communication-tone-by-audience.md), stay collaborative and solution-focused — frame the other team's constraints as equally real, and reach for "how can we align" language rather than any framing that assigns blame.

**Scenario: A postmortem assigns blame to another team instead of finding root cause.**
Audience & tone: Peer manager and the wider team reading the doc — collaborative, blame-free by construction.
Response: Redirect the document and the meeting away from "who" toward "what conditions allowed this." If the doc names a team as the cause, rewrite that line to name the missing safeguard instead (e.g., "no automated check caught the breaking schema change" rather than "Team X shipped a breaking change"). Blame-flavored postmortems teach people to hide problems next time, which costs you the incident data you actually need.

**Scenario: One team repeatedly ignores another team's requests or tickets.**
Audience & tone: Peer manager — collaborative, assume good faith, propose a joint fix.
Response: Before assuming bad faith, check whether the requesting team's asks are actually prioritized anywhere visible to the other team. Open with the shared-objective framing: "How can we set up a process so your team's requests don't fall through the cracks on our end?" Get both leads to agree on an explicit SLA and write it down. If it continues after that exists, you now have a clear, documented gap to escalate on concretely.

**Scenario: An IC escalates a cross-team complaint directly to your skip-level instead of to you.**
Audience & tone: Two conversations — the engineer (direct report, supportive, non-defensive) and, separately, the peer manager whose team the complaint is about (collaborative, not accusatory).
Response: Don't treat it as a betrayal. Ask the engineer, open-ended: "What made this feel like it needed to go there instead of to me first?" Address the underlying issue with the other team's manager using the same joint-problem-solving framing as any other inter-team friction.

**Scenario: Two team leads have a personal dislike for each other that colors every interaction.**
Audience & tone: Peer manager — collaborative where possible, but honest and direct about the dynamic itself.
Response: Acknowledge it's a real dynamic rather than pretending the disagreements are purely technical. Structure interactions to reduce friction surface area — written proposals before meetings, a neutral third party facilitating — while working the actual issue in parallel. If it's actively harming delivery, shift tone to direct and clear (not collaborative-soft) for a private conversation about professional conduct.

**Scenario: A reorg leaves a system's ownership ambiguous between two teams.**
Audience & tone: Peer manager — collaborative, jointly defining the fix rather than one side unilaterally claiming or disclaiming ownership.
Response: Don't let it resolve itself informally through whoever happens to respond to pages. Propose explicitly: "Let's agree on an owner within two weeks, even if it's imperfect, rather than leaving this ambiguous." Document it somewhere both teams and future hires can find it.

**Scenario: Two teams' roadmap priorities directly conflict during planning season.**
Audience & tone: Peer managers first (collaborative, state rationale plainly), then escalate to whoever has cross-team authority using upper-management tone (concise, outcome-focused, solution alongside the conflict).
Response: Get both teams' leadership to state their priority rationale explicitly in the same room — "here's why this matters for us, what does it look like from your side?" — before escalating. When you do escalate, frame it concisely for the decision-maker: state both priorities, the tradeoff, and a recommendation, not a blow-by-blow of the disagreement. Document the decision and rationale so it doesn't get relitigated by ICs on either team who weren't in the room.

## See Also

- [Resolving Architectural Deadlocks](./resolving-architectural-deadlocks.md)
- [Handling Underperformance](./handling-underperformance.md)
- [Running 1-on-1s](../situational-leadership-coaching/running-1-on-1s.md)
- [Adapting Communication Tone by Audience](../situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Resolving Architectural Deadlocks, Handling Underperformance, Running 1-on-1s
