import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {cards} from '@site/src/data/quiz';
import {review, isDue, stats, resetAll} from '@site/src/utils/srs';
import styles from './quiz.module.css';

const TITLE = 'Quiz';
const DESCRIPTION =
  'Spaced-repetition flashcards drawn from the cheat sheets. Grade your recall; cards you miss come back sooner. Stored in your browser only.';

const GRADES = [
  {g: 0, label: 'Again', cls: 'again'},
  {g: 1, label: 'Hard', cls: 'hard'},
  {g: 2, label: 'Good', cls: 'good'},
  {g: 3, label: 'Easy', cls: 'easy'},
];

const TOPICS = [...new Set(cards.map((c) => c.topicId))];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Quiz() {
  const [topic, setTopic] = useState('all');
  const [tick, setTick] = useState(0); // bump to recompute after a review
  const [queue, setQueue] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [reviewedThisSession, setReviewed] = useState(0);

  const pool = useMemo(
    () => (topic === 'all' ? cards : cards.filter((c) => c.topicId === topic)),
    [topic],
  );

  // Build the due queue whenever the topic changes or a review lands.
  useEffect(() => {
    const due = pool.filter((c) => isDue(c.id));
    setQueue(shuffle(due.length ? due : pool));
    setRevealed(false);
  }, [pool, tick]);

  const current = queue[0];
  const s = stats(pool.map((c) => c.id));

  function grade(g) {
    if (!current) return;
    review(current.id, g);
    setReviewed((n) => n + 1);
    setQueue((q) => q.slice(1));
    setRevealed(false);
    if (queue.length <= 1) setTick((t) => t + 1);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <label>
          Deck:{' '}
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="all">All topics ({cards.length})</option>
            {TOPICS.map((t) => {
              const c = cards.find((x) => x.topicId === t);
              return (
                <option key={t} value={t}>
                  {c.topicTitle} ({cards.filter((x) => x.topicId === t).length})
                </option>
              );
            })}
          </select>
        </label>
        <span className={styles.stat}>
          <strong>{s.due}</strong> due · <strong>{s.learned}</strong> learned ·{' '}
          <strong>{reviewedThisSession}</strong> this session
        </span>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            if (window.confirm('Reset all quiz progress in this browser?')) {
              resetAll();
              setTick((t) => t + 1);
              setReviewed(0);
            }
          }}>
          Reset
        </button>
      </div>

      {!current ? (
        <div className={styles.done}>
          <p>🎉 Nothing due in this deck right now.</p>
          <p className={styles.muted}>
            Come back later, or switch decks above. Cards you graded return on a
            schedule.
          </p>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <span className={styles.topicTag}>{current.topicTitle}</span>
            {current.href && (
              <Link to={current.href} className={styles.sourceLink}>
                cheat sheet ↗
              </Link>
            )}
          </div>

          <p className={styles.q}>{current.q}</p>

          {revealed ? (
            <>
              <hr className={styles.rule} />
              <p className={styles.a}>{current.a}</p>
              <div className={styles.grades}>
                {GRADES.map((x) => (
                  <button
                    key={x.g}
                    type="button"
                    className={clsx(styles.grade, styles[x.cls])}
                    onClick={() => grade(x.g)}>
                    {x.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <button
              type="button"
              className={styles.reveal}
              onClick={() => setRevealed(true)}>
              Show answer
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuizPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.page}>
        <h1>{TITLE}</h1>
        <p className={styles.lede}>
          Recall practice from the cheat sheets. Grade yourself honestly —
          <em>Again</em> brings a card straight back, <em>Good</em> pushes it out
          a few days. Everything is stored in your browser; nothing is uploaded.
        </p>
        <BrowserOnly fallback={<p>Loading deck…</p>}>{() => <Quiz />}</BrowserOnly>
      </main>
    </Layout>
  );
}
