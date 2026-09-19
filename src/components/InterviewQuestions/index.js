import React, {useState} from 'react';
import LevelBadge from '@site/src/components/LevelBadge';
import styles from './styles.module.css';

/**
 * Collapsible interview Q&A. Answers are markdown, so keep the blank lines.
 *
 *   <InterviewQuestions>
 *     <InterviewQuestions.Q question="What is auto-waiting?" level="beginner">
 *
 *     Playwright waits for an element to be actionable before acting...
 *
 *     </InterviewQuestions.Q>
 *   </InterviewQuestions>
 */
function Q({question, level, children}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.q}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}>
        <span className={styles.chev} aria-hidden="true">{open ? '▾' : '▸'}</span>
        <span className={styles.qText}>{question}</span>
        {level && <LevelBadge level={level} compact />}
      </button>
      {open && <div className={styles.a}>{children}</div>}
    </div>
  );
}

export default function InterviewQuestions({title = 'Interview questions', children}) {
  return (
    <section className={styles.wrap} aria-label={title}>
      <div className={styles.head}>
        <span aria-hidden="true">🎤</span> {title}
      </div>
      <div className={styles.list}>{children}</div>
    </section>
  );
}

InterviewQuestions.Q = Q;
