---
title: "OpenTelemetry: The Complete Guide"
description: "End-to-end reference for OpenTelemetry — traces, metrics, logs, SDK/Collector architecture, instrumentation, sampling, and interview-ready Q&A."
sidebar_position: 1
tags: [opentelemetry, observability, sre, tracing, metrics]
---

# OpenTelemetry — The Complete Guide

A single-read, end-to-end reference for OpenTelemetry (OTel): enough to
instrument a new service, design a Collector pipeline, or walk into an SRE
interview. Organized as a lookup you can also read top-to-bottom.

---

## 1. What OpenTelemetry Is and Why It Exists

OpenTelemetry is a **CNCF-hosted, vendor-neutral standard** (APIs, SDKs,
data formats, and a Collector) for generating, collecting, and exporting
**traces, metrics, and logs** — collectively "telemetry" — from your
applications and infrastructure.

It formed by merging two earlier CNCF projects: **OpenTracing** (distributed
tracing API) and **OpenCensus** (Google's stats + tracing library). The
merger's goal: stop forcing engineers to choose an instrumentation library
that locks them to one backend (Jaeger vs. Zipkin vs. Datadog vs. New Relic).

### The core value proposition

> **Instrument once, export anywhere.**

You instrument your code against OTel's vendor-neutral API. Where the data
*goes* (Jaeger, Prometheus, Datadog, Honeycomb, Grafana Tempo/Loki/Mimir,
Splunk, etc.) is a **Collector/exporter configuration decision**, not a
code change. Swapping observability vendors no longer means re-instrumenting
every service.

### The three pillars (signals)

| Signal | What it captures | Answers |
|---|---|---|
| **Traces** | The path of a single request across services, as a tree of timed spans | "Where did this specific slow/failed request spend its time?" |
| **Metrics** | Aggregated numeric measurements over time (counters, gauges, histograms) | "What's the overall error rate / p99 latency / throughput right now?" |
| **Logs** | Discrete timestamped event records, structured or unstructured | "What exactly happened at this moment, in detail?" |

OTel's differentiator is **correlating** these three — a trace ID embedded in
your logs and linked from your metrics lets you pivot from "latency spiked"
(metric) → "here are the slow traces" (trace) → "here's the exact error
stack" (log) without leaving your observability tool.

---

## 2. Core Concepts by Signal

### 2.1 Traces

- **Span** — a single timed unit of work (e.g., "handle HTTP request",
  "query database", "call payment-service"). Has a name, start/end time,
  attributes (key-value metadata), events (timestamped log-like points
  within the span), and a status (OK/Error).
- **Trace** — a tree/DAG of spans sharing a single **Trace ID**, representing
  one end-to-end request across however many services it touched.
- **SpanContext** — the propagated identifiers (`trace_id`, `span_id`,
  `trace_flags`) that let a downstream service attach its spans to the same
  trace as the upstream caller.
- **Parent/child spans** — a span created inside another span's scope becomes
  its child, building the trace tree.

```
Trace (trace_id=abc123)
└─ span: HTTP GET /checkout        (gateway-service)     120ms
    ├─ span: validate-cart          (cart-service)        15ms
    ├─ span: charge-card            (payment-service)     80ms
    │    └─ span: POST stripe.com                          70ms
    └─ span: send-confirmation      (notification-service) 10ms
```

### 2.2 Context Propagation

The mechanism that stitches spans across process/service boundaries. The
active `SpanContext` is injected into outgoing request headers (HTTP, gRPC
metadata, message queue headers) and extracted on the receiving side so the
new span becomes a child of the caller's span.

- **W3C Trace Context** (`traceparent`, `tracestate` headers) — the modern
  default standard, interoperable across vendors.
- Legacy formats you'll still encounter: **B3** (Zipkin-originated,
  `X-B3-TraceId` etc.), Jaeger's own propagation format.

```
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
             ^^ version  ^^^^^^^^^^^ trace-id ^^^^^^^^^^^^  ^^ span-id ^^  ^^ flags
```

Propagation must be consistent across every hop — one service using B3 while
downstream expects W3C breaks trace continuity (you'll see disconnected
"orphan" traces).

### 2.3 Metrics

- **Counter** — monotonically increasing value (`http_requests_total`).
- **UpDownCounter** — can increase or decrease (`active_connections`).
- **Gauge** — a point-in-time value (`cpu_temperature`).
- **Histogram** — distribution of values into buckets (`http_request_duration_seconds`) — essential for percentile latency (p50/p95/p99).
- **Asynchronous instruments** (`ObservableGauge`, etc.) — pulled on-demand via callback instead of pushed inline with request handling, good for system-level metrics (memory, queue depth).

