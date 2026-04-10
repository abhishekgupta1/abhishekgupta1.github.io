---
title: "Runbook: Incident Response"
description: "Step-by-step incident response guide covering detection, triage, mitigation, and post-mortem."
sidebar_position: 1
tags: [sre, runbook, incident-response]
---

# Runbook: Incident Response

A structured guide for handling production incidents from initial alert to post-mortem review.

## 1. Detection

- Monitor alerting channels (PagerDuty, Slack, Grafana alerts)
- Confirm the alert is actionable and not a false positive

## 2. Triage

- Assess severity (SEV1–SEV4) based on user impact and blast radius
- Assign an Incident Commander and open a dedicated communication channel

## 3. Mitigation

- Apply the quickest safe fix (rollback, feature flag toggle, scaling)
- Communicate status updates at regular intervals

## 4. Resolution

- Verify metrics return to baseline
- Confirm with stakeholders that the issue is resolved

## 5. Post-Mortem

- Document timeline, root cause, and contributing factors
- Identify action items to prevent recurrence
- Share findings with the broader team

---

*This is a placeholder runbook. Replace with your own incident response procedures.*
