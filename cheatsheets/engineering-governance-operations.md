---
title: "Engineering Governance & Operations Cheat Sheet"
description: "Quick reference for engineering governance and operations — technical debt, budgeting/FinOps, and capacity planning."
tags: [engineering-governance, mba, cheat-sheet]
hide_table_of_contents: true
---

# Engineering governance & operations cheatsheet

A one-page reference for technical debt, budgeting, and capacity planning.
For the full articles, see the [complete guide](/docs/mba-skills/engineering-governance-operations/technical-debt-vs-feature-velocity/quantifying-technical-debt-with-a-framework).

<a class="topic-crosslink" href="/docs/mba-skills/engineering-governance-operations/technical-debt-vs-feature-velocity/quantifying-technical-debt-with-a-framework">📖 Full guide: Engineering Governance & Operations →</a>

<TenMinute minutes={5}>

1. Begin with the **Quantifying technical debt** card
2. Then the **Pitching refactoring to non-technical leaders** and **Cloud spend & FinOps** cards
3. Treat the other 5 cards as lookups — scan by card title when you need one
4. Open the [full guide](/docs/mba-skills/engineering-governance-operations/technical-debt-vs-feature-velocity/quantifying-technical-debt-with-a-framework) when a card isn't enough

</TenMinute>

<div class="cheat-sheet cheat-sheet--mba">

<div class="cheat-card">

#### Quantifying technical debt

Measure along three axes that map to business cost: velocity drag (how much
slower shipping is in this area), incident frequency, and onboarding
friction for new engineers.

</div>

<div class="cheat-card">

#### Pitching refactoring to non-technical leaders

Pitch it like any investment ask: cost (weeks + opportunity cost), return
(velocity recovered, incidents avoided, in dollars), and the risk of *not*
doing it.

</div>

<div class="cheat-card">

#### Cloud spend & FinOps

Tag everything by team/service so cost is attributable, review monthly
against budget/trend, and right-size before scaling down — most savings come
from eliminating waste, not cutting capacity.

</div>

<div class="cheat-card">

#### Engineering unit economics

Know your team's fully-loaded cost (salary + benefits + overhead, roughly
1.3-1.5x base) and connect it to a business unit of output — cost per
customer, per transaction, or as % of revenue.

</div>

<div class="cheat-card">

#### Team headcount planning

Build the plan backward from roadmap commitments *and* forward from budget
reality — then reconcile the two explicitly instead of picking one.

</div>

<div class="cheat-card">

#### Managing team bandwidth

Plan against effective capacity, not headcount × hours — meetings, on-call,
and context-switching eat a real, measurable chunk of nominal capacity.

</div>

<div class="cheat-card">

#### Cross-functional dependency planning

Map every dependency explicitly before committing to a date: what you need,
from whom, by when — and get that team to confirm it, not just assume it.

</div>

<div class="cheat-card">

#### Sprint velocity & burndowns

Velocity is a measurement, not a target. Use the trailing 3-6 sprint average
to forecast; treat any single sprint's number as noise.

</div>

</div>

---

<Exercises>
<Exercises.Task title="Turn a debt complaint into an investment ask" level="intermediate" stretch="Recompute the incident cost using only the 1.5x loading and say whether your pitch changes.">

An engineer says "the billing module is a mess." The facts: it has two incidents a quarter that each cost 6 engineer-days, changes there take about twice as long as elsewhere, and new hires need about three weeks to become productive in it. A base salary is $120,000, and there are 260 working days a year. Quantify the debt along the sheet's three axes, work out the yearly cost of the incidents, and write a short pitch with cost, return, and the risk of not acting.

**Done when:** you show a fully loaded cost of $156,000 to $180,000 a year (1.3 to 1.5 times base), about $600 to $692 per engineer-day, and yearly incident cost of about $28,800 to $33,200 from 48 engineer-days, and your pitch states cost in weeks plus opportunity cost, return in dollars, and what happens if nothing is done.

</Exercises.Task>
<Exercises.Task title="Plan effective capacity, then forecast from velocity" level="advanced">

A team of 8 engineers has a 10-day sprint, so nominal capacity is 80 person-days. Ceremonies and meetings take 15% of that, one engineer spends 5 days on call, one is on leave for 3 days, and context switching costs 10% of what remains. Last three sprints delivered 30, 34, and 28 points.

**Done when:** you calculate effective capacity as 54 person-days, about 68% of nominal, forecast with the trailing three-sprint average of about 30.7 points instead of the best sprint, and can say why a single sprint's number is noise and why velocity is a measurement, not a target.

</Exercises.Task>
</Exercises>

<CaseStudy title="The date that depended on a promise nobody confirmed">
<CaseStudy.Context>

*Illustrative scenario.* A team commits to a launch date. The plan quietly assumes that a platform team will deliver an API in week four, based on a hallway conversation.

</CaseStudy.Context>
<CaseStudy.WhatHappened>

The platform team had other commitments and had never agreed to that date. The API arrived three weeks late, and the launch slipped with it. Nobody had written the dependency down, so nobody had been tracking it.

</CaseStudy.WhatHappened>
<CaseStudy.Lesson>

Map every dependency before committing to a date: what you need, from whom, and by when. Then have that team confirm it, so a shared assumption becomes an actual commitment.

</CaseStudy.Lesson>
</CaseStudy>

<AISpark>

- Ask an assistant to turn a list of complaints about a module into a draft cost-of-debt table, then replace every guessed number with one from your own incident and ticket data.
- Have it stress-test a headcount plan against both the roadmap and the budget, and check that you reconcile the gap explicitly instead of quietly picking one side.
- Ask it to list the cross-team dependencies hidden in a project plan, then get each owning team to confirm them before you rely on any.

</AISpark>
