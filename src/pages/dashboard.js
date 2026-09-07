import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {categories, topicsByCategory} from '@site/src/data/topics';
import {STATUS, getAllProgress, clearAllProgress} from '@site/src/utils/progress';

const PAGE_TITLE = 'Progress Dashboard';
const DESCRIPTION =
  "Track which cheat sheets you've learned. Per-browser, no account needed — same tradeoff devsheets.io makes.";

function useProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getAllProgress());
    const onChange = () => setProgress(getAllProgress());
    window.addEventListener('cheatsheet-progress-changed', onChange);
    return () => window.removeEventListener('cheatsheet-progress-changed', onChange);
  }, []);

  return progress;
}

function StatusBadge({status}) {
  if (status === STATUS.KNOWN) {
    return <span className="progress-badge progress-badge--known">✅ Known</span>;
  }
  if (status === STATUS.IN_PROGRESS) {
    return <span className="progress-badge progress-badge--in-progress">🕓 In Progress</span>;
  }
  return <span className="progress-badge progress-badge--none">Not started</span>;
}

export default function Dashboard() {
  const progress = useProgress();
  const [confirmingClear, setConfirmingClear] = useState(false);
  const allTopics = categories.flatMap((c) => topicsByCategory(c.key));
  const knownCount = allTopics.filter((t) => progress[t.id] === STATUS.KNOWN).length;
  const inProgressCount = allTopics.filter((t) => progress[t.id] === STATUS.IN_PROGRESS).length;
  const total = allTopics.length;
  const pct = total === 0 ? 0 : Math.round((knownCount / total) * 100);

  return (
    <Layout title={PAGE_TITLE} description={DESCRIPTION}>
      <main className="progress-dashboard">
        <h1>Progress Dashboard</h1>
        <p>
          Mark sheets as known from their own page — this view just tallies it up. Not sure
          where to start? Try the <Link to="/start">focus picker</Link>.
        </p>

        <div className="progress-summary">
          <div className="progress-summary-stats">
            <span>
              <strong>{knownCount}</strong> known
            </span>
            <span>
              <strong>{inProgressCount}</strong> in progress
            </span>
            <span>
              <strong>{total}</strong> total
            </span>
          </div>
          <div className="progress-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar-fill" style={{width: `${pct}%`}} />
          </div>
          {(knownCount > 0 || inProgressCount > 0) &&
            (confirmingClear ? (
              <span className="progress-clear-confirm">
                Clear all progress?{' '}
                <button
                  type="button"
                  className="progress-clear-btn progress-clear-btn--danger"
                  onClick={() => {
                    clearAllProgress();
                    setConfirmingClear(false);
                  }}>
                  Yes, clear it
                </button>
                <button type="button" className="progress-clear-btn" onClick={() => setConfirmingClear(false)}>
                  Cancel
                </button>
              </span>
            ) : (
              <button type="button" className="progress-clear-btn" onClick={() => setConfirmingClear(true)}>
                Clear all progress
              </button>
            ))}
        </div>

        {categories.map((category) => (
          <section key={category.key}>
            <h2 className="cheat-category-heading">{category.label}</h2>
            <div className="cheat-landing-grid">
              {topicsByCategory(category.key).map((topic) => (
                <Link
                  key={topic.id}
                  to={topic.href}
                  className={clsx('cheat-tile', `cheat-tile--${category.key}`, 'progress-tile')}>
                  <span>
                    {topic.emoji} {topic.title}
                  </span>
                  <StatusBadge status={progress[topic.id]} />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}
