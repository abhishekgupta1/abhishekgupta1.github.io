import React, {useCallback} from 'react';
import clsx from 'clsx';
import {extractBranchesFromContent} from '@site/src/components/MindMap/extractBranches';
import {generateMindMapHtml} from '@site/src/components/MindMap/template';
import {slugify} from '@site/src/components/MindMap/utils';
import styles from './styles.module.css';

function downloadHtml(filename, html) {
  const blob = new Blob([html], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a self-contained, downloadable interactive mind map HTML file
 * summarizing either DOM content (targetRef - branches are mined from its
 * own heading structure) or an explicit `branches` array (e.g. built from a
 * project card's structured fields). No content is invented beyond what's
 * passed in or found in the source.
 */
export default function MindMapButton({targetRef, branches: providedBranches, title, subtitle, variant = 'toolbar'}) {
  const handleClick = useCallback(() => {
    const branches = providedBranches ?? extractBranchesFromContent(targetRef && targetRef.current);
    if (!branches || branches.length === 0) return;
    const html = generateMindMapHtml({title, subtitle, branches});
    downloadHtml(`${slugify(title)}-mind-map.html`, html);
  }, [providedBranches, targetRef, title, subtitle]);

  return (
    <button
      type="button"
      className={clsx(variant === 'inline' ? styles.inlineButton : styles.button)}
      onClick={handleClick}
    >
      🧠 Mind map
    </button>
  );
}