### 2.4 Logs

OTel's logging model wraps existing logs (structured JSON, plain text) with a
common `LogRecord` schema and — critically — **automatically attaches the
active trace/span ID** to each log line emitted during a traced operation.
This is what enables "click a slow trace → jump straight to its logs" in
tools like Grafana or Datadog.

### 2.5 Resource & Semantic Conventions

- **Resource** — metadata identifying *what* produced the telemetry:
  `service.name`, `service.version`, `deployment.environment`,
  `k8s.pod.name`, `cloud.region`, etc. Attached once per process, applied to
  everything it emits.
- **Semantic Conventions** — a standardized attribute-naming spec (e.g.
  `http.request.method`, `db.system`, `messaging.destination.name`) so a
  span from a Python service and one from a Java service use the *same*
  field names — critical for dashboards/queries to work uniformly across a
  polyglot fleet.

---

## 3. Architecture: API, SDK, and Collector

```
┌─────────────────────────────┐
│   Your Application Process   │
│                              │
│  OTel API  (no-op if unconf.)│  ← what your code calls
│      │                      │
│  OTel SDK  (impl + config)   │  ← sampling, batching, resource, processors
│      │                      │
│  Exporter (OTLP)              │
└──────────┼───────────────────┘
           │ OTLP (gRPC/HTTP)
           ▼
┌─────────────────────────────┐
│   OpenTelemetry Collector     │
│  Receivers → Processors → Exporters │
└──────────┼───────────────────┘
           │
           ▼
   Backends: Jaeger / Tempo / Prometheus / Mimir /
   Loki / Datadog / Honeycomb / Splunk / etc.
```

- **API** — the interface your application code depends on (`tracer.start_span(...)`). Stable, minimal, and a **no-op by default** if no SDK is registered — so libraries can instrument themselves without forcing a dependency on any specific telemetry backend.
- **SDK** — the actual implementation: sampling logic, span/metric processors, batching, resource detection. You configure the SDK once at app startup.
- **Exporter** — serializes and ships telemetry out, typically via **OTLP** (OpenTelemetry Protocol, gRPC or HTTP/protobuf) — the standard wire format. Vendor-specific exporters (Jaeger, Zipkin, Prometheus remote-write) also exist for direct-to-backend shipping without a Collector.
- **Collector** — a standalone, vendor-agnostic proxy/pipeline process (deployed as agent, sidecar, or gateway) that receives, processes, and re-exports telemetry. Decouples "how my app emits data" from "where it ultimately lands."

### Why use a Collector instead of exporting straight from the app?

- Change backends (or add a second one) via **config, zero code redeploys**.
- Centralize **batching, retries, PII scrubbing, sampling** — instead of duplicating that logic in every service/language.
- Buffer telemetry so a backend outage doesn't back-pressure your application.
- **Fan-out** — send the same data to two backends simultaneously (e.g., migrating vendors).

---

## 4. Instrumentation: Auto vs. Manual

### Auto-instrumentation
Language agents/packages that patch common libraries (HTTP frameworks, DB
drivers, message queues) to emit spans/metrics with zero code changes.

```bash
# Python example
opentelemetry-bootstrap -a install
opentelemetry-instrument --traces_exporter otlp --metrics_exporter otlp \
  python app.py
```

```bash
# Java example — attach a javaagent at startup
java -javaagent:opentelemetry-javaagent.jar \
     -Dotel.service.name=checkout-service \
     -Dotel.exporter.otlp.endpoint=http://collector:4317 \
     -jar app.jar
```

Auto-instrumentation gets you HTTP server/client spans, DB query spans, and
basic metrics essentially for free — the fastest path to baseline coverage.

### Manual instrumentation
For business-meaningful spans/attributes auto-instrumentation can't know
about:

```python
from opentelemetry import trace

tracer = trace.get_tracer("checkout-service")

def charge_card(order):
    with tracer.start_as_current_span("charge-card") as span:
        span.set_attribute("order.id", order.id)
        span.set_attribute("payment.provider", "stripe")
        try:
            result = stripe_client.charge(order.total)
            span.set_attribute("payment.status", "success")
            return result
        except PaymentError as e:
            span.record_exception(e)
            span.set_status(trace.StatusCode.ERROR, str(e))
            raise
```

