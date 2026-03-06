import React from 'react';
import { useXP } from '../context/XPContext';
import { ProgressBar } from './ui/ProgressBar';
import styles from './XPDisplay.module.css';

export interface XPDisplayProps {
  compact?: boolean;
}

export function XPDisplay({ compact = false }: XPDisplayProps) {
  const { progress } = useXP();

  const unlockedBadges = progress.badges.filter((b) => b.unlocked).length;
  const completedChapters = progress.chapters.filter((c) => c.completed).length;

  if (compact) {
    return (
      <div className={styles.xpDisplayCompact}>
        <span className={styles.xpValue}>{progress.totalXp.toLocaleString()}</span>
        <span className={styles.xpLabel}>XP</span>
      </div>
    );
  }

  return (
    <div className={styles.xpDisplay}>
      <div className={styles.header}>
        <div className={styles.title}>Your Progress</div>
        <div className={styles.level}>Level {progress.level}</div>
      </div>

      <div className={styles.progressSection}>
        <ProgressBar
          current={progress.totalXp}
          total={2250}
          showPercentage
          label="Total XP"
          size="medium"
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>🏆</span>
          <span className={styles.statValue}>{unlockedBadges}</span>
          <span className={styles.statLabel}>/ 30 Badges</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>📖</span>
          <span className={styles.statValue}>{completedChapters}</span>
          <span className={styles.statLabel}>/ 30 Chapters</span>
        </div>
      </div>

      <div className={styles.recentBadges}>
        <div className={styles.recentBadgesTitle}>Recent Badges</div>
        <div className={styles.badgeList}>
          {progress.badges
            .filter((b) => b.unlocked)
            .slice(0, 5)
            .map((badge) => (
              <div key={badge.id} className={styles.miniBadge} title={badge.name}>
                {badge.icon}
              </div>
            ))}
          {unlockedBadges === 0 && (
            <div className={styles.noBadges}>Complete chapters to earn badges</div>
          )}
        </div>
      </div>
    </div>
  );
}
