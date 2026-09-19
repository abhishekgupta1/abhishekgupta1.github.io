/**
 * Flashcard bank for /quiz. Keyed by topic id (matches src/data/topics.js).
 * Add more entries any time — the quiz page picks them up automatically.
 * Keep answers to 1-3 sentences; link out via the topic's cheat sheet.
 */
import {topics} from './topics';

const BANK = {
  playwright: [
    {q: 'Why prefer a locator over an ElementHandle?', a: 'A locator is lazy — it re-queries the DOM every time you act, so it survives re-renders. An ElementHandle is a one-time reference that goes stale.'},
    {q: 'What does Playwright auto-waiting cover before a click?', a: 'The element must be attached, visible, stable (not animating), able to receive events (not obscured), and enabled.'},
    {q: 'How do you isolate state between tests?', a: 'Each test gets its own BrowserContext (via the `page` fixture) — separate cookies, storage, and cache. No manual cleanup needed.'},
    {q: 'What is a fixture in Playwright Test?', a: 'A dependency-injected setup/teardown unit (like `page`, or a custom one) that runs only for tests that request it, with automatic scoping and teardown.'},
    {q: 'How do you make selectors resilient?', a: 'Prefer user-facing queries: getByRole, getByLabel, getByText, or an explicit data-testid — not CSS/XPath tied to DOM structure.'},
    {q: 'What does `trace: "on-first-retry"` give you?', a: 'A zip with a DOM snapshot timeline, network, console, and source per action — opened with `npx playwright show-trace`. Only recorded when a test retries.'},
  ],
  selenium: [
    {q: 'Explicit vs implicit wait — why not mix them?', a: 'Implicit sets a global poll for element lookups; explicit (WebDriverWait) waits for a condition. Mixing them can compound timeouts unpredictably.'},
    {q: 'What is the Page Object Model?', a: 'A pattern where each page/screen is a class exposing intent-level methods, keeping locators and interaction details out of tests.'},
    {q: 'What is Selenium Grid for?', a: 'Distributing tests across multiple machines/browsers in parallel via a hub/node (or modern distributed) architecture.'},
    {q: 'Why is `Thread.sleep` an anti-pattern?', a: 'It always waits the full duration regardless of readiness — slow when unnecessary, flaky when too short. Use conditional waits.'},
    {q: 'What changed with Selenium 4 locators?', a: 'Relative locators (above/below/near/toLeftOf) and full W3C WebDriver protocol compliance, plus CDP access for Chromium.'},
  ],
  git: [
    {q: 'merge vs rebase — one line each.', a: 'Merge preserves history and adds a merge commit. Rebase replays your commits onto a new base for a linear history.'},
    {q: 'When must you never rebase?', a: 'Commits already pushed and shared — rewriting them forces everyone else to recover.'},
    {q: 'What does `git reflog` let you recover?', a: 'Any commit HEAD pointed at recently, even after a hard reset or branch delete — nothing reachable via reflog is truly gone yet.'},
    {q: 'fetch vs pull?', a: '`fetch` downloads refs without touching your working tree. `pull` = fetch + merge (or rebase) into the current branch.'},
    {q: 'What is `git bisect`?', a: 'A binary search over commits to find the one that introduced a bug — mark good/bad (or run a script) until it isolates the culprit.'},
  ],
  docker: [
    {q: 'Image vs container?', a: 'An image is an immutable, layered filesystem + metadata. A container is a running (or stopped) writable instance of an image.'},
    {q: 'Why use a multi-stage build?', a: 'Build artifacts in a heavy stage, copy only the output into a slim final image — smaller, fewer CVEs, no build tools shipped.'},
    {q: 'How does layer caching affect Dockerfile order?', a: 'Put rarely-changing steps (dependency install) before frequently-changing ones (source copy) so cache is reused.'},
    {q: 'CMD vs ENTRYPOINT?', a: 'ENTRYPOINT sets the executable; CMD sets default args. `docker run` args override CMD but are appended to ENTRYPOINT.'},
    {q: 'Where do container writes go by default?', a: 'The writable top layer, which is destroyed with the container. Use volumes or bind mounts for persistence.'},
  ],
  kubernetes: [
    {q: 'What reconciles desired vs actual state?', a: 'Controllers in the control plane loop continuously, driving actual state toward the spec stored in etcd.'},
    {q: 'liveness vs readiness probe?', a: 'Liveness failure restarts the container. Readiness failure removes the pod from Service endpoints but leaves it running.'},
    {q: 'What does a Service provide over pod IPs?', a: 'A stable virtual IP/DNS name and load balancing across the current set of matching pod endpoints, which churn.'},
    {q: 'Deployment vs StatefulSet?', a: 'Deployment: interchangeable pods, random names. StatefulSet: stable network id + persistent volume per ordinal, ordered rollout.'},
    {q: 'What are requests and limits?', a: 'Requests are what the scheduler reserves; limits are the hard cap. CPU over-limit is throttled; memory over-limit is OOM-killed.'},
  ],
  python: [
    {q: 'What does a virtual environment isolate?', a: 'Per-project interpreter + installed packages, so projects don\'t share or clobber each other\'s dependencies.'},
    {q: 'list vs tuple?', a: 'List is mutable, variable-length. Tuple is immutable, fixed — hashable, usable as dict keys, slightly faster.'},
    {q: 'What is a generator?', a: 'A lazy iterator produced by `yield` or a generator expression — computes values on demand, constant memory.'},
    {q: 'What does the GIL prevent?', a: 'Two threads executing Python bytecode truly in parallel. CPU-bound work needs multiprocessing or native extensions; I/O-bound is fine.'},
    {q: 'pytest fixture vs xUnit setup?', a: 'Fixtures are explicit, composable, and scoped (function/class/module/session) via arguments, rather than implicit setUp/tearDown methods.'},
  ],
  sql: [
    {q: 'WHERE vs HAVING?', a: 'WHERE filters rows before grouping; HAVING filters groups after aggregation.'},
    {q: 'INNER vs LEFT JOIN?', a: 'INNER returns only matching rows. LEFT returns all left rows, with NULLs where the right side has no match.'},
    {q: 'What problem does an index solve, and its cost?', a: 'Faster lookups/sorts on indexed columns; cost is slower writes and extra storage, plus the optimiser may still ignore it.'},
    {q: 'What is a transaction\'s "I" in ACID?', a: 'Isolation — concurrent transactions don\'t see each other\'s uncommitted state; the isolation level tunes how strictly.'},
    {q: 'Why can `SELECT *` in production queries hurt?', a: 'Fetches unused columns (I/O, network), breaks on schema changes, and can prevent covering-index use.'},
  ],
  'ci-cd-pipelines': [
    {q: 'CI vs CD vs Continuous Deployment?', a: 'CI = merge + build + test often. Continuous Delivery = always release-ready artifact. Continuous Deployment = every green build ships automatically.'},
    {q: 'What is a quality gate?', a: 'An automated pass/fail check (tests, coverage, security scan, lint) that blocks promotion to the next stage.'},
    {q: 'Why pin action/tool versions in a pipeline?', a: 'Reproducibility and supply-chain safety — a floating tag can change under you or be compromised.'},
    {q: 'What makes a pipeline "fast feedback"?', a: 'Cheap checks first (lint/unit), parallelised jobs, caching, and failing fast so developers hear within minutes.'},
    {q: 'Blue-green vs canary?', a: 'Blue-green swaps all traffic between two identical environments. Canary shifts a small % first, watches metrics, then ramps.'},
  ],
  opentelemetry: [
    {q: 'What are the three OTel signals?', a: 'Traces, metrics, and logs — under one SDK and wire format (OTLP).'},
    {q: 'span vs trace?', a: 'A span is one timed operation with attributes; a trace is the tree of spans for one end-to-end request, linked by context propagation.'},
    {q: 'What does the Collector do?', a: 'Receives, processes (batch, filter, enrich), and exports telemetry — decoupling apps from backend-specific exporters.'},
    {q: 'What is context propagation?', a: 'Passing trace id + span id across process boundaries (usually W3C traceparent header) so spans join the same trace.'},
  ],
  'sre-observability-slos': [
    {q: 'SLI vs SLO vs SLA?', a: 'SLI is the measured number (e.g. success rate). SLO is the internal target for it. SLA is the external contract with consequences.'},
    {q: 'What is an error budget?', a: '1 − SLO over a window — the allowed amount of unreliability. Spend it on releases; freeze changes when exhausted.'},
    {q: 'Why are the four golden signals useful?', a: 'Latency, traffic, errors, saturation cover most user-facing symptoms with a small, consistent dashboard set.'},
    {q: 'monitoring vs observability?', a: 'Monitoring watches known failure modes with predefined checks. Observability is being able to ask new questions of the system from its outputs.'},
  ],
  junit: [
    {q: 'What replaced @RunWith in JUnit 5?', a: 'The extension model — @ExtendWith and registered Extension classes, composable rather than one runner.'},
    {q: 'What is @ParameterizedTest?', a: 'Runs the same test once per argument set from a source (@ValueSource, @CsvSource, @MethodSource, ...).'},
    {q: 'Default lifecycle: new instance per test?', a: 'Yes — JUnit 5 creates a fresh test-class instance per test method unless @TestInstance(PER_CLASS) is set.'},
  ],
  terraform: [
    {q: 'What is the state file for?', a: 'Mapping config resources to real infrastructure IDs and tracking metadata, so plan can compute the diff.'},
    {q: 'plan vs apply?', a: 'plan shows the intended changes without making them; apply executes them (optionally against a saved plan).'},
    {q: 'Why use remote state with locking?', a: 'Shared source of truth for a team and prevention of concurrent applies corrupting state.'},
    {q: 'What does a module give you?', a: 'A reusable, parameterised bundle of resources with typed inputs/outputs.'},
  ],
  'linux-administration': [
    {q: 'What does load average actually measure?', a: 'Average number of processes runnable or in uninterruptible sleep over 1/5/15 min — not a direct CPU %.'},
    {q: 'Where does a process\'s open-file info live?', a: '/proc/<pid>/fd and /proc/<pid>/status; `lsof` and `ss` summarise it.'},
    {q: 'What is the difference between a hard and soft link?', a: 'A hard link is another name for the same inode (same filesystem). A symlink is a file that points at a path and can dangle.'},
    {q: 'How does systemd decide start order?', a: 'Dependency directives (Requires/Wants/After/Before) — ordering (After) is separate from requirement (Requires).'},
  ],
  'incident-response-mastery': [
    {q: 'What does the Incident Commander own?', a: 'Coordination and decisions — not hands-on fixing. They delegate work, manage comms cadence, and keep the timeline.'},
    {q: 'Why blameless postmortems?', a: 'People share what really happened only when they won\'t be punished for it, which is the only way to find systemic causes.'},
    {q: 'mitigate vs resolve?', a: 'Mitigate = stop customer impact now (roll back, failover, feature-flag). Resolve = fix the underlying cause afterwards.'},
    {q: 'What belongs in the first status update?', a: 'What users see, when it started, severity, that you\'re engaged, and the time of the next update — not root cause speculation.'},
  ],
};

/** Flat list of cards: {id, topicId, topicTitle, category, href, q, a}. */
export const cards = Object.entries(BANK).flatMap(([topicId, qs]) => {
  const topic = topics.find((t) => t.id === topicId);
  return qs.map((qa, i) => ({
    id: `${topicId}:${i}`,
    topicId,
    topicTitle: topic?.title || topicId,
    category: topic?.category || 'sde',
    href: topic?.href,
    ...qa,
  }));
});

export const quizTopicIds = Object.keys(BANK);