```python
from opentelemetry import metrics

meter = metrics.get_meter("checkout-service")
orders_counter = meter.create_counter("orders.processed")
checkout_latency = meter.create_histogram("checkout.duration.ms")

orders_counter.add(1, {"payment.provider": "stripe"})
```

**Best practice:** use auto-instrumentation for baseline coverage, add manual
spans/attributes only where they carry business meaning (order ID, tenant
ID, feature flag state) that generic library instrumentation can't infer.

---

## 5. Sampling

Capturing every trace at scale is often too expensive (storage + backend
cost). Sampling decides what to keep.

| Strategy | How it works | Trade-off |
|---|---|---|
| **Head-based (probabilistic)** | Decide at trace start (e.g., keep 10%), decision propagates to all child spans | Cheap, simple, but may drop the one trace representing a rare failure |
| **Tail-based** | Buffer complete traces at the Collector, then decide based on outcome (keep all errors + slow traces + a sample of the rest) | Never miss an error/slow trace, but requires buffering full traces (memory/complexity cost), and needs all spans routed to the same Collector instance |
| **Rate-limiting** | Cap spans/sec regardless of traffic spikes | Protects backend cost predictably; can silently drop signal during incidents (ironic timing) |

Tail-based sampling is usually implemented in the **Collector**, not the SDK,
since it needs to see the whole trace before deciding.

---

## 6. The OpenTelemetry Collector in Depth

Configured as a **pipeline**: `receivers → processors → exporters`, per
signal type.

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  prometheus:
    config:
      scrape_configs:
        - job_name: 'app'
          scrape_interval: 15s
          static_configs:
            - targets: ['app:9090']

processors:
  batch: {}                         # batch before export — reduces network overhead
  memory_limiter:
    limit_mib: 512                  # protect the Collector itself from OOM
  resourcedetection:
    detectors: [env, ec2, k8snode]  # auto-tag with cloud/k8s metadata
  attributes:
    actions:
      - key: user.email
        action: delete              # scrub PII before it leaves the cluster
  tail_sampling:
    policies:
      - name: errors
        type: status_code
        status_code: { status_codes: [ERROR] }
      - name: slow-traces
        type: latency
        latency: { threshold_ms: 500 }
      - name: sample-the-rest
        type: probabilistic
        probabilistic: { sampling_percentage: 5 }

exporters:
  otlp/tempo:
    endpoint: tempo:4317
  prometheusremotewrite:
    endpoint: http://mimir:9009/api/v1/push
  loki:
    endpoint: http://loki:3100/loki/api/v1/push

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, resourcedetection, attributes, tail_sampling, batch]
      exporters: [otlp/tempo]
    metrics:
      receivers: [otlp, prometheus]
      processors: [memory_limiter, batch]
      exporters: [prometheusremotewrite]
    logs:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [loki]
