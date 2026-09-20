---
title: "SLOs & Error Budgets Cheat Sheet"
description: "Key takeaways for defining SLOs, tracking error budgets, and building burn-rate alerts that don't cry wolf."
tags: [sre, observability, cheat-sheet]
hide_table_of_contents: true
---

# SLOs, error budgets & alerting — key takeaways

Highlights from the article, condensed. For the full reasoning and dashboard
layout, read [the article](/articles/sre-observability-slos-practical-guide).

<a class="topic-crosslink" href="/articles/sre-observability-slos-practical-guide">📖 Full article: SRE Observability & SLOs →</a>

<TenMinute minutes={5}>

1. Begin with the **Start with SLIs, not dashboards** card
2. Then the **SLO → error budget** and **Common SLO mistakes** cards
3. Treat the other 4 cards as lookups — scan by card title when you need one
4. Open the [full article](/articles/sre-observability-slos-practical-guide) when a card isn't enough

</TenMinute>

<div class="cheat-sheet cheat-sheet--sre">

<div class="cheat-card">

#### Start with SLIs, not dashboards

Pick 2-3 signals that reflect real user experience: **availability**
(success rate), **latency** (e.g. p99 < 500ms), **correctness**. More than
that and you're measuring noise.

</div>

<div class="cheat-card">

#### SLO → error budget

```
SLO: 99.9% success over a 30-day rolling window
→ error budget = 43.2 minutes of allowed downtime/month
```

Base the target on what users tolerate, not engineering aspiration — measure
current performance for 2-4 weeks before committing to a number.

</div>

<div class="cheat-card">

#### Common SLO mistakes

- Setting SLOs too high (99.99% on an internal tool burns out on-call)
- Setting a target without baseline data first
- Ignoring the denominator — 99.9% means different things at 100 req/day vs 10M

</div>

<div class="cheat-card">

#### Tracking with Prometheus

```promql
sum(rate(http_requests_total{status=~"2.."}[30d]))
/ sum(rate(http_requests_total[30d]))
```

Error budget consumption approaching 1.0 → slow down feature releases,
focus on reliability.

</div>

<div class="cheat-card">

#### Multi-window, multi-burn-rate alerts

| Severity | Burn rate | Windows | Action |
|---|---|---|---|
| Page (wake up) | 14.4x | 1h + 5m | immediate |
| Page (urgent) | 6x | 6h + 30m | within 30 min |
| Ticket | 3x | 1d + 2h | business hours |
| Ticket | 1x | 3d + 6h | next sprint |

Dual-window (long + short) avoids paging on brief self-resolving spikes.

</div>

<div class="cheat-card">

#### Error budget policy

- **>50% remaining** — ship freely
- **20-50%** — rollback plans required
- **&lt;20%** — feature freeze, reliability only
- **exhausted** — full stop on non-reliability work

Makes reliability a concrete, negotiable constraint instead of a vague goal.

</div>

<div class="cheat-card">

#### Key takeaways

Measure what matters to users, not what's easy to instrument. Set SLOs from
real data. Alert on burn rate, not raw thresholds. Make error budgets a
shared language between product and engineering.

</div>

</div>

---

<Exercises>
<Exercises.Task title="Work out what each alert row costs in budget" level="intermediate" stretch="Explain why the 3x and 1x rows are tickets while the 14.4x row pages.">

For a 99.9% SLO over 30 days, calculate how much of the monthly error budget is consumed by each burn rate held for its long window in the alert table: 14.4x for 1 hour, 6x for 6 hours, 3x for 1 day, and 1x for 3 days. The month is 720 hours, so consumption is the burn rate times the hours, divided by 720.

**Done when:** you get 2%, 5%, 10%, and 10%, and you can say why each alert is sized to catch a fixed slice of the budget rather than a fixed error rate.

</Exercises.Task>
<Exercises.Task title="Write and validate the fast-burn alert" level="advanced">

Write the 14.4x fast-burn rule for a 99.9% SLO as a Prometheus alert with both a long (1 hour) and a short (5 minute) window. Save it as `slo.rules.yml` and check it with `promtool`, which ships with Prometheus:

```yaml
groups:
  - name: api-slo-burn-rate
    rules:
      - alert: ApiErrorBudgetFastBurn
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[1h])) / sum(rate(http_requests_total[1h])) > (14.4 * 0.001)
          )
          and
          (
            sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > (14.4 * 0.001)
          )
        for: 2m
        labels:
          severity: page
        annotations:
          summary: "Error budget burning 14.4x too fast (99.9% SLO)"
```

```bash
promtool check rules slo.rules.yml
```

**Done when:** `promtool` reports `SUCCESS: 1 rules found`. Then delete one closing bracket and confirm `promtool` fails with a parse error, and explain why the rule needs both windows.

</Exercises.Task>
</Exercises>

<CaseStudy title="Paged at 3am by a two-minute blip">
<CaseStudy.Context>

*Illustrative scenario.* An alert pages the on-call engineer whenever the error rate is high over a single short window. A brief dependency hiccup lasting two minutes wakes someone at 3am, and by the time they look, everything has recovered.

</CaseStudy.Context>
<CaseStudy.WhatHappened>

The alert could not tell a short self-resolving spike from a sustained problem. After several of these, the rotation started treating pages as noise, which made a later genuine incident easier to miss.

</CaseStudy.WhatHappened>
<CaseStudy.Lesson>

Pair a long window that confirms the burn is sustained with a short window that confirms it is still happening. That dual-window alert pages on real budget risk, clears promptly when the problem stops, and ignores brief blips.

</CaseStudy.Lesson>
</CaseStudy>

<AISpark>

- Ask an assistant to turn a static error-rate alert into a multi-window burn-rate rule for your SLO, then recompute the multiplier and check it with `promtool` before deploying.
- Have it draft an error budget policy with thresholds, and adjust them yourself to what your product and engineering leads will actually agree to.
- Ask it to list which SLIs to track for a described service, then keep only the two or three that reflect what users experience.

</AISpark>
