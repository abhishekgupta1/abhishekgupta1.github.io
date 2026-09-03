---
slug: 269-courses-one-roadmap-qa-to-sre
title: "269 Courses, One Direction: Auditing My Own Learning Library"
date: 2026-08-30
authors: [abhishek]
tags: [sre, kubernetes, ai, automation, testing]
description: "I inventoried everything sitting in my Udemy Business library — 269 courses across 18 skill domains — to see what it actually says about the move from QA/SDET to SRE and platform engineering."
image: "/img/og-image.png"
draft: true
---

I've been enrolling in Udemy Business courses for years without ever stepping back to look at what the pile adds up to. So I ran an audit: every course currently sitting in my "My Learning" library, grouped into skill domains by title and topic. The result was 269 courses across 18 domains, spread over 23 pages of the library view — and reading it back as one list told me more about the direction I'm pointed in than any single course ever has.

<!-- truncate -->

## What this audit is, and isn't

This is an inventory, not a progress report. The breakdown groups 269 courses by title and topic into 18 domains — it does **not** reflect percent-complete or which of these I've actually finished, because that data wasn't pulled. So this is a map of what the *full library* could teach me, not a claim about what I've already learned. Categories and counts below are approximate where a course spans more than one domain, and the domain groupings are based on course titles/topics rather than each course's individual "skills you'll gain" tags — pulling that level of detail for all 269 courses individually wasn't practical.

I've spent 10+ years on the QA/SDET side — QualityKiosk, Dream11/Fancode, Gojek, Plivo, and now Lead SDET at Entain — and I'm working toward Senior SRE / Platform Engineering. Looking at this library with that lens on is really an audit of whether what I've been collecting actually lines up with where I say I'm headed.

## The 18 domains, by size

| # | Domain | Approx. courses | What's in it |
|---|--------|------------------|---------------|
| 1 | DevOps, Cloud Infra & SRE | ~45 | Kubernetes (CKA/CKAD-level), Terraform/IaC, Ansible, Chef, GitLab CI/CD, Jenkins, Helm, AWS (CloudFormation, EKS, CodePipeline), OpenShift, Linux admin (LFCS), SLOs/error budgets, chaos engineering, observability (Prometheus, Grafana, OpenTelemetry, Loki, Tempo) |
| 2 | Generative AI, LLMs & AI Agent Engineering | ~25 | Prompt engineering, agentic AI, MCP, LangChain/LangGraph, RAG, QLoRA fine-tuning, OpenAI/Claude API dev, Amazon Bedrock/Q, PyTorch/TensorFlow, NLP |
| 3 | Software Engineering & Programming | ~20 | Python, JavaScript, TypeScript, Go, DSA, coding-interview prep, system design, microservices architecture, SQL |
| 4 | Software Testing, QA & Test Automation | ~20 | Selenium, Playwright, SDET/test-architecture, API testing (Postman, Karate, REST Assured), performance testing (JMeter, LoadRunner, k6), ISTQB, unit testing (JUnit 5, Mockito, Testcontainers) |
| 9 | Business Process Improvement & Lean/Six Sigma | ~20 | Root cause analysis, process mapping, Lean Six Sigma Yellow Belt, RPA project lifecycle |
| 8 | Leadership & People Management | ~18 | New-manager transition, delegation, coaching, strategic decision-making |
| 7 | Project & Product Management | ~12 | Agile/Scrum, PMP prep, product management, PM tooling |
| 5 | Data & Business Analytics | ~10 | BI, Power BI (PL-300), data storytelling |
| 10 | Communication & Interpersonal Skills | ~15 | Business writing, public speaking, negotiation |
| 13 | Personal Development & Productivity | ~15 | Time management, stress management, growth mindset |
| 11 | Entrepreneurship & Startups | ~9 | MVP creation, lean startup, VC modeling, SaaS fundamentals |
| 6 | Business Analysis | ~7 | Requirements gathering, CBAP prep, BABOK-aligned frameworks |
| 12 | Marketing & Sales | ~5 | Digital marketing, LinkedIn ads, sales technique |
| 16 | Finance & Accounting | ~3 | Financial analysis, financial modeling |
| 17 | Career Skills & Remote Work | ~3 | Soft skills, remote-work effectiveness |
| 14 | Design Tools & UX/UI | ~2 | UI/UX fundamentals, Figma, Canva |
| 15 | Cybersecurity | ~1 | Web app security, penetration testing, bug bounty |
| 18 | Language Learning | ~1 | English speaking fluency |

