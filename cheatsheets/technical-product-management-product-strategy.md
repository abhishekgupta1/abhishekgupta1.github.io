---
title: "Technical Product Management Cheat Sheet"
description: "Quick reference for technical product management — roadmapping, product metrics, and AI/data product strategy."
tags: [product-management, mba, cheat-sheet]
hide_table_of_contents: true
---

# Technical product management cheatsheet

A one-page reference for product strategy and AI/data products. For the
full articles, see the [complete guide](/docs/mba-skills/technical-product-management-product-strategy/product-vision-execution/roadmapping-prioritization-frameworks).

<a class="topic-crosslink" href="/docs/mba-skills/technical-product-management-product-strategy/product-vision-execution/roadmapping-prioritization-frameworks">📖 Full guide: Technical Product Management →</a>

<TenMinute minutes={5}>

1. Begin with the **Roadmapping & prioritization** card
2. Then the **Product discovery & user research** and **North Star & product metrics** cards
3. Treat the other 3 cards as lookups — scan by card title when you need one
4. Open the [full guide](/docs/mba-skills/technical-product-management-product-strategy/product-vision-execution/roadmapping-prioritization-frameworks) when a card isn't enough

</TenMinute>

<div class="cheat-sheet cheat-sheet--mba">

<div class="cheat-card">

#### Roadmapping & prioritization

RICE (Reach × Impact × Confidence ÷ Effort) is best for comparing a long
backlog of discrete features on relative value.

</div>

<div class="cheat-card">

#### Product discovery & user research

Interview for past behavior, not future intent — "walk me through the last
time you hit this problem" beats "would you use a feature that...".

</div>

<div class="cheat-card">

#### North Star & product metrics

The North Star Metric is the single measure that best captures customer
value delivered *and* correlates with business success — not a vanity metric
like signups.

</div>

<div class="cheat-card">

#### Product analytics & A/B testing

Write a real hypothesis before testing: "changing X will cause Y because
Z" — not "let's see what happens." Calculate sample size before launching,
not after.

</div>

<div class="cheat-card">

#### Generative AI product integration

Evaluate LLMs on task-specific accuracy, latency, and cost per unit of value
delivered — not benchmark leaderboards alone.

</div>

<div class="cheat-card">

#### MLOps: deploying models to production

A production model needs everything a normal service needs (CI/CD,
monitoring, rollback) plus model-specific concerns: data/concept drift and
training-serving skew.

</div>

</div>

---

<Exercises>
<Exercises.Task title="Rank three features with RICE" level="intermediate" stretch="Change Feature C's confidence to 100% and see whether the ranking changes.">

Score each feature as Reach times Impact times Confidence, divided by Effort:

- Feature A: reach 2,000, impact 2, confidence 80%, effort 4.
- Feature B: reach 500, impact 3, confidence 100%, effort 1.
- Feature C: reach 8,000, impact 0.5, confidence 50%, effort 5.

**Done when:** you get 800, 1,500, and 400, rank B first, and can explain why C's very large reach does not put it on top.

</Exercises.Task>
<Exercises.Task title="Write the hypothesis and size the test before you launch" level="advanced">

You want to test a new checkout button. Write a hypothesis in the form "changing X will cause Y because Z", then work out how many users each group needs to detect an increase in conversion from 10% to 11% with a 5% significance level and 80% power:

```python
from statistics import NormalDist

z = NormalDist().inv_cdf
p1, p2, alpha, power = 0.10, 0.11, 0.05, 0.80
n = (z(1 - alpha / 2) + z(power)) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (p2 - p1) ** 2
print(round(n))
```

**Done when:** your hypothesis names the change, the expected effect, and the reason, the script prints about 14,750 users per group, and you can say why deciding this after the test has started makes the result unreliable.

</Exercises.Task>
</Exercises>

<CaseStudy title="The winner declared on day three">
<CaseStudy.Context>

*Illustrative scenario.* A team launches an A/B test on a new signup flow with no written hypothesis and no planned sample size. They check the dashboard every day.

</CaseStudy.Context>
<CaseStudy.WhatHappened>

On day three the new flow looked ahead, so they stopped the test and shipped it. With so few users the gap was mostly noise, and the change turned out to make no difference over the following weeks. The team had also never agreed in advance what result would count as success.

</CaseStudy.WhatHappened>
<CaseStudy.Lesson>

Write the hypothesis, define success, and calculate the sample size before launching, then wait until you have reached it. Deciding what counts as a win after seeing the data lets noise pass as a result.

</CaseStudy.Lesson>
</CaseStudy>

<AISpark>

- Ask an assistant to turn a feature idea into a testable hypothesis, then check it names a specific change, an expected effect, and a reason.
- Have it compute RICE scores for a backlog from your numbers, and challenge every confidence value that you cannot support with evidence.
- Ask it to compare two LLMs on your own task, then run the comparison on real examples for accuracy, latency, and cost per unit of value, not on a leaderboard.

</AISpark>