```

### Deployment patterns

| Pattern | Description | When to use |
|---|---|---|
| **Agent** (sidecar/DaemonSet) | One Collector per host/pod, close to the app | Local buffering, resource tagging, low-latency handoff; scales with your fleet |
| **Gateway** | Central Collector cluster all agents forward to | Central sampling policy (esp. tail-based), central PII scrubbing, single fan-out point to backends |
| **Agent + Gateway (both)** | Agents do local enrichment/buffering, forward to a gateway tier for sampling/routing | Most common in production at scale |

---

## 7. Correlating the Three Pillars

The payoff of adopting OTel across the board is **exemplars and trace-log
correlation**:

- **Metrics → Traces**: Prometheus/Mimir "exemplars" attach a sample trace ID
  to a histogram bucket, so a latency spike on a dashboard links directly to
  an actual slow trace that fell in that bucket.
- **Traces → Logs**: because the SDK injects `trace_id`/`span_id` into the
  logging context automatically, log backends (Loki, Elastic) can filter "all
  logs for this trace" instantly.
- **Logs → Traces**: reverse lookup — from an error log line, jump to the
  full distributed trace it was part of.

This loop — **metric alerts you → trace shows where → logs show why** — is
the practical reason OTel-based observability stacks (Grafana LGTM: Loki,
Grafana, Tempo, Mimir; or Datadog/Honeycomb equivalents) outperform three
disconnected tools.

---

## 8. Common Backends & How OTel Plugs In

| Backend | Signal(s) | Notes |
|---|---|---|
| **Jaeger** | Traces | Original distributed tracing UI; accepts OTLP natively now |
| **Grafana Tempo** | Traces | Object-storage-backed, designed for OTel-native ingestion |
| **Prometheus / Mimir** | Metrics | Pull-based (Prometheus) vs. push/remote-write (Mimir) at scale |
| **Grafana Loki** | Logs | Label-indexed, low-cost log aggregation |
| **Datadog / New Relic / Honeycomb / Splunk** | All three | Accept OTLP directly — vendor lock-in reduced to a config endpoint change |
| **Zipkin** | Traces | Legacy but still OTLP-compatible |

---

## 9. Common Pitfalls & Debugging

- **Broken trace continuity** — a service in the call chain doesn't
  propagate context (missing middleware, async job boundary, message queue
  hop without header propagation) → traces fragment into disconnected pieces.
- **Cardinality explosions in metrics** — putting high-cardinality values
  (user ID, order ID, raw URL with path params) as metric *labels* instead of
  span *attributes* — blows up Prometheus/Mimir storage and query cost. Rule
  of thumb: **unbounded values belong on spans/logs, not metric labels.**
  Use route templates (`/orders/{id}`) not raw paths for HTTP metric labels.
- **Over-sampling cost vs. under-sampling blind spots** — pure head-based
  sampling at a flat 1% can mean the one trace behind a critical bug never
  gets captured; tail-based sampling on errors/latency avoids this but costs
  more Collector resources.
- **Missing `service.name`** — telemetry with no resource attributes is
  nearly unusable in a multi-service environment; always set it explicitly
  even when relying on auto-instrumentation.
- **Collector memory pressure** — always configure `memory_limiter` as the
  *first* processor; otherwise a traffic spike can OOM-kill the Collector and
  silently drop all telemetry during the exact incident you need visibility into.
- **Clock skew** across hosts can make spans appear to start before their
  parent — NTP hygiene matters for trace tree correctness.

---

## 10. Interview-Ready Q&A

**Q: What problem does OpenTelemetry actually solve?**
A: It decouples instrumentation from the observability backend. Before OTel,
adopting Datadog vs. Jaeger vs. New Relic meant instrumenting your code
against that vendor's SDK; switching vendors meant re-instrumenting
everything. OTel gives one vendor-neutral API/SDK, and the destination is a
Collector config decision.

**Q: Explain the difference between the OTel API and SDK.**
A: The API is the stable interface application code and libraries call
(`start_span`, `create_counter`); it's a no-op until an SDK is registered.
The SDK is the actual implementation — sampling, batching, exporters,
resource attribution — configured once at process startup. This split lets
library authors instrument their code without forcing a specific backend
dependency on consumers.

**Q: When would you choose tail-based sampling over head-based?**
A: When you need to guarantee errors and slow requests are never dropped,
which head-based (decided before the outcome is known) can't guarantee.
Tail-based costs more — it requires buffering full traces at a Collector
gateway until the outcome is known — but it's the only way to sample
intelligently by outcome rather than randomly.

**Q: Why not put `user_id` as a metric label?**
A: High-cardinality labels multiply the number of unique time series a
metrics backend has to store and index — with millions of users this can
explode storage/query cost and even crash the backend. High-cardinality data
belongs in span attributes or log fields, which are designed for that; it
can then be correlated to metrics via exemplars/trace IDs instead.

**Q: A trace is missing a hop — one service's spans aren't connecting to the
caller's trace. What's your first hypothesis?**
A: Context propagation is broken at that hop — most commonly, the
intermediate call is async (background job, message queue) and isn't
injecting/extracting trace headers, or two services disagree on propagation
format (one on W3C Trace Context, another still on B3). Check the outgoing
headers first, then confirm both sides use the same propagator.

**Q: Why deploy an OpenTelemetry Collector instead of exporting directly from
each app to the backend?**
A: Centralizes cross-cutting concerns — batching, retries, PII scrubbing,
tail-based sampling, and backend fan-out — in one place instead of
duplicating that logic per service/language, and it decouples "where
telemetry goes" from application code so backend migrations don't require
redeploying every service.

**Q: How do metrics, traces, and logs work together in practice during an
incident?**
A: A metric dashboard/alert shows *that* something's wrong (e.g., p99
latency spike); an exemplar or dashboard drill-down surfaces a representative
slow *trace* showing *where* time was spent across services; the trace's
`trace_id`, automatically attached to log lines emitted during that request,
lets you pull the exact *logs* explaining *why* — end to end without
manually correlating timestamps across three separate tools.

---

## 11. One-Line Summary

**OpenTelemetry standardizes how traces, metrics, and logs are generated and
correlated — instrument once against a vendor-neutral API/SDK, route data
through a Collector, and change backends via config instead of code.**
