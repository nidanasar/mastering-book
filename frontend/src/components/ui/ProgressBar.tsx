import React from 'react';
import clsx from 'clsx';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export function ProgressBar({
  current,
  total,
  showPercentage = true,
  showLabel = true,
  label,
  size = 'medium',
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className={clsx(styles.progressBarContainer, styles[size])}>
      {(showLabel || label) && (
        <div className={styles.label}>
          {label || 'Progress'}
          {showPercentage && (
            <span className={styles.percentage}>{percentage}%</span>
          )}
        </div>
      )}
      <div className={styles.progressBar}>
        <div
          className={clsx(styles.progressFill, animated && styles.animated)}
          style={{ width: `${percentage}%` }}
        >
          {animated && <div className={styles.shimmer} />}
        </div>
      </div>
      <div className={styles.stats}>
        <span className={styles.current}>{current.toLocaleString()}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.total}>{total.toLocaleString()}</span>
        <span className={styles.xpLabel}>XP</span>
      </div>
    </div>
  );
}
