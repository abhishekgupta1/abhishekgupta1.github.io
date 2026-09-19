/**
 * Tiny spaced-repetition store for the /quiz page. localStorage only, one
 * record per card id. A trimmed SM-2: grade the recall 0-3, the interval
 * grows on success and resets on failure.
 */
const KEY = 'quiz-srs';
const DAY = 86_400_000;

function readAll() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('quiz-srs-changed'));
  } catch {
    /* storage disabled */
  }
}

export function getCard(id) {
  return readAll()[id] || {ease: 2.3, reps: 0, intervalDays: 0, due: 0, lapses: 0};
}

/** grade: 0 again · 1 hard · 2 good · 3 easy */
export function review(id, grade) {
  const all = readAll();
  const c = all[id] || {ease: 2.3, reps: 0, intervalDays: 0, due: 0, lapses: 0};
  if (grade === 0) {
    c.reps = 0;
    c.intervalDays = 0;
    c.lapses += 1;
    c.ease = Math.max(1.3, c.ease - 0.2);
  } else {
    c.ease = Math.max(1.3, c.ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
    c.reps += 1;
    c.intervalDays =
      c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.intervalDays * c.ease) || 6;
  }
  c.due = Date.now() + c.intervalDays * DAY;
  c.last = Date.now();
  all[id] = c;
  writeAll(all);
  return c;
}

export function isDue(id, now = Date.now()) {
  return getCard(id).due <= now;
}

export function stats(ids) {
  const all = readAll();
  const now = Date.now();
  let due = 0;
  let learned = 0;
  for (const id of ids) {
    const c = all[id];
    if (!c || c.due <= now) due += 1;
    if (c && c.reps >= 2) learned += 1;
  }
  return {due, learned, total: ids.length};
}

export function resetAll() {
  writeAll({});
}
