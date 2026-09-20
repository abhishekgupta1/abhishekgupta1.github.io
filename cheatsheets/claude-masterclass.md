---
title: "Claude Masterclass Cheat Sheet"
description: "Quick reference for the Claude Masterclass course — Cowork, Skills, Plugins, Claude Code, and Claude Design at a glance."
tags: [claude, ai, cheat-sheet]
hide_table_of_contents: true
image: /img/social/claude-masterclass.png
---

# Claude Masterclass cheatsheet

A one-page index of the course sections. For the full navigation map and
transcript, see the [course overview](/docs/ai-skills/claude-masterclass/course-overview).

<a class="topic-crosslink" href="/docs/ai-skills/claude-masterclass/course-overview">📖 Full guide: Claude Masterclass →</a>

<TenMinute minutes={5}>

1. Begin with the **Claude Cowork** card
2. Then the **Claude Skills basics** and **Claude Plugins** cards
3. Treat the other 7 cards as lookups — scan by card title when you need one
4. Open the [full guide](/docs/ai-skills/claude-masterclass/course-overview) when a card isn't enough

</TenMinute>

<div class="cheat-sheet cheat-sheet--ai">

<div class="cheat-card">

#### Claude Cowork

Set up, understand pricing, complete your first task. Operate inside
browsers via the extension. Schedule tasks to run on autopilot. Connect to
100+ apps via Connectors/custom MCP. Computer Use, Dispatch (smartphone),
Scheduled Tabs. Publish a web app in 20 minutes.

</div>

<div class="cheat-card">

#### Claude Skills basics

Core structure of Skills, using pre-built Skills, downloading a 20+ Skills
pack, building custom Skills with Skill Creator, editing via chat or
folder/file.

</div>

<div class="cheat-card">

#### Claude Plugins

Plugin structure and commands, how plugins differ from Skills, customizing
and uploading via GitHub/URL, building a plugin from scratch, Anthropic's
built-in plugins.

</div>

<div class="cheat-card">

#### Claude Code basics

Install/setup (Claude Code, Git, GitHub), interface walkthrough, `CLAUDE.md`
files and context management, VS Code/Cursor integration, saving work with
Git/GitHub.

</div>

<div class="cheat-card">

#### Claude Code advanced

Plan Mode for building a real app, sub-agents and parallel execution,
AI-assisted site + reservation system builds, 50 ready-to-use project idea
prompts.

</div>

<div class="cheat-card">

#### Second brain with Obsidian

Vault integration with Claude Code, self-organizing wiki (Karpathy pattern),
importing web pages via Obsidian Web Clipper, vault backup to a private
GitHub repo.

</div>

<div class="cheat-card">

#### Claude Design

Design systems, interactive 3D app use cases, deploying a complete site via
Vercel, mobile app prototyping.

</div>

<div class="cheat-card">

#### Using Claude well

Interface overview (Projects, Memory, Artifacts, Voice, Vision). Model
selection (Sonnet, Opus, Haiku) and pricing. System prompts and custom
instructions.

</div>

<div class="cheat-card">

#### Prompt engineering

Zero-shot, one-shot, few-shot formulas. Chain-of-Thought, the Reflexion
technique, dynamic prompting.

</div>

<div class="cheat-card">

#### Claude with other tools

Excalidraw, Notion, Canva, ElevenLabs, Playwright, NotebookLM. AI image/video
generation (Higgsfield, Nano Banana 2, Kling 3.0, Veo 3.1). Web scraping with
Firecrawl, UI design with Google Stitch 2.0.

</div>

</div>

---

<Exercises>
<Exercises.Task title="Write zero-shot, one-shot, and few-shot versions of one prompt" level="beginner">

Take one task, such as classifying support messages as `bug`, `feature`, or `question`. Write the prompt three ways: with no examples, with one labelled example, and with at least three labelled examples in the same format you want back. Try all three on the same five messages you have not shown the model.

**Done when:** the few-shot version shows its examples in exactly the output format you expect, you have run all three on the same messages, and you can say which version produced the most consistent format and where it still got a case wrong.

</Exercises.Task>
<Exercises.Task title="Give a small project a CLAUDE.md" level="intermediate">

Pick a small project you work on and write a `CLAUDE.md` at its root: what the project is, the exact commands to run and test it, the conventions to follow, and the parts that must not be changed without asking.

**Done when:** the file fits in under about 40 lines, every command in it actually runs when you try it, the "do not change" list names specific files or directories, and a fresh session given a small task follows the file without you repeating it.

</Exercises.Task>
</Exercises>

<CaseStudy title="The assistant that reorganised the wrong files">
<CaseStudy.Context>

*Illustrative scenario.* A team points a coding assistant at a repository with no written project guidance and asks it to add a small feature.

</CaseStudy.Context>
<CaseStudy.WhatHappened>

With no boundaries to go on, the assistant tidied up shared components and configuration that the team considered off limits, so the small feature arrived inside a large, hard-to-review diff. Nobody had told it which parts were stable or what to leave alone.

</CaseStudy.WhatHappened>
<CaseStudy.Lesson>

A `CLAUDE.md` carries the context an assistant cannot guess: how to run things, the conventions, and the boundaries. State plainly what content changes are expected and which core files should only change when asked.

</CaseStudy.Lesson>
</CaseStudy>

<AISpark>

- Ask Claude to critique your `CLAUDE.md` for vague rules, then test it by giving a fresh session a small task and checking whether it follows the file.
- Have it rewrite a vague prompt in few-shot form, then compare the outputs on three new inputs of your own choosing.
- Before installing a skill or plugin, ask it to summarise what the files can do and which permissions they need, and read the files yourself before you enable them.

</AISpark>
