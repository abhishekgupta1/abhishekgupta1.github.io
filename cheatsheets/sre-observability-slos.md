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
