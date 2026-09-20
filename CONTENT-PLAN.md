# Content Template Plan — Finishing the Content Model in Batches

Working plan for bringing every page type up to the template in
`src/pages/contributing.mdx` ("Standard order"). This is a planning document for
the owner and Claude sessions; it is **not** published (it lives in the repo
root, outside `docs/`).

Scope rules from `CLAUDE.md` apply: this is **content work only**. Do not touch
`src/components/*`, `docusaurus.config.js`, `sidebars.js`, or page files.

---

## 1. Where things stand (Phase 0 and Phase 1 finished; owner review gate next)

| Page type | Pages | Done | Still missing |
|---|---|---|---|
| Topic guide (`*-guide.md`) | 31 | `level`, `LevelBadge`, `TenMinute`, outcomes (`KeyTakeaways`) on 30–31; `Exercises`, `CaseStudy`, `AISpark` on all 31 | nothing further planned |
| Deep subtopic (short SDET / MBA / incident pages) | 133 | `TenMinute` on 132, `LevelBadge` on 107 | intentionally out of scope (see §6) |
| Cheat sheet (`cheatsheets/`) | 45 | `TenMinute` on 44 (not the `intro.md` index); `level` + badge on 31 | nothing further planned (Phase 2 is optional) |
| Article (`blog/`) | 5 | `KeyTakeaways` on 4; the 5th (draft) has a plain-markdown Key Takeaways section | — |
| Other | 2 | `docs/intro.md` has a "Start here" fast path | `leadership-scenarios-guide.md` has no level (none justified) |

**Decisions already made**

- **Keep the existing "Interview-Ready Q&A" sections as plain markdown.** Do not
  convert them to `<InterviewQuestions>`.
- **No quizzes / flashcards.** The Quiz page was removed.
- **No `LearningPath` / `KnowledgeMap` / `VisualExplanation`.** The Skill Roadmap
  page and the hand-drawn mental-model SVGs already cover these.
- **No "Ask AI" backend, no trending list** until analytics or an API key
  decision exists.

---

## 2. Phases

| Phase | What | Pages | Effort |
|---|---|---|---|
| **0 — Cheap fixes** | Gaps that need no original writing | ~52 | 1 session |
| **1 — Guides** | `Exercises` + `CaseStudy` + `AISpark` on every topic guide | 31 | 6 batches |
| **Gate** | Owner reviews 3–4 finished guides and decides on Phase 2 | — | — |
| **2 — Optional** | Extend to cheat sheets, only if the gate says yes | 45 | decide later |

Do not start Phase 1 before Phase 0 is committed. Do not start Phase 2 without an
explicit go-ahead.

---

## 3. Phase 0 — Cheap fixes (one session)

| # | Task | Files | Notes |
|---|---|---|---|
| 0.1 | Add `TenMinute` + `level` frontmatter + `LevelBadge` to cheat sheets | 45 in `cheatsheets/` | Start the page with the fast path, per the cheat-sheet template. Steps must come from the sheet's own sections. Cheat sheets have no `Difficulty` line, so derive `level` from the matching docs guide (same topic) where one exists; otherwise ask. |
| 0.2 | Add `KeyTakeaways` to the 4 articles that lack it | `blog/*` except the one that has it | Place after the intro, before `<!-- truncate -->`. 3–4 bullets, the author's own points. |
| 0.3 | Fast path for `docs/intro.md` | 1 | Short: where to start per goal (SDET / SRE / SDE / AI). |
| 0.4 | Add `LevelBadge` to `leadership-scenarios-guide.md` | 1 | Only if a level can be justified from the page; otherwise leave it. |

**Verify:** build clean, counts re-run (see §7), one commit per task.

---

## 4. Phase 1 — Guides, in batches

Six batches, ordered so each is a coherent topic set. Do one batch per sitting.

