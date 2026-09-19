import React from 'react';
import LevelBadge from '@site/src/components/LevelBadge';
import styles from './styles.module.css';

/**
 * Beginner -> Intermediate -> Advanced path for a topic. Each stage says what
 * to learn and what you can do once you've got it.
 *
 *   <LearningPath>
 *     <LearningPath.Stage level="beginner" outcome="Run and read a test suite">
 *
 *     - Install, project layout, first test
 *     - Locators and assertions
 *
 *     </LearningPath.Stage>
 *     <LearningPath.Stage level="intermediate" outcome="...">...</LearningPath.Stage>
 *     <LearningPath.Stage level="advanced" outcome="...">...</LearningPath.Stage>
 *   </LearningPath>
 */
function Stage({level = 'beginner', title, outcome, children}) {
  return (
    <li className={styles.stage}>
      <div className={styles.stageHead}>
        <LevelBadge level={level} />
        {title && <span className={styles.stageTitle}>{title}</span>}
      </div>
      <div className={styles.stageBody}>{children}</div>
      {outcome && (
        <p className={styles.outcome}>
          <span aria-hidden="true">✅ </span>
          <strong>You can now:</strong> {outcome}
        </p>
      )}
    </li>
  );
}

export default function LearningPath({title = 'Learning path', children}) {
  return (
    <section className={styles.wrap} aria-label={title}>
      <div className={styles.head}>
        <span aria-hidden="true">🧭</span> {title}
      </div>
      <ol className={styles.list}>{children}</ol>
    </section>
  );
}

LearningPath.Stage = Stage;
