---
title: "Category 12: Ethical Dilemmas, Compliance & Governance"
description: "Scenarios 56–60 of the Manager Response Library: Ethical Dilemmas, Compliance & Governance."
sidebar_position: 12
tags: [management, playbook, mba]
---

# Category 12: Ethical Dilemmas, Compliance & Governance

**Part of**: Manager Response Library

---

<div class="mental-model">
<span class="mental-model__label">🧭 Mental model</span>

<svg viewBox="0 0 780 240" role="img" aria-labelledby="mm-edcg-title mm-edcg-desc">
<title id="mm-edcg-title">The decision chain for ethical and compliance dilemmas</title>
<desc id="mm-edcg-desc">An ethical or compliance dilemma - a risky deadline, IP theft, a leak, an ethical objection, or an accommodation conflict - is stated plainly and given real options, then either a documented decision is made or the issue is escalated to legal, security, or compliance leadership.</desc>
<defs>
  <marker id="mm-edcg-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" class="mm-arrowhead"/>
  </marker>
</defs>

<rect class="mm-n1" x="15" y="88" width="150" height="60" rx="10"/>
<text class="mm-node-title" x="90" y="112" text-anchor="middle">Dilemma surfaces</text>
<text class="mm-node-sub" x="90" y="128" text-anchor="middle">risk, leak, objection, conflict</text>

<path class="mm-arrow" d="M165,118 L195,118" marker-end="url(#mm-edcg-arrow)"/>

<rect class="mm-n2" x="200" y="88" width="150" height="60" rx="10"/>
<text class="mm-node-title" x="275" y="112" text-anchor="middle">State it plainly</text>
<text class="mm-node-sub" x="275" y="128" text-anchor="middle">business terms, no hedging</text>

<path class="mm-arrow" d="M350,118 L380,118" marker-end="url(#mm-edcg-arrow)"/>

<rect class="mm-n3" x="385" y="88" width="150" height="60" rx="10"/>
<text class="mm-node-title" x="460" y="112" text-anchor="middle">Give real options</text>
<text class="mm-node-sub" x="460" y="128" text-anchor="middle">delay, mitigate, or accept</text>

<path class="mm-arrow" d="M535,100 L590,40" marker-end="url(#mm-edcg-arrow)"/>
<path class="mm-arrow" d="M535,135 L590,175" marker-end="url(#mm-edcg-arrow)"/>

<rect class="mm-n4" x="595" y="10" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="680" y="34" text-anchor="middle">Decision documented</text>
<text class="mm-node-sub" x="680" y="50" text-anchor="middle">owner accepts risk in writing</text>

<rect class="mm-n5" x="595" y="145" width="170" height="60" rx="10"/>
<text class="mm-node-title" x="680" y="169" text-anchor="middle">Escalate</text>
<text class="mm-node-sub" x="680" y="185" text-anchor="middle">legal, security, compliance</text>
</svg>

<p class="mental-model__caption">Whether the dilemma is a risky ship deadline, suspected IP theft, a pending leak, an employee's ethical objection, or a scheduling accommodation conflict, the same chain applies: state the issue plainly, lay out the real options, and either put the decision in writing or escalate it to the people whose job it is to own that risk.</p>
</div>

## 56. An executive asks you to ship software with known severe security vulnerabilities or compliance risks to meet an artificial deadline

**Core Objective**: Refuse to ship unacceptable risk while giving the executive a real, informed choice — make the risk impossible to unknowingly accept.

**Mental Model / Leadership Principle**: Your job isn't to unilaterally block the business decision — it's to make sure the risk is fully, explicitly understood by whoever has the authority to accept it, in writing. Silent compliance and unilateral refusal are both worse than surfacing the tradeoff clearly.

**Step-by-Step Action Strategy**:
1. State the specific risk in business terms (not just technical severity) plainly and without hedging.
2. Offer the real options: delay, ship with mitigation, or knowingly accept the risk.
3. Put the decision and its owner in writing if they choose to accept the risk.
4. Escalate to security/legal/compliance leadership if the risk is severe enough that it shouldn't rest on this conversation alone.