| Batch | Track | Guides (path under `docs/`) | # |
|---|---|---|---|
| **1** | SRE — infra | `sre-skills/linux-administration`, `networking-fundamentals`, `cloud-infrastructure`, `aws`, `terraform`, `ci-cd-pipelines` | 6 |
| **2** | SRE — reliability | `sre-skills/observability-grafana-prometheus`, `opentelemetry`, `system-performance`, `chaos-engineering`, `kubernetes` | 5 |
| **3** | AI | `sre-skills/ai-assisted-engineering-workflows`, `sre-skills/mcp-ai-agents`, `ai-skills/kiro` | 3 |
| **4** | SDET — Java stack | `sdet-skills/java`, `junit`, `testng`, `selenium`, `appium`, `cucumber-bdd` | 6 |
| **5** | SDET — API, perf, data | `sdet-skills/playwright`, `postman`, `rest-assured`, `jmeter`, `robot-framework`, `sql` | 6 |
| **6** | SDE + leadership | `sde-skills/clean-architecture`, `docker-basics`, `git`, `python`, `mba-skills/leadership-for-sdet-managers/leadership-scenarios-guide.md` | 5 |

Each guide is a single `*-guide.md` (or the named file) inside its folder.
Total = 31.

### 4.1 What to add to each guide

Add three blocks, in this order, **after the "Interview-Ready Q&A" section and
before any closing "One-Line Summary" / "Summary"** (append at the end if none
follows):

1. **`<Exercises>`** — exactly 2 tasks.
   - One `beginner` or `intermediate`, one `intermediate` or `advanced`.
   - Each task: a concrete action the reader can perform, **plus a "done when"
     check** stating what they should observe.
   - Add a `stretch` goal on at most one task.
2. **`<CaseStudy>`** — `Context`, `WhatHappened`, `Lesson`, a few sentences each.
   - A realistic scenario tied to the guide's topic and to an actual section of
     that guide. Keep it generic enough that it does not read as a claim about a
     real named company or a real incident.
3. **`<AISpark>`** — 2–3 bullets.
   - Concrete prompts or agent workflows for this topic.
   - Each bullet must name **what to review by hand** afterwards.

Reference for syntax: `src/pages/contributing.mdx`.

### 4.2 Writing rules (accuracy first)

- **Read the guide before writing.** Every exercise and case must rest on
  something the guide actually teaches. Quote command names and flags exactly as
  the guide shows them.
- **No unverifiable claims.** If an exercise depends on a specific tool version,
  state it or omit the exercise. Never invent a command output.
- **No copy-paste between guides.** Two guides must not share the same case
  study skeleton with only nouns swapped. If a batch starts to sound repetitive,
  stop and change angle.
- **Do not repeat existing sections.** Do not restate "Common Mistakes" or
  "Scenarios" content as an exercise.
- **Respect MDX.** Blank lines around markdown inside components; escape `{`,
  `<` in prose or put them in backticks.
- **Runnable exercises get a dry run** where an environment exists (e.g. a
  `docker`, `git`, `python`, `sql` exercise can be tried locally). Otherwise mark
  the task as untested in the commit message.

---

## 5. Batch procedure (repeat for every batch)

1. **Read** each guide's headings and the sections the new blocks will rely on.
2. **Write** the three blocks for one guide; insert per §4.1.
3. **After every 2–3 guides**, run a quick MDX sanity build check (below) and fix
   issues immediately.
4. **After the whole batch**, run a full build and the render check.
5. **Commit** the batch (one commit, message names the batch).
6. **Pause** before the next batch (see §8).

**Full build + render check**

```bash
npm run build 2>&1 | grep -E "WARNING|broken|Broken|SUCCESS|ERROR|rror"
# each touched page must contain all three blocks:
for f in <changed docs>; do
  h=build/${f%.md}.html
  for s in "Practical exercises" 'aria-label="Case study:' "Use this with AI"; do
    grep -q "$s" "$h" || echo "MISSING [$s] $f"
  done
done
```

(The three markers are the components' defaults: `Exercises` prints "Practical
exercises", `CaseStudy` sets `aria-label="Case study: <title>"`, `AISpark` prints
"Use this with AI". If a block passes a custom `title`, adjust the marker.)

