---
title: "MLOps: Deploying Models to Production"
description: "A model shipping to production needs everything a normal service needs (CI/CD, monitoring, rollback) plus model-specific concerns a normal service doesn't: data/concept drift (the world changes, the model doesn't), training-serving skew (the model behaves differently in productio"
sidebar_position: 1
tags: [product-management, tpm, mba]
---

# MLOps: Deploying Models to Production

**Type**: Workflow
**Difficulty**: ⭐⭐⭐⭐ (Advanced)
**Domain**: Technical Product Management & Product Strategy
**Concept Group**: AI & Data Product Strategy
**Created**: 2026-08-18
**Tags**: mlops, machine-learning, model-deployment, model-monitoring

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 320" role="img" aria-labelledby="mm-mlops-title mm-mlops-desc">
<title id="mm-mlops-title">The model lifecycle as a closed loop</title>
<desc id="mm-mlops-desc">A model cycles through training and validation, deployment to production, ongoing monitoring for drift and skew, and retraining on a planned cadence or trigger, which feeds back into training again — unlike normal code, the model can fail silently with no exception thrown.</desc>
<defs>
  <marker id="mm-mlops-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="290" y="16" width="200" height="60" rx="10"/>
<text class="mm-node-title" x="390" y="41" text-anchor="middle">Train &amp; validate</text>
<text class="mm-node-sub" x="390" y="57" text-anchor="middle">check training-serving parity</text>

<path class="mm-arrow" d="M480,50 C560,60 590,90 580,128" marker-end="url(#mm-mlops-arrow)"/>

<rect class="mm-n2" x="560" y="132" width="200" height="60" rx="10"/>
<text class="mm-node-title" x="660" y="157" text-anchor="middle">Deploy to production</text>
<text class="mm-node-sub" x="660" y="173" text-anchor="middle">CI/CD, monitoring, rollback</text>

<path class="mm-arrow" d="M660,192 C650,225 520,245 500,248" marker-end="url(#mm-mlops-arrow)"/>

<rect class="mm-n4" x="290" y="244" width="200" height="60" rx="10"/>
<text class="mm-node-title" x="390" y="269" text-anchor="middle">Monitor for drift</text>
<text class="mm-node-sub" x="390" y="285" text-anchor="middle">input, feature, outcome</text>

<path class="mm-arrow" d="M290,262 C210,245 90,225 80,192" marker-end="url(#mm-mlops-arrow)"/>

<rect class="mm-n5" x="20" y="132" width="200" height="60" rx="10"/>
<text class="mm-node-title" x="120" y="157" text-anchor="middle">Retrain</text>
<text class="mm-node-sub" x="120" y="173" text-anchor="middle">planned cadence or trigger</text>

<path class="mm-arrow" d="M100,132 C90,90 200,55 290,46" marker-end="url(#mm-mlops-arrow)"/>

<text class="mm-flow-label" x="390" y="120" text-anchor="middle">a model fails silently — no exception, just quiet accuracy decay</text>
</svg>

<p class="mental-model__caption">A production model runs as a closed loop, not a one-off handoff: train and validate it, deploy it with the same rigor as any service, monitor it continuously for drift because it can degrade without ever throwing an error, and retrain it on a cadence decided in advance rather than only after something breaks.</p>
</div>

## Quick Reference

A model shipping to production needs everything a normal service needs (CI/CD, monitoring, rollback) **plus** model-specific concerns a normal service doesn't: **data/concept drift** (the world changes, the model doesn't), **training-serving skew** (the model behaves differently in production than in the notebook it was validated in), and **a retraining cadence** decided in advance, not reactively after performance degrades.

## What is it?

MLOps is the discipline of running the full lifecycle of a machine learning model — training, validation, deployment, monitoring, and retraining — as a reliable, repeatable operational practice, rather than a one-off data science project that gets "thrown over the wall" to engineering. The core insight that differentiates it from normal software ops: a model can fail silently. Code either works or throws an error; a model can keep returning confident, plausible-looking predictions while its actual accuracy quietly degrades, with no exception ever thrown.

## When to Use

- Taking a model from a data scientist's notebook to a production-serving system for the first time
- Designing the monitoring and alerting strategy for a model already in production
- Deciding how often a model needs retraining, and what triggers an off-cycle retrain
- Diagnosing a case where a model "worked in testing" but underperforms once live

## Detailed Example

Deploying a churn-prediction model that decides which customers get a retention outreach:

