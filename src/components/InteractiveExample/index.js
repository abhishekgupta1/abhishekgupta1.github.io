import React, {useState} from 'react';
import styles from './styles.module.css';

/**
 * A concept paired with something you can poke at. Two tabs: "Concept" (the
 * idea) and "Try it" (a worked example, optionally runnable, optionally with
 * a link to an online sandbox).
 *
 *   <InteractiveExample title="Auto-waiting" sandboxUrl="https://try.playwright.tech/">
 *     <InteractiveExample.Concept>
 *
 *     A locator re-queries the DOM every time you use it...
 *
 *     </InteractiveExample.Concept>
 *     <InteractiveExample.Demo runnable code={`console.log(1 + 1)`}>
 *
 *     ```js
 *     console.log(1 + 1);
 *     ```
 *
 *     </InteractiveExample.Demo>
 *   </InteractiveExample>
 */
function Concept({children}) {
  return <div className={styles.pane}>{children}</div>;
}

function Demo({children, runnable = false, code}) {
  const [out, setOut] = useState(null);

  function run() {
    const lines = [];
    const shim = {
      log: (...a) => lines.push(a.map(String).join(' ')),
      error: (...a) => lines.push('⚠ ' + a.map(String).join(' ')),
      warn: (...a) => lines.push('⚠ ' + a.map(String).join(' ')),
    };
    try {
      // Author-written snippet (not user input) — safe to evaluate.
      // eslint-disable-next-line no-new-func
      new Function('console', code)(shim);
    } catch (e) {
      lines.push('⚠ ' + (e && e.message ? e.message : String(e)));
    }
    setOut(lines.length ? lines.join('\n') : '(no output)');
  }

  return (
    <div className={styles.pane}>
      {children}
      {runnable && code && (
        <div className={styles.runner}>
          <button type="button" className={styles.runBtn} onClick={run}>
            ▶ Run
          </button>
          {out !== null && <pre className={styles.output}>{out}</pre>}
        </div>
      )}
    </div>
  );
}

export default function InteractiveExample({title = 'Interactive example', sandboxUrl, children}) {
  const [tab, setTab] = useState('concept');
  const kids = React.Children.toArray(children);
  const concept = kids.find((c) => c.type === Concept);
  const demo = kids.find((c) => c.type === Demo);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.icon} aria-hidden="true">🧪</span>
        <span className={styles.title}>{title}</span>
        {sandboxUrl && (
          <a className={styles.sandbox} href={sandboxUrl} target="_blank" rel="noopener noreferrer">
            Open sandbox ↗
          </a>
        )}
      </div>
      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'concept'}
          className={tab === 'concept' ? styles.tabActive : styles.tab}
          onClick={() => setTab('concept')}>
          Concept
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'demo'}
          className={tab === 'demo' ? styles.tabActive : styles.tab}
          onClick={() => setTab('demo')}>
          Try it
        </button>
      </div>
      <div className={styles.body}>{tab === 'concept' ? concept : demo}</div>
    </div>
  );
}

InteractiveExample.Concept = Concept;
InteractiveExample.Demo = Demo;