**Commit message template**

```
Add exercises, case study, and AI ideas to <track> guides (batch N)

<list of guides>. Exercises not executed: <list or "none">.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

---

## 6. Explicitly out of scope

- **The 133 short subtopic pages.** They already end with "Scenarios & How to
  Respond" and "Common Mistakes"; exercises there would mostly repeat them.
- **`InterviewQuestions` accordions** (decision in §1).
- **The 17,811-line Claude Masterclass transcript.**
- **Quiz, flashcards, "Ask AI", trending list** (decisions in §1).

---

## 7. Progress tracker

Update the boxes as batches land, and record the commit hash.

**Phase 0**

- [x] 0.1 Cheat sheets: `TenMinute` on 44 (all except `cheatsheets/intro.md`, an index page); level on 31 — commit `a378c30`
- [x] 0.2 Articles: `KeyTakeaways` added to 3 (the 4th, the draft "269 courses" post, already has a plain-markdown Key Takeaways section at the bottom — left as is)
- [x] 0.3 `docs/intro.md` fast path ("Start here")
- [x] 0.4 `leadership-scenarios-guide.md` badge — decided not to add: no level is justified from the page

**Phase 1**

- [x] Batch 1 — SRE infra (6) — commit: `51eda9a`
- [x] Batch 2 — SRE reliability (5) — commit: `441996b` (+ stretch fix)
- [x] Batch 3 — AI (3) — commit: `9620a34`
- [x] Batch 4 — SDET Java stack (6) — commit: `2de6a02`
- [x] Batch 5 — SDET API/perf/data (6) — commit: `e00d9ff`
- [x] Batch 6 — SDE + leadership (5) — commit: `1b66ce3`

**Gate**

- [ ] Owner reviewed 3–4 finished guides → decision on Phase 2: ______

**Coverage re-check** (run after each phase)

```bash
for c in TenMinute LevelBadge KeyTakeaways Exercises CaseStudy AISpark; do
  printf "%-14s guides=%s cheatsheets=%s articles=%s\n" "$c" \
    "$(find docs -name '*-guide.md' | xargs grep -l "<$c" | wc -l | tr -d ' ')" \
    "$(find cheatsheets -name '*.md*' | xargs grep -l "<$c" | wc -l | tr -d ' ')" \
    "$(find blog -name '*.md*' | xargs grep -l "<$c" | wc -l | tr -d ' ')"
done
```

Target after Phase 1: `Exercises`, `CaseStudy`, `AISpark` = 31 on guides.

---

## 8. Pacing and rate-limit safety

- **One batch per sitting**, 5–6 guides at most. Never two batches back to back.
- **Pause 60–90 seconds between guides' build checks** and **at least a few
  minutes between batches**; a full pause between sessions is fine — the
  progress tracker (§7) is the source of truth for resuming.
- **Sequential, not parallel.** Do not spawn sub-agents to write batches at the
  same time.
- **Stop-and-resume rule:** if a tool call is rate-limited or errors twice, stop,
  note the last completed guide in the tracker, and resume from there.
- Keep each batch's commit small enough to revert on its own.

---

## 9. Risks and how this plan handles them

| Risk | Mitigation |
|---|---|
| Wrong or unrunnable exercises | Read-first rule, "done when" checks, dry-run where possible, flag untested tasks in the commit |
| Templated, near-duplicate content (AdSense "thin content" risk) | No copy-paste rule, varied angles, Phase 1 limited to 31 deep guides, owner gate before Phase 2 |
| Case studies read as claims about real companies | Keep scenarios generic and clearly illustrative |
| Long-term maintenance | Small scope (31 guides), each block tied to a specific guide section |
| MDX build failures from new prose | Build check every 2–3 guides, not only at the end |

---

## 10. Next action

Phase 1 is done. The next step is the owner review gate: read 3–4 finished guides and decide whether to do Phase 2.
