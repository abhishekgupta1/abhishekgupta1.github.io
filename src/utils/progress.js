/**
 * localStorage-backed learning progress, keyed by cheat sheet id (matches
 * src/data/topics.js `id`). Per-browser only, same tradeoff devsheets.io
 * makes for its own progress dashboard - no account, no server round trip.
 */

const STORAGE_KEY = 'cheatsheet-progress';

export const STATUS = {
  IN_PROGRESS: 'in-progress',
  KNOWN: 'known',
};

export const STATUS_LABEL = {
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.KNOWN]: 'Known',
};

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function getAllProgress() {
  if (typeof window === 'undefined') return {};
  return safeParse(window.localStorage.getItem(STORAGE_KEY) || '{}');
}

export function getStatus(id) {
  return getAllProgress()[id] || null;
}

export function setStatus(id, status) {
  if (typeof window === 'undefined') return;
  const all = getAllProgress();
  if (status) {
    all[id] = status;
  } else {
    delete all[id];
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent('cheatsheet-progress-changed'));
}

export function clearAllProgress() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cheatsheet-progress-changed'));
}
