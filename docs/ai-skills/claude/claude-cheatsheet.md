# Claude Cheatsheet — Learn It in One Read

A quick-reference guide to understanding and using Claude (by Anthropic) effectively.

---

## 1. What Claude Is

Claude is a family of large language models (LLMs) built by Anthropic. It's a text-in, text-out (and now multimodal) AI assistant that can reason, write, code, analyze, and hold conversations. Think of it as a very capable, general-purpose "thinking partner" you interact with through natural language.

---

## 2. The Model Lineup (know the tiers)

Anthropic ships models in **size/speed tiers**, refreshed periodically:

| Tier | Best for |
|---|---|
| **Haiku** | Fast, cheap, lightweight tasks (chat, simple Q&A, high-volume use) |
| **Sonnet** | Balanced — strong reasoning + good speed. Default workhorse for most tasks |
| **Opus** | Most capable, slower/costlier — deep reasoning, complex multi-step work |
| **Mythos** (newest tier, above Opus) | Frontier-level capability, limited/gated availability |

Higher tier = smarter but slower & pricier. Pick based on task complexity, not habit.

---

## 3. Where You Can Access Claude

- **Claude.ai** — web/desktop/mobile chat interface (what most people use)
- **Claude API** — for developers building apps on top of Claude
- **Claude Code** — agentic coding tool (terminal, desktop, or IDE) for delegating dev tasks
- **Claude Cowork** — agentic tool for non-dev knowledge work
- **Claude in Chrome / Excel / PowerPoint** — task-specific agents inside those apps
- **Claude Tag** — Slack integration to tag @Claude into a channel

---

## 4. Core Capabilities

- **Conversation & reasoning** — multi-turn dialogue, step-by-step problem solving
- **Writing** — drafting, editing, summarizing, rewriting in different tones/styles
- **Coding** — writing, debugging, explaining code across languages
- **Analysis** — reading documents, spreadsheets, PDFs, images and reasoning over them
- **Search & research** — can browse the web for current info when needed
- **File creation** — docs, spreadsheets, slides, PDFs, code files
- **Artifacts** — generates standalone interactive content (apps, diagrams, visualizations) alongside the chat

---

## 5. Prompting 101 (the highest-leverage skill)

**Be clear and specific.** Vague prompts get vague answers.
> ❌ "Write about marketing"
> ✅ "Write a 300-word LinkedIn post about why small SaaS companies should invest in SEO, casual tone, include one stat"

**Give it a role/context** when it helps calibrate tone or expertise:
> "You're reviewing this code as a senior backend engineer focused on security."

**Show examples (few-shot).** If you want a specific format, show 1–2 examples of input → output.

**Ask for step-by-step reasoning** on hard problems:
> "Think through this step by step before giving the final answer."

**Iterate.** Treat the first response as a draft — refine with follow-ups rather than starting over.

**Specify format explicitly** — length, structure, tone, whether you want bullet points, tables, or prose.

**Break big tasks into smaller ones.** Multi-step chains beat one giant ask.

---

## 6. Things Claude Is Good At vs. Not

**Good at:**
- Reasoning through ambiguous, open-ended problems
- Long-form writing and editing
- Explaining complex topics simply
- Coding, debugging, refactoring
- Synthesizing/summarizing large amounts of text

**Weaker at / be careful with:**
- Perfect recall of very recent events (has a knowledge cutoff — but can search the web when needed)
- Guaranteed factual accuracy on niche/obscure claims — verify anything high-stakes
- Math requiring exact precision on very large calculations (better to have it use code execution)
- Won't help with malware, weapons uplift, or generating harmful/illegal content

---

## 7. Quick Best-Practice Checklist

- [ ] State your goal, not just the topic
- [ ] Give constraints (length, tone, audience, format)
- [ ] Provide relevant context/documents upfront
- [ ] Ask for reasoning on complex/ambiguous problems
- [ ] Iterate instead of re-prompting from scratch
- [ ] For code/data tasks, let it use tools (code execution, file creation) rather than doing math in its head
- [ ] Double-check high-stakes factual or numeric claims

---

## 8. One-Line Summary

**Claude is a reasoning-first AI assistant — the better and more specific your instructions, the better its output; treat it like a smart collaborator, not a search engine.**
