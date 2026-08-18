---
title: "Sprint Velocity & Burndowns"
description: "Velocity is a measurement, not a target — use the trailing 3-6 sprint average to forecast, and treat any single sprint's number as noisy."
sidebar_position: 2
tags: [engineering-management, operations, mba]
---

# Sprint Velocity & Burndowns

**Type**: Workflow
**Difficulty**: ⭐⭐ (Basic-Intermediate)
**Domain**: Engineering Governance & Operations
**Concept Group**: Resource Allocation & Capacity Planning
**Created**: 2026-08-18
**Tags**: velocity, burndown, sprint-planning, forecasting

## Quick Reference

Velocity is a **measurement**, not a **target** — use the trailing 3-6 sprint average to forecast, and treat any single sprint's number as noisy. A burndown chart's job is to show *trend*, not to shame a team into a specific slope; a flattening burndown mid-sprint is a signal to replan, not a signal to push harder.

## What is it?

Velocity is the amount of work (story points, or another consistent unit) a team completes per sprint, used to forecast how much future work fits in a given timeframe. A burndown chart tracks remaining work against time within a single sprint, showing whether the team is on pace to finish what it committed to. Both are diagnostic tools for planning — they become harmful the moment they're used as performance targets, because teams predictably game whatever number is being watched (inflating estimates, avoiding hard-to-estimate work) rather than making the underlying data more honest.

## When to Use

- Forecasting how much work a team can realistically take on next sprint or quarter
- Mid-sprint, to catch early whether the team is on pace and needs to reprioritize before the deadline, not after
- Building credibility for date commitments to stakeholders using historical data instead of optimism
- Diagnosing whether a slipping team has a capacity problem, a scope problem, or an estimation problem

## Detailed Example

A team's last 5 sprints (in story points completed): 32, 28, 41, 25, 34.

```
Naive approach: "Last sprint we did 34, let's plan 34 next sprint."
  Problem: single-sprint numbers are noisy — this ignores real
  variance (25 to 41, a 64% swing) and produces commitments that
  are right by luck as often as by planning.

Better approach: Use a trailing average with a range, not a point
  estimate.
  Trailing 5-sprint average: 32
  Range: 25–41
  Plan the sprint at ~30 (slightly below average, biased toward the
  low end) and treat 34-41 as stretch capacity, not baseline.

Mid-sprint burndown check (day 6 of 10):
  Ideal burndown: 60% of points remaining should be ~40% done
  Actual: only 20% done
  Response: this is the moment to replan — cut scope now, not on
  day 9 when there's no time left to make a real choice. Ask:
  "given where we actually are, what's the smallest version of this
  sprint's goal we can still hit?"
```

## Key Takeaways

- 💡 Use a range, not a single number, when forecasting — "we can likely deliver 25-34 points" is more honest and more useful than a false-precision "32"
- 🔥 A burndown that's flattening mid-sprint is the highest-leverage moment to act — replanning on day 6 preserves options that don't exist on day 9
- ⚠️ Never use velocity to compare teams against each other — story points aren't standardized across teams, and using them competitively guarantees point inflation, which destroys the metric's usefulness for its actual purpose (forecasting)
- ✅ Investigate large velocity swings rather than averaging past them silently — a sprint that came in at half the trailing average might reveal a real capacity change (an on-call surge, an unplanned incident) worth tracking separately
- ⚡ Re-baseline velocity after any material team change — new hires, a departure, a change in on-call load — rather than assuming historical averages still hold

## Common Mistakes

**Mistake**: Treating velocity as a target to hit rather than a measurement to learn from.
**Why it fails**: Teams under pressure to "hit velocity" predictably inflate point estimates over time, which makes the number rise without any actual increase in delivered value — the metric becomes actively misleading exactly when leadership is relying on it most.

**Mistake**: Ignoring a flattening burndown until the last day or two of the sprint.
**Why it fails**: By the time it's obvious the sprint will miss, there's no time left to make a deliberate scope tradeoff — the team either ships something rushed or slips silently, both worse than an earlier, calmer replanning conversation.

## Advanced Usage

### Separating estimation error from capacity error

If velocity is consistently below plan, diagnose which: are stories consistently underestimated (an estimation-calibration problem, fixable with better story-sizing practice), or is the team consistently interrupted by unplanned work (a [bandwidth](./managing-team-bandwidth.md) problem)? The fixes are different, and conflating them leads to fixing the wrong thing.

### Using velocity data in external commitments

When a stakeholder needs a date, translate velocity into a probabilistic statement rather than a single date: "based on our last 6 sprints, we're 80% confident this ships within 3-4 sprints" is both more honest and, delivered well, more credible than a single confident date that then slips.

## Scenarios & How to Respond

**Scenario: A stakeholder asks for a hard delivery date based on the team's velocity.**
Audience & tone: Stakeholder — pragmatic, reassuring, honest about the range, per [Adapting Communication Tone by Audience](../../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md).
Response: Give a range with confidence framing rather than a single number pretending to be precise: "Based on our last several sprints, we're confident this lands within 3-4 sprints — if you need a single date for planning, I'd anchor on the 4-sprint mark to stay safe."

**Scenario: The team's velocity drops sharply for one sprint and a peer manager asks what happened.**
Audience & tone: Peer manager — collaborative, transparent, no defensiveness.
Response: Share the specific cause plainly rather than letting the number speak for itself: "We had an on-call surge that took two engineers most of the week — velocity dropped as a direct result, not a sign of a broader issue. Should be back to baseline next sprint."

**Scenario: A direct report is under pressure and starts padding story-point estimates to look like they're hitting velocity targets.**
Audience & tone: Direct report — supportive, addressing the underlying pressure, not just the symptom.
Response: Name what you're noticing gently and ask why: "I've noticed estimates have been trending up on similar work — is there pressure to hit a specific velocity number that's driving that?" Fix the underlying pressure (often coming from how velocity is being used above you) rather than just asking them to estimate "more honestly," which doesn't address the incentive causing the padding.

## See Also

- [Managing Team Bandwidth](./managing-team-bandwidth.md)
- [Planning Around Cross-Functional Dependencies](./planning-around-cross-functional-dependencies.md)
- [Pitching Refactoring Sprints to Non-Technical Leaders](../technical-debt-vs-feature-velocity/pitching-refactoring-sprints-to-non-technical-leaders.md)
- [Adapting Communication Tone by Audience](../../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Managing Team Bandwidth, Planning Around Cross-Functional Dependencies, Pitching Refactoring Sprints to Non-Technical Leaders
