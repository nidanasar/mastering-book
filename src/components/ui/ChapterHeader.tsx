import React from 'react';
import clsx from 'clsx';
import styles from './ChapterHeader.module.css';

export interface ChapterHeaderProps {
  principleNumber: number;
  title: string;
  carnegieQuote: string;
  badge: string;
  xp: number;
  part: number;
  partChallenge?: string;
  estimatedReading: string;
  estimatedPractice: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedChapters?: number[];
}

export function ChapterHeader({
  principleNumber,
  title,
  carnegieQuote,
  badge,
  xp,
  part,
  partChallenge,
  estimatedReading,
  estimatedPractice,
  difficulty,
  relatedChapters,
}: ChapterHeaderProps) {
  const difficultyIcons = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
  };

  return (
    <div className={styles.chapterHeader}>
      <div className={styles.badge}>
        <span className={styles.badgeIcon}>🏆</span>
        <span className={styles.badgeName}>{badge}</span>
        <span className={styles.badgeXp}>+{xp} XP</span>
      </div>

      <h1 className={styles.title}>
        <span className={styles.principleNumber}>Principle #{principleNumber}</span>
        {title}
      </h1>

      <div className={styles.quote}>
        <span className={styles.quoteIcon}>"</span>
        {carnegieQuote}
        <span className={styles.quoteIcon}>"</span>
        <span className={styles.quoteAuthor}>— Dale Carnegie</span>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>📖</span>
          Part {part}{partChallenge && ` • ${partChallenge}`}
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>⏱️</span>
          {estimatedReading} read
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>🎯</span>
          {estimatedPractice} practice
        </span>
        <span className={styles.metaItem}>
          <span className={styles.metaIcon}>{difficultyIcons[difficulty]}</span>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
        {relatedChapters && relatedChapters.length > 0 && (
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>🔗</span>
            See Chapters {relatedChapters.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}
