---
slug: sre-observability-slos-practical-guide
title: "SLOs, Error Budgets, and Alerting: A Practical SRE Observability Guide"
date: 2025-02-05
authors: [abhishek]
tags: [sre, observability, reliability]
description: "How to define meaningful SLOs, implement error budgets, and build alerting that reduces noise while catching real incidents."
image: "/img/og-image.png"
---

Most teams start their observability journey by throwing metrics at a dashboard and hoping the right alert fires at the right time. That approach leads to alert fatigue, missed incidents, and on-call engineers who dread their rotation. Here's a more structured way to think about it.

<!-- truncate -->

## Start with SLIs, Not Dashboards

Before you build a single dashboard, define what "working" means for your service. Service Level Indicators (SLIs) are the measurable signals that tell you whether users are having a good experience.

For a typical web service, the SLIs that matter most are:

- **Availability**: Proportion of successful requests (HTTP 2xx/3xx) out of total requests
- **Latency**: Proportion of requests served faster than a threshold (e.g., p99 < 500ms)
- **Correctness**: Proportion of responses that return the expected result

Pick 2-3 SLIs per service. More than that and you're measuring noise.

## Defining SLOs That Actually Mean Something

An SLO is a target for your SLI over a rolling window. The key insight: your SLO should reflect what users actually tolerate, not what engineering aspires to.

```
SLO: 99.9% of requests return successfully over a 30-day rolling window
```

This means you're allowed 43.2 minutes of downtime per month. That's your error budget.

### Common Mistakes

- **Setting SLOs too high**: A 99.99% SLO for an internal tool is overkill and will burn out your on-call team
- **Setting SLOs without data**: Measure your current performance for 2-4 weeks before committing to a target
- **Ignoring the denominator**: An SLO of 99.9% means different things for a service handling 100 requests/day vs. 10 million

## Implementing SLOs with Prometheus

Here's how to track a basic availability SLO in Prometheus:

```promql
# SLI: Success rate over 30 days
sum(rate(http_requests_total{status=~"2.."}[30d]))
/
sum(rate(http_requests_total[30d]))
```

For error budget remaining:

```promql
# Error budget consumption (0 = none used, 1 = fully consumed)
1 - (
  (1 - (
    sum(rate(http_requests_total{status=~"5.."}[30d]))
    /
    sum(rate(http_requests_total[30d]))
  ))
  /
  (1 - 0.999)
)
```

When this value approaches 1.0, your error budget is nearly exhausted. That's when you slow down feature releases and focus on reliability.

## Building Alerts That Don't Cry Wolf

The goal of alerting is simple: wake someone up only when users are impacted and the system can't self-heal.

### Multi-Window, Multi-Burn-Rate Alerts

Instead of alerting on a single threshold, use burn rate alerts that consider how fast you're consuming your error budget:

| Severity | Burn Rate | Short Window | Long Window | Action |
|----------|-----------|-------------|-------------|--------|
| Page (wake up) | 14.4x | 1 hour | 5 minutes | Immediate response |
| Page (urgent) | 6x | 6 hours | 30 minutes | Respond within 30 min |
| Ticket | 3x | 1 day | 2 hours | Fix during business hours |
| Ticket | 1x | 3 days | 6 hours | Plan for next sprint |

A 14.4x burn rate means you'll exhaust your entire 30-day error budget in 2 days if the issue persists. That deserves a page. A 1x burn rate means you're on track to barely miss your SLO — that's a ticket, not a 3 AM wake-up call.

### Prometheus Alerting Rule Example

```yaml
groups:
  - name: slo-alerts
    rules:
      - alert: HighErrorBurnRate
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[1h]))
            / sum(rate(http_requests_total[1h]))
          ) > (14.4 * 0.001)
          and
          (
            sum(rate(http_requests_total{status=~"5.."}[5m]))
            / sum(rate(http_requests_total[5m]))
          ) > (14.4 * 0.001)
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error burn rate — SLO at risk"
          description: "Error rate is consuming the error budget at 14.4x the sustainable rate."
```

The dual-window approach (1h AND 5m) prevents alerting on brief spikes that self-resolve.

## Grafana Dashboard Layout

A well-organized SLO dashboard has three sections:

1. **Current Status**: Big number panels showing current SLI values and error budget remaining. Green/yellow/red thresholds at a glance.

2. **Trend View**: Time-series graphs showing SLI values over the past 30 days. Overlay the SLO target as a horizontal line so deviations are immediately visible.

3. **Drill-Down**: Breakdown by endpoint, region, or customer tier. This is where you go when the top-level numbers look bad and you need to find the root cause.

## The Error Budget Policy

An error budget is only useful if the team agrees on what happens when it's exhausted. Document a policy:

- **Budget remaining > 50%**: Ship features freely, experiment with infrastructure changes
- **Budget remaining 20-50%**: Proceed with caution, require rollback plans for all deployments
- **Budget remaining < 20%**: Feature freeze, focus exclusively on reliability improvements
- **Budget exhausted**: Full stop on non-reliability work until the budget recovers

This turns reliability from a vague aspiration into a concrete, measurable constraint that product and engineering can negotiate around.

## Key Takeaways

- Measure what matters to users, not what's easy to instrument
- Set SLOs based on real data, not aspirations
- Use burn-rate alerting to reduce noise while catching real incidents
- Make error budgets a shared language between product and engineering

The shift from "monitor everything" to "measure what matters" is the single biggest improvement most teams can make to their observability practice.