```
Step 1 — Validate training-serving parity before launch
  Check: does the exact same feature-computation code run in both
  training and production, or was production built as a separate
  reimplementation?
  Finding: production recomputes a "days since last login" feature
  slightly differently (timezone handling differs) — a subtle skew
  that would silently degrade predictions. Fixed by sharing the
  same feature-computation code path in both environments.

Step 2 — Define production monitoring, not just training metrics
  Training metric: AUC 0.84 on validation set (backward-looking,
  measured once)
  Production monitors (ongoing):
    - Prediction distribution drift: is the model suddenly predicting
      "high churn risk" for a very different % of customers than
      historically? (proxy for input drift, checked daily)
    - Feature drift: are input feature distributions shifting from
      what the model was trained on? (e.g., a product change alters
      typical usage patterns)
    - Downstream outcome tracking: of customers flagged high-risk,
      what fraction actually churned, tracked with a lag (since the
      real outcome isn't known immediately)

Step 3 — Set a retraining cadence and trigger
  Scheduled: retrain monthly regardless, since usage patterns
    naturally shift
  Triggered: retrain immediately if prediction-distribution drift
    exceeds a set threshold, rather than waiting for the next
    scheduled cycle

Step 4 — Plan rollback
  Keep the previous model version deployable behind a flag — if the
  new model's live performance (via outcome tracking) looks worse
  than the old one after a defined observation window, roll back
  rather than waiting for a full retrain cycle to fix it.
```

## Key Takeaways

- 💡 A model can degrade with zero errors thrown — production monitoring needs to track prediction and outcome distributions specifically, not just standard uptime/error-rate metrics
- 🔥 Training-serving skew (the model behaving differently live than in validation) is one of the most common and hardest-to-detect production ML failures — sharing feature-computation code between training and serving is the most reliable fix
- ⚠️ Don't treat a strong offline validation metric (AUC, accuracy) as sufficient evidence the model will perform well live — it only tells you the model worked on historical data resembling training data, not that it will keep working as the world changes
- ✅ Always keep a rollback path to the previous model version — treat model deployments with the same reversibility discipline as any other production deployment, not as a one-way research artifact
- ⚡ Decide the retraining cadence and drift-trigger thresholds before launch, not reactively after someone notices degraded performance — reactive retraining means the business already absorbed a period of bad predictions before anyone caught it

## Common Mistakes

**Mistake**: Treating "the model is deployed" as the finish line rather than the start of an ongoing operational responsibility.
**Why it fails**: Models degrade over time as the world drifts from training conditions — without ongoing monitoring and a retraining plan, a model that was accurate at launch can be quietly wrong months later with no one noticing until a downstream business metric suffers.

**Mistake**: Letting production feature computation diverge from training feature computation over time (e.g., a bug fix applied to one but not the other).
**Why it fails**: This training-serving skew silently degrades predictions without any visible error — it's one of the most common root causes of "the model works in testing but not in production" and is often invisible without specific parity checks.

## Advanced Usage

### Shadow deployment before full rollout

Run a new model version alongside the current one in production, logging its predictions without acting on them, to compare real-world behavior before fully switching over — this catches training-serving skew and unexpected live behavior before it affects any actual decision.

### Connecting model monitoring to product metrics

Model-level metrics (drift, accuracy) should ultimately tie back to a [product metric](../product-vision-execution/north-star-product-metrics.md) that matters to the business (e.g., churn-model accuracy tied to actual retention rate) — a model can look statistically healthy while having no measurable effect on the business outcome it was built for, which is a signal the model (or its integration into the product) needs rethinking, not just retraining.

## Scenarios & How to Respond

**Scenario: A data scientist wants to ship a model straight from a notebook with no production monitoring plan.**
Audience & tone: Direct report — supportive, developmental, coaching toward the operational gap rather than blocking outright, per [Adapting Communication Tone by Audience](../../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md).
Response: "The offline results look strong — what's our plan for knowing if it's still performing well a month from now, once real-world data starts drifting from what it was trained on?" Use the question to surface the missing monitoring plan rather than dictating a checklist unprompted.

**Scenario: A stakeholder asks why a well-performing model in testing produced a bad business outcome once live.**
Audience & tone: Stakeholder — reassuring, pragmatic, translate the technical cause into plain terms.
Response: "The model was accurate on the data it was tested on, but real-world conditions shifted in a way it hadn't seen — that's a known risk with any live model, which is why we monitor for it. Here's the fix and the plan to catch this class of issue faster next time."

**Scenario: Upper management wants to know why the model needs "expensive ongoing maintenance" instead of being a one-time build.**
Audience & tone: Upper management — concise, framed as an operational reality, not an unusual ask.
Response: "Models aren't static like typical software — the world they predict on shifts over time, so ongoing monitoring and periodic retraining is standard practice, the same way we'd patch and monitor any production system. Skipping it risks the model quietly becoming wrong without anyone noticing."

## See Also

- [Generative AI Product Integration](./generative-ai-product-integration.md)
- [Product Analytics & A/B Testing](./product-analytics-a-b-testing.md)
- [North Star & Product Metrics](../product-vision-execution/north-star-product-metrics.md)
- [Adapting Communication Tone by Audience](../../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

**Related Records**: Generative AI Product Integration, Product Analytics & A/B Testing, North Star & Product Metrics
