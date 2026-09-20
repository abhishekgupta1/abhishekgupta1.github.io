import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * "Listen to podcast" control. Audio is a pre-recorded file that lives in the
 * repo (static/podcasts/), referenced per document via front matter:
 *
 *   podcast: /podcasts/my-guide.mp3
 *
 * Renders nothing when a document has no `podcast` field. The <audio> element
 * is only mounted after the first click, and uses preload="none", so pages
 * never download audio the reader didn't ask for.
 */
export default function PodcastButton({src}) {
  const [open, setOpen] = useState(false);
  const url = useBaseUrl(src || '');
  if (!src) return null;

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.button}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        🎧 {open ? 'Hide podcast' : 'Listen to podcast'}
      </button>
      {open && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio className={styles.player} controls autoPlay preload="none" src={url} />
      )}
    </div>
  );
}
