import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './styles.module.css';

// Finds the start of the word containing (or beginning at) `index`, so a
// seek never lands mid-word - it walks back to the nearest preceding
// whitespace character.
function findWordStart(text, index) {
  if (index <= 0) return 0;
  if (index >= text.length) return text.length;
  let i = index;
  while (i > 0 && !/\s/.test(text[i - 1])) i--;
  return i;
}

/**
 * Reads the text content of `targetRef` aloud using the browser's built-in
 * SpeechSynthesis API (Web Speech API). No external services, no audio
 * files, no dependencies - works fully client-side wherever the browser
 * supports it, and simply doesn't render otherwise.
 *
 * Includes a scrubbable timeline: since SpeechSynthesis has no native seek,
 * position is tracked as a character offset into the source text (updated
 * from `onboundary` word events) and "seeking" restarts speech from the
 * word nearest the requested offset.
 */
export default function ListenButton({targetRef}) {
  // Start as unsupported on both server and the first client render so the
  // hydrated markup matches the server-rendered markup exactly; flip to true
  // in an effect (client-only) once we know the API is actually available.
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | playing | paused
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState('');
  const [textLength, setTextLength] = useState(0);
  const [position, setPosition] = useState(0);
  // Non-null only while the user is actively dragging/adjusting the
  // timeline, so the slider reflects the drag instead of live playback.
  const [scrubPosition, setScrubPosition] = useState(null);

  // Chrome garbage-collects a SpeechSynthesisUtterance that has no
  // surviving JS reference, silently killing playback before it makes
  // sound. Keeping it here for the duration of playback prevents that.
  const utteranceRef = useRef(null);
  const fullTextRef = useRef('');
  const baseOffsetRef = useRef(0);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM && 'speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  useEffect(() => {
    if (!supported) return undefined;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const englishVoices = useMemo(
    () => voices.filter((v) => v.lang.toLowerCase().startsWith('en')),
    [voices],
  );
  const voiceOptions = englishVoices.length > 0 ? englishVoices : voices;

  const getText = useCallback(() => {
    const node = targetRef.current;
    if (!node) return '';
    // Diagram SVGs (e.g. "Mental model" callouts) repeat their node labels
    // as many small positioned <text> elements - great visually, but read
    // aloud as disconnected word fragments. Strip just the <svg> from a
    // clone so the surrounding prose (including the diagram's caption) is
    // still read, without the label soup.
    const clone = node.cloneNode(true);
    clone.querySelectorAll('svg').forEach((el) => el.remove());
    return clone.innerText || clone.textContent || '';
  }, [targetRef]);

  // Populate the timeline as soon as the content is available, so it's
  // visible (and scrubbable) even before the user presses Play.
  useEffect(() => {
    if (!supported) return;
    const text = getText();
    fullTextRef.current = text;
    setTextLength(text.length);
  }, [supported, getText]);

  const speakFrom = useCallback(
    (offset, {andStatus = 'playing'} = {}) => {
      const synth = window.speechSynthesis;
      const text = fullTextRef.current;
      const start = findWordStart(text, Math.max(0, Math.min(offset, text.length)));

      synth.cancel();

      if (start >= text.length) {
        utteranceRef.current = null;
        baseOffsetRef.current = text.length;
        setPosition(text.length);
        setStatus('idle');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text.slice(start));
      const selectedVoice = voiceOptions.find((v) => v.voiceURI === voiceURI);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = 1;

      utterance.onboundary = (e) => {
        if (utteranceRef.current !== utterance) return;
        setPosition(baseOffsetRef.current + e.charIndex);
      };
      utterance.onend = () => {
        if (utteranceRef.current !== utterance) return;
        utteranceRef.current = null;
        setStatus('idle');
        setPosition(fullTextRef.current.length);
      };
      utterance.onerror = () => {
        if (utteranceRef.current !== utterance) return;
        utteranceRef.current = null;
        setStatus('idle');
      };

      baseOffsetRef.current = start;
      utteranceRef.current = utterance;
      setPosition(start);
      synth.speak(utterance);
      setStatus(andStatus);
    },
    [voiceOptions, voiceURI],
  );

  const handlePlay = useCallback(() => {
    const synth = window.speechSynthesis;

    if (status === 'paused') {
      synth.resume();
      setStatus('playing');
      return;
    }

    const text = getText();
    if (!text.trim()) return;
    fullTextRef.current = text;
    setTextLength(text.length);
    speakFrom(0);
  }, [status, getText, speakFrom]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setStatus('paused');
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    baseOffsetRef.current = 0;
    setStatus('idle');
    setPosition(0);
  }, []);

  // Timeline drag: track the requested position live for a responsive
  // slider, but only actually restart speech once the drag is released.
  const handleScrubChange = useCallback((e) => {
    setScrubPosition(Number(e.target.value));
  }, []);

  const handleScrubCommit = useCallback(
    (e) => {
      const target = Number(e.target.value);
      setScrubPosition(null);
      if (!fullTextRef.current) return;
      speakFrom(target, {andStatus: status === 'paused' ? 'paused' : 'playing'});
      if (status === 'paused') window.speechSynthesis.pause();
    },
    [speakFrom, status],
  );

  if (!supported) return null;

  const shownPosition = scrubPosition ?? position;
  const percent = textLength > 0 ? Math.round((shownPosition / textLength) * 100) : 0;

  return (
    <div className={styles.container}>
      {status === 'playing' ? (
        <button type="button" className={styles.button} onClick={handlePause}>
          ⏸ Pause
        </button>
      ) : (
        <button type="button" className={styles.button} onClick={handlePlay}>
          🔊 {status === 'paused' ? 'Resume' : 'Listen'}
        </button>
      )}
      {status !== 'idle' && (
        <button type="button" className={styles.iconButton} onClick={handleStop} aria-label="Stop">
          ⏹
        </button>
      )}
      {voiceOptions.length > 0 && (
        <select
          className={styles.select}
          value={voiceURI}
          onChange={(e) => setVoiceURI(e.target.value)}
          disabled={status !== 'idle'}
          aria-label="Voice"
        >
          <option value="">Default voice</option>
          {voiceOptions.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      )}
      {status !== 'idle' && (
        <span className={styles.status}>{status === 'playing' ? 'Reading…' : 'Paused'}</span>
      )}
      {textLength > 0 && (
        <div className={styles.timelineRow}>
          <input
            type="range"
            className={styles.timeline}
            min={0}
            max={textLength}
            value={shownPosition}
            onChange={handleScrubChange}
            onMouseUp={handleScrubCommit}
            onTouchEnd={handleScrubCommit}
            onKeyUp={handleScrubCommit}
            aria-label="Playback position"
          />
          <span className={styles.timelineLabel}>{percent}%</span>
        </div>
      )}
    </div>
  );
}
