import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {ADS_ENABLED, CONSENT_KEY} from '@site/src/data/site';
import styles from './styles.module.css';

/**
 * Cookie-consent strip. Only ever shown when ads are enabled (AdSense sets
 * cookies); GoatCounter is cookieless so it needs no consent. The choice is
 * stored in localStorage and read back by the AdSense personalisation flag.
 *
 * Mounted once from src/theme/Root.js.
 */
export default function ConsentBanner() {
  const [choice, setChoice] = useState('pending');

  useEffect(() => {
    if (!ADS_ENABLED) return;
    try {
      setChoice(localStorage.getItem(CONSENT_KEY) || 'unset');
    } catch (e) {
      setChoice('unset');
    }
  }, []);

  function decide(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* storage blocked — honour the choice for this page load only */
    }
    // Tell Google whether personalised ads are allowed for this session.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds =
        value === 'accepted' ? 0 : 1;
    } catch (e) {
      /* AdSense not on the page */
    }
    setChoice(value);
  }

  if (!ADS_ENABLED || choice === 'pending' || choice === 'accepted' || choice === 'rejected') {
    return null;
  }

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        This site uses cookies for advertising. Analytics is cookieless. See the{' '}
        <Link to="/privacy">Privacy Policy</Link> and{' '}
        <Link to="/cookie-policy">Cookie Policy</Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={() => decide('rejected')}>
          Reject non-essential
        </button>
        <button type="button" className={styles.accept} onClick={() => decide('accepted')}>
          Accept
        </button>
      </div>
    </div>
  );
}
