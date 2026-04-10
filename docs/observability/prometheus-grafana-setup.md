---
title: "Getting Started with Prometheus and Grafana"
description: "A practical guide to setting up Prometheus for metrics collection and Grafana for visualization."
sidebar_position: 1
tags: [observability, prometheus, grafana, monitoring]
---

# Getting Started with Prometheus and Grafana

An introductory guide to building an observability stack with Prometheus and Grafana.

## Overview

Prometheus scrapes and stores time-series metrics. Grafana connects to Prometheus as a data source and provides rich dashboards for visualization and alerting.

## Key Concepts

- **Metrics** — Numeric measurements collected over time (counters, gauges, histograms)
- **Targets** — Endpoints that Prometheus scrapes for metrics
- **PromQL** — The query language used to select and aggregate metrics
- **Dashboards** — Grafana panels that visualize PromQL queries

## Basic Setup Steps

1. Install Prometheus and configure `prometheus.yml` with scrape targets
2. Instrument your application to expose a `/metrics` endpoint
3. Install Grafana and add Prometheus as a data source
4. Create dashboards with panels for key SLIs (latency, error rate, throughput)

## Example PromQL Queries

```promql
# Request rate over 5 minutes
rate(http_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

---

*This is a placeholder guide. Replace with your own observability content.*
