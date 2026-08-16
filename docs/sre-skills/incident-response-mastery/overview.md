---
title: "Incident Response Mastery: Overview & Study Path"
description: "Navigation map for the Incident Response Mastery series — org-level incident management setup, mindset, hands-on simulations, a 90-day roadmap, and deep Linux/kernel/interview references."
sidebar_position: 1
tags: [sre, linux, incident-response, index]
---

A complete SRE and Linux debugging knowledge base, organized by depth:
mindset → practice → structured learning → reference.

## Documents

```
Process & Organization
└── Incident Management Setup .......... Severity classification, IC/Comms/Scribe roles, on-call/paging, postmortems, runbooks

Mindset & Practice
├── Incident Response Mindset ......... The internal thought process senior SREs run under pressure
└── Incident Simulation Labs .......... 10 timed incidents + hands-on labs to practice it

Structured Learning
└── 90-Day Linux/SRE Roadmap .......... 12-week phased path from Linux basics to production mastery

Reference (Deep Dives)
├── Linux Debugging Reference ......... Master outline: systemd, networking, containers, security, boot
├── Process Management & /proc ........ Process lifecycle, ps/top/kill, /proc filesystem, decision tree
├── Filesystem & Storage Playbook ...... FHS, inodes, LVM, RAID, permissions, storage incident playbook
├── DevOps/SRE Interview Scenarios ..... Interview-style Q&A: AWS+Linux, Kubernetes, DB, incident patterns
└── Linux Kernel Fundamentals .......... Kernel internals: scheduling, syscalls, interrupts, modules
```

## Suggested Reading Order

| If you want to... | Start with |
|---|---|
| Set up org-level incident process (severity, roles, on-call, postmortems) | [Incident Management Setup](./incident-management-setup) |
| Learn how to *think* during an incident | [Incident Response Mindset](./incident-response-mindset) |
| Practice on realistic failures | [Incident Simulation Labs](./incident-simulation-labs) |
| Build skills systematically over 90 days | [90-Day Linux/SRE Roadmap](./linux-sre-90-day-roadmap) |
| Look up a specific subsystem quickly | [Linux Debugging Reference](./linux-debugging-reference) |
| Debug a hung/slow process right now | [Process Management & /proc](./process-management-proc) |
| Debug a disk-full or storage incident right now | [Filesystem & Storage Playbook](./filesystem-storage-playbook) |
| Prep for an SRE/DevOps interview | [DevOps/SRE Interview Scenarios](./devops-sre-interview-scenarios) |
| Understand *why* Linux behaves the way it does | [Linux Kernel Fundamentals](./linux-kernel-fundamentals) |

## Core Principle (Applies to Every Document)

> First understand. Then act. Mitigate before root-causing when impact is
> high. Never guess — form a falsifiable hypothesis and test it against
> evidence.

See [Incident Response Mindset](./incident-response-mindset) for the full framework.
