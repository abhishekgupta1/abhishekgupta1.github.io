---
title: Uses
description: The hardware, editor setup, and tools behind the automation, reliability, and AI work on this site.
---

# Uses

A running list of what I actually work with. Inspired by [uses.tech](https://uses.tech/).

## Editor & terminal

- **VS Code** — main editor. Key extensions: Playwright Test, ESLint, GitLens, Error Lens, the Docker and Kubernetes extensions.
- **JetBrains IDEA** — for heavier Java automation framework work.
- **Terminal**: zsh + a minimal prompt, `fzf`, `ripgrep`, `bat`, `jq`, `k9s` for clusters.
- **AI in the loop**: Claude / Claude Code for scaffolding tests, refactors, and reviewing traces. See [Using Claude](/cheatsheets/using-claude).

## Testing & automation

- **Playwright** as the default E2E stack; Selenium where it's already entrenched.
- **REST Assured** + **Postman/Newman** for API suites.
- **JUnit 5** / **TestNG**, **Appium** for mobile.
- **JMeter** / k6 for load.

## Reliability & infra

- **Docker**, **Kubernetes** (k9s, kubectl, Lens occasionally).
- **Terraform** for infra; **GitHub Actions** for CI/CD.
- **Prometheus + Grafana**, **OpenTelemetry** for tracing.
- **AWS** as the primary cloud.

## This site

- **Docusaurus** (static, deployed to GitHub Pages).
- **Playwright** smoke tests + **Lighthouse CI** + link checking on every push.
- Analytics: **GoatCounter** (cookieless).

*This page changes as the toolset does.*