**Exact Word-for-Word Script (Do's)**:
> "I want to be very direct: shipping this as-is means [specific risk — e.g., a known path to customer data exposure]. I don't think we should ship it in this state without a mitigation or an explicit decision to accept that risk."
>
> "Here are the real options: delay by [X] to fix it properly, ship with [specific interim mitigation], or ship as-is and accept the risk knowingly. I want you to choose with the full picture, not without it."
>
> "If we're accepting the risk, I want that decision documented and I'm looping in [security/legal] given the severity — this isn't a call I think should be made informally."

**Phrases to Avoid (Don'ts)**:
- Shipping it quietly without raising the risk clearly, to avoid an uncomfortable conversation.
- "I guess we have no choice" — treating it as inevitable rather than presenting real alternatives.
- Softening the severity of the risk to make the conversation easier, leaving the decision-maker under-informed.

**Related Records**: [Cloud Infrastructure Spending & FinOps](../engineering-governance-operations/budgeting-p-l-basics/cloud-infrastructure-spending-finops.md), [Executive Presence](../executive-communication-influence/executive-presence-influence/executive-presence.md)

---

## 57. You discover a senior engineer or team member engaged in moonlighting, intellectual property theft, or a serious breach of company policy

**Core Objective**: Handle a serious integrity issue through a fair, confidential, evidence-based process — protect the company and act quickly, without acting as judge and jury informally.

**Mental Model / Leadership Principle**: This is an HR and legal matter the moment it's serious, not a coaching conversation. Your job is to gather what you directly know, involve the right people immediately, and avoid confronting the individual before you understand the appropriate process.

**Step-by-Step Action Strategy**:
1. Document what you directly know factually, without speculating beyond the evidence.
2. Loop in HR and legal immediately, before taking any direct action with the individual.
3. Follow their guidance on investigation and next steps, including whether and how to confront the person.
4. Maintain strict confidentiality throughout — this is not something to discuss with the wider team.

**Exact Word-for-Word Script (Do's)**:
> (To HR/Legal) "I need to report something serious — here's exactly what I observed or was told, with dates and specifics. I haven't taken any action yet and want your guidance on next steps."
>
> (If instructed to speak with the individual, following HR guidance) "I need to discuss something serious involving [specific policy]. HR is involved, and I want you to understand the process from here."
>
> (To your own manager, if appropriate) "I wanted to flag that I've escalated a serious issue to HR — I can't share details, but wanted you aware that a process is underway."

**Phrases to Avoid (Don'ts)**:
- Confronting the individual directly before consulting HR/legal, potentially compromising an investigation.
- Discussing the issue with other team members or speculating about it before the process concludes.
- Taking unilateral disciplinary action (like removing access or reassigning work publicly) without guidance on the appropriate process.

**Related Records**: [Handling Underperformance](../team-organizational-leadership/conflict-resolution-negotiation/handling-underperformance.md)

---

## 58. Handling rumors, leaks, or confidential information (e.g., pending layoffs, acquisitions) before official corporate announcements

**Core Objective**: Manage team anxiety and maintain trust without confirming, denying, or speculating about information you're not authorized to share.

**Mental Model / Leadership Principle**: "I can't discuss that" said honestly and without evasive body language is a complete, respectable answer — the trust-damaging move isn't declining to comment, it's lying or pretending not to know something you actually do.

**Step-by-Step Action Strategy**:
1. Don't confirm, deny, or speculate about the specific rumor, regardless of what you personally know.
2. Acknowledge the rumor exists and that you understand the anxiety it creates.
3. Redirect to what you can control — normal operations, and a commitment to share real information when you're able to.
4. Escalate to leadership/communications if the rumor is causing significant disruption, requesting guidance on what (if anything) can be said.

**Exact Word-for-Word Script (Do's)**:
> "I know there's a rumor going around, and I understand why it's creating anxiety — I'm not able to confirm or deny anything at this point, and I want to be honest about that rather than pretend I don't know it's circulating."
>
> "What I can tell you is that I'll share real information the moment I'm able to — I don't want you hearing something important secondhand if I can help it."
>
> "In the meantime, let's keep focused on what's in front of us — I know that's easier said than done, and I appreciate you all handling this with the professionalism you have."

**Phrases to Avoid (Don'ts)**:
- Denying something that's actually true, which destroys trust completely once it's confirmed later.
- Confirming or leaking information you're not authorized to share, even to a trusted individual.
- Dismissing the rumor's emotional impact ("it's just a rumor, don't worry about it") without acknowledging the real anxiety.

**Related Records**: [Adapting Communication Tone by Audience](../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md), [Category 4: Organizational Crises & Pressure (Scenario 17)](./category-4-organizational-crises-pressure.md)

---

## 59. An engineer raises an ethical objection to a product feature or client contract on moral/social grounds

**Core Objective**: Take the objection seriously and give it a real hearing, while being honest about what you can and can't change as their manager.

**Mental Model / Leadership Principle**: Dismissing an ethical objection outright teaches the team not to raise concerns; rubber-stamping it without evaluation isn't honest either. Take it as real signal worth escalating and evaluating properly, even when you can't personally resolve it.

**Step-by-Step Action Strategy**:
1. Listen fully and take the concern seriously, without immediately defending the business decision.
2. Understand specifically what the objection is and what resolution they're looking for.
3. Escalate it to the appropriate decision-makers (product, legal, ethics function if one exists) rather than deciding unilaterally yourself.
4. Follow up with a real answer, even if it's not the one they wanted, and discuss options if they remain unable to work on it in good conscience.

**Exact Word-for-Word Script (Do's)**:
> "Thank you for raising this directly — I want to understand your concern fully before responding. Walk me through what specifically troubles you about this."
>
> "This isn't something I can decide alone — I want to escalate this to [product/legal/leadership] and make sure your concern is heard by the people who can actually weigh in on the decision."
>
> "Here's what came back from that conversation [outcome]. If you're still not comfortable working on this specific piece, let's talk about whether there's a way to reassign you to different work."

**Phrases to Avoid (Don'ts)**:
- "That's just how business works, we don't have a choice." (dismissing the concern without genuine evaluation)
- Promising you'll get the decision reversed when that's not realistically within your power.
- Punishing or quietly sidelining the engineer for raising the concern.

**Related Records**: [Adapting Communication Tone by Audience](../team-organizational-leadership/situational-leadership-coaching/adapting-communication-tone-by-audience.md)

---

## 60. Managing an employee who requests accommodations for personal or religious reasons that conflict with existing team schedules or on-call rotations

**Core Objective**: Accommodate the request fairly and, where legally required, without creating resentment or an unsustainable burden on the rest of the team.

**Mental Model / Leadership Principle**: Treat this as a solvable scheduling and fairness problem, not a special favor — most accommodation requests can be met with a structural adjustment (a swap system, a different rotation slot) that doesn't require anyone else to silently absorb the cost.

**Step-by-Step Action Strategy**:
1. Understand the specific accommodation needed, and involve HR for guidance on legal obligations where relevant.
2. Look for a structural solution (rotation adjustment, swap arrangement) rather than an ad hoc, unsustainable one-off fix.
3. Communicate the change to the team factually, without disclosing more personal detail than the employee wants shared.
4. Check that the adjustment isn't quietly overloading someone else, and revisit if it is.

**Exact Word-for-Word Script (Do's)**:
> "Thank you for telling me — let's figure out a schedule that works for you. I'll check with HR on anything I need to know, and then let's design something sustainable, not just a one-time fix."
>
> (To the team, with the employee's consent on framing) "We're adjusting the on-call rotation to accommodate [as much detail as the employee is comfortable sharing, or simply 'a schedule need'] — here's how the new rotation looks."
>
> "I want to check in with whoever's covering the adjusted slots — is this actually sustainable for you too, or do we need to look at this again?"

**Phrases to Avoid (Don'ts)**:
- Denying a reasonable accommodation request without consulting HR on the actual legal and policy considerations.
- Disclosing more personal or religious detail to the team than the employee is comfortable with.
- Quietly shifting the burden onto one other team member without checking whether it's sustainable for them.

**Related Records**: [Managing Team Bandwidth](../engineering-governance-operations/resource-allocation-capacity-planning/managing-team-bandwidth.md)

---

**Previous**: [Category 11: Cross-Departmental & Matrix Management](./category-11-cross-departmental-matrix-management.md)
**Next**: [Category 13: Scaling, Re-orgs & Startup-to-Enterprise Evolution](./category-13-scaling-re-orgs-startup-to-enterprise-evolution.md)
