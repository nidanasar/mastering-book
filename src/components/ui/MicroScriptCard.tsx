import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './MicroScriptCard.module.css';

export interface MicroScriptCardProps {
  category: 'DMs/Texts' | 'In-Person' | 'Workplace Email';
  situation: string;
  script: string;
  context: 'family' | 'teen' | 'professional';
  tone: 'casual' | 'formal' | 'empathetic';
  copyable?: boolean;
}

export function MicroScriptCard({
  category,
  situation,
  script,
  context,
  tone,
  copyable = true,
}: MicroScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const contextColors = {
    family: 'var(--ifm-color-secondary)',
    teen: 'var(--ifm-color-primary)',
    professional: 'var(--ifm-color-info)',
  };

  const contextBackgrounds = {
    family: 'var(--ifm-color-secondary-lightest)',
    teen: 'rgba(230, 126, 34, 0.1)',
    professional: 'rgba(93, 173, 226, 0.1)',
  };

  return (
    <div className={styles.microScriptCard}>
      <div className={styles.category}>{category}</div>
      <div className={styles.situation}>{situation}</div>
      <div className={styles.scriptContainer}>
        <blockquote className={styles.script}>{script}</blockquote>
        {copyable && (
          <button
            className={clsx(styles.copyButton, copied && styles.copied)}
            onClick={handleCopy}
            title="Copy to clipboard"
            type="button"
          >
            {copied ? (
              <>
                <span className={styles.copyIcon}>✓</span>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <span className={styles.copyIcon}>📋</span>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      <div className={styles.tags}>
        <span
          className={styles.tag}
          style={{
            color: contextColors[context],
            backgroundColor: contextBackgrounds[context],
          }}
        >
          {context}
        </span>
        <span className={styles.tag}>{tone}</span>
      </div>
    </div>
  );
}