## The two clusters that dominate

DevOps/Cloud/SRE and Generative AI/Agentic AI engineering are, combined, roughly a quarter of the entire 269-course library — and that's not an accident of what Udemy happened to recommend. It's the clearest evidence in this dataset of where my attention has actually gone.

The DevOps/SRE cluster (~45 courses) is the largest single group in the library. It's built around Kubernetes at CKA/CKAD depth, Terraform and infrastructure-as-code across AWS and Azure, CI/CD tooling (GitLab, Jenkins, Helm), Linux administration (LFCS), and — most relevant to the SRE title specifically — SLOs, error budgets, chaos engineering, and the observability stack (Prometheus, Grafana, OpenTelemetry, Loki, Tempo). Representative titles include *Certified Kubernetes Administrator (CKA)*, *HashiCorp Certified: Terraform Associate*, *SRE Bootcamp*, and *Chaos Engineering*.

The AI/agent engineering cluster (~25 courses) is newer territory relative to my QA background: prompt engineering, agentic systems, MCP (Model Context Protocol), LangChain/LangGraph, RAG pipelines, QLoRA fine-tuning, and API-level development against OpenAI, Claude, and Amazon Bedrock. Titles like *AI Engineer Agentic Track*, *Complete MCP Developer Guide*, and *AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents* sit in this group.

## The second layer: extending what I already do

Underneath those two, Software Engineering & Programming (~20 courses) and Software Testing/QA/Test Automation (~20 courses) form a second layer that's really an extension of my current SDET work rather than a pivot away from it — Selenium, Playwright, API testing, performance testing, system design, and coding-interview prep. This is the connective tissue: it's the same skill set I use day to day at Entain, deepened rather than replaced.

## The layer that doesn't fit the SRE narrative

The rest of the library doesn't map cleanly onto an SRE/platform-engineering path at all. Business process improvement and Lean/Six Sigma (~20), leadership and people management (~18), project/product management (~12), communication (~15), and personal development (~15) together account for a large chunk of the 269 courses — arguably as large as the technical clusters combined. `[NEEDS INPUT: what drove enrollment in the business-analysis, PM, Lean Six Sigma, and leadership courses — whether that reflects a parallel management-track interest, a past phase of career exploration, or something else entirely]`. The source data doesn't say, and I'm not going to guess at motivation I haven't confirmed.

## What this inventory doesn't tell me

A few things this report explicitly does not cover, and that I'm flagging rather than filling in:

- `[NEEDS INPUT: percent-complete or completion status for any of these 269 courses — the report states this data wasn't pulled]`
- `[NEEDS INPUT: a timeline or plan for which domains to prioritize finishing, if one exists]`
- `[NEEDS INPUT: which courses, if any, have already been completed and translated into applied skills or projects]`

Until that data exists, the honest claim is: this is a library that could support a QA-to-SRE transition, not proof that the transition has happened.

## Key Takeaways

- The audit covers 269 courses across 18 domains, grouped by title/topic — not by verified completion.
- DevOps/Cloud/SRE (~45 courses) is the single largest domain, covering Kubernetes, Terraform, CI/CD, Linux admin, and the SRE/observability stack specifically (SLOs, error budgets, chaos engineering, Prometheus/Grafana/OpenTelemetry).
- Generative AI/Agentic AI engineering (~25 courses) is the second-largest domain — DevOps/SRE and AI combined make up roughly a quarter of the full library.
- Software engineering and QA/test automation (~40 courses combined) form a second layer that extends my current SDET skill set rather than replacing it.
- A significant portion of the library (business analysis, PM, Lean Six Sigma, leadership, communication — collectively over 70 courses) sits outside the SRE narrative, and I don't yet have a confirmed explanation for why.
- Progress/completion data wasn't part of this audit, so none of the above should be read as skills already gained.
