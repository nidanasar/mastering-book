import React from 'react';
import clsx from 'clsx';
import styles from './BadgeCard.module.css';

export interface BadgeCardProps {
  badgeName: string;
  xp: number;
  icon: string;
  chapter: number;
  part: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export function BadgeCard({
  badgeName,
  xp,
  icon,
  chapter,
  part,
  unlocked,
  unlockedDate,
}: BadgeCardProps) {
  return (
    <div
      className={clsx(
        styles.badgeCard,
        unlocked ? styles.unlocked : styles.locked
      )}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.name}>{badgeName}</div>
      <div className={styles.xp}>+{xp} XP</div>
      <div className={styles.chapter}>Chapter {chapter}</div>
      {unlocked && unlockedDate && (
        <div className={styles.unlockedDate}>Earned {unlockedDate}</div>
      )}
      {!unlocked && (
        <div className={styles.lockedOverlay}>
          <span className={styles.lockIcon}>🔒</span>
          <span>Complete Chapter {chapter} to unlock</span>
        </div>
      )}
    </div>
  );
}
