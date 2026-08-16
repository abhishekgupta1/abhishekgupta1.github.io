---
title: "Incident Response Mindset"
description: "The internal thought process experienced SREs execute automatically under pressure — USE method, blast radius, mitigation before root cause, and the 5 Whys."
sidebar_position: 3
tags: [sre, incident-response, mindset, use-method, root-cause-analysis]
---

This is not a generic checklist. This is the internal thought process
experienced SREs execute automatically under pressure.

Print this. Memorize it. Practice it.

## Table of Contents

1. [Stabilize Yourself First](#0-stabilize-yourself-first)
2. [Define the Problem Precisely](#1-define-the-problem-precisely)
3. [Is This a Resource Saturation Problem?](#2-is-this-a-resource-saturation-problem)
4. [Is the Process Alive and Healthy?](#3-is-the-process-alive-and-healthy)
5. [Follow the Request Path End-to-End](#4-follow-the-request-path-end-to-end)
6. [Look for Queues](#5-look-for-queues)
7. [Check Recent Changes](#6-check-recent-changes)
8. [Determine Blast Radius](#7-determine-blast-radius)
9. [Mitigation Before Root Cause](#8-mitigation-before-root-cause-if-impact-is-high)
10. [Form a Hypothesis — Then Test It](#9-form-a-hypothesis--then-test-it)
11. [Avoid Common Junior Mistakes](#10-avoid-these-common-junior-mistakes)
12. [Communicate Clearly](#11-communicate-clearly)
13. [Identify the True Root Cause](#12-identify-the-true-root-cause)
14. [Extract Learning After It's Fixed](#13-after-its-fixed--extract-learning)
15. [The Full Mental Flow (Compressed)](#the-full-mental-flow-compressed)
16. [The Senior SRE Mindset](#the-senior-sre-mindset)

---

## 0. Stabilize Yourself First

Before touching anything:

- Slow down.
- Don't restart blindly.
- Don't change multiple things at once.
- Preserve evidence.

**Senior rule**: First understand. Then act.

---

## 1. Define the Problem Precisely

Ask:

- What exactly is failing?
- Since when?
- For whom?
- What changed?

Translate vague alerts into concrete symptoms.

Instead of:
> "Site is down"

Define:
> HTTP 502 from API service in us-east since 02:14 UTC.

Senior SREs reduce ambiguity immediately.

---

## 2. Is This a Resource Saturation Problem?

Always check this first.

Using the **USE method** (from *Systems Performance* by Brendan Gregg), for every resource — CPU, Memory, Disk, Network — ask:

- Utilization high?
- Saturation present (queues building)?
- Errors increasing?

If yes → likely bottleneck. If no → look elsewhere.

---

## 3. Is the Process Alive and Healthy?

Check:

- Is it running?
- Is it listening on the expected port?
- Is it crashing/restarting?
- Is it stuck (D state, zombie, blocked syscall)?

Commands mentally mapped: `ps`, `ss`, `top`, `journalctl`, `lsof`

**Senior mindset**: A running process is not the same as a healthy process.

---

## 4. Follow the Request Path End-to-End

Trace:

```
Client → Load balancer → App → Cache → DB → External API
```

Where does it break? Ask at each hop:

- Can I reach it?
- Is latency added here?
- Are errors generated here?

Senior SREs isolate the failure domain quickly.

---

## 5. Look for Queues

Everything in systems is a queue:

- CPU run queue
- Disk I/O queue
- TCP backlog
- Connection pools
- Thread pools
- Message brokers

If latency increases → something is waiting somewhere.

Ask: **What queue is backing up?**

---

## 6. Check Recent Changes

What changed in:

- Deployments?
- Config?
- Kernel updates?
- Traffic patterns?
- Certificates?
- DNS?

**Senior rule**: 80% of incidents correlate with change.

---

## 7. Determine Blast Radius

Is it:

- Single host?
- Single AZ?
- Whole region?
- All customers or a subset?

This determines response level and escalation urgency.

---

## 8. Mitigation Before Root Cause (If Impact Is High)

If users are down:

- Can we scale horizontally?
- Roll back?
- Restart safely?
- Fail over?
- Reduce traffic?

**Mitigate first. Root cause after stability.**

This principle is core to *Site Reliability Engineering* by Google.

---

## 9. Form a Hypothesis — Then Test It

**Bad SRE**: "I think it's memory" → restarts.

**Senior SRE**:
```
Hypothesis: memory pressure causing OOM
Evidence: dmesg logs show kill
Test: observe memory growth
Confirm → mitigate
```

No guessing. Only falsifiable hypotheses.

---

## 10. Avoid These Common Junior Mistakes

- Restarting before collecting logs
- Changing 3 things at once
- Assuming the alert is accurate
- Ignoring metrics
- Not checking saturation
- Not communicating clearly

---

## 11. Communicate Clearly

During an incident, state:

- What we know
- What we don't know
- What we're doing
- Next update time

Clarity reduces panic more than technical fixes.

---

## 12. Identify the True Root Cause

Not:
> CPU was high.

But:
> CPU was saturated because of unbounded regex in the new release.

Go one layer deeper. Always ask: **Why did this happen?** Then again. Then again. (**5 Whys** technique)

---

## 13. After It's Fixed — Extract Learning

Post-incident, ask:

- What signal did we miss?
- Was the alert actionable?
- Could automation prevent this?
- Was documentation sufficient?
- Did monitoring detect it early enough?

Senior SREs turn incidents into system improvements.

---

## The Full Mental Flow (Compressed)

When the pager goes off:

1. What exactly is broken?
2. Who is affected?
3. Since when?
4. Is any core resource saturated?
5. Is the process alive?
6. Where in the request path does it fail?
7. What changed?
8. What's the smallest safe mitigation?
9. What evidence confirms root cause?
10. How do we prevent recurrence?

---

## The Senior SRE Mindset

They think in:

- Bottlenecks
- Queues
- Backpressure
- Failure domains
- Tradeoffs
- Risk

Not:
> "The app is slow."

But:
> "The DB connection pool is saturated, causing request queue growth."

---

## Key Takeaways

- 💡 First understand, then act — never restart blindly before preserving evidence.
- 🔥 Check resource saturation (USE method) before anything else.
- ⚠️ 80% of incidents correlate with a recent change — check it early.
- ✅ Mitigate before root-causing when user impact is high.
- ⚡ Every hypothesis must be falsifiable and tested against evidence, never guessed.

## If You Internalize This

You will:

- Debug faster
- Panic less
- Communicate better
- Avoid dangerous changes
- Earn trust quickly

## See Also

- [Incident Simulation Labs](./incident-simulation-labs) — practice this mental flow against real incidents
- [90-Day Linux/SRE Roadmap](./linux-sre-90-day-roadmap) — build the underlying technical depth
- [Linux Debugging Reference](./linux-debugging-reference#practical-debugging-playbook) — the CLI checklist version of this mindset
