import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ChallengeChecklist.module.css';

export interface ChallengeDay {
  day: number;
  task: string;
  xp: number;
  completed?: boolean;
}

export interface ChallengeChecklistProps {
  part: number;
  title: string;
  days: ChallengeDay[];
  totalXp: number;
  onDayComplete?: (day: number, completed: boolean) => void;
}

export function ChallengeChecklist({
  part,
  title,
  days,
  totalXp,
  onDayComplete,
}: ChallengeChecklistProps) {
  const [completedDays, setCompletedDays] = useState<Set<number>>(
    new Set(days.filter((d) => d.completed).map((d) => d.day))
  );

  const handleToggle = (day: number) => {
    const newCompleted = new Set(completedDays);
    const isCompleting = !newCompleted.has(day);

    if (isCompleting) {
      newCompleted.add(day);
    } else {
      newCompleted.delete(day);
    }

    setCompletedDays(newCompleted);
    onDayComplete?.(day, isCompleting);
  };

  const completedCount = completedDays.size;
  const progress = Math.round((completedCount / days.length) * 100);
  const earnedXp = days
    .filter((d) => completedDays.has(d.day))
    .reduce((sum, d) => sum + d.xp, 0);

  return (
    <div className={styles.challengeChecklist}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>📅 {title}</h3>
          <div className={styles.subtitle}>Part {part} • 7-Day Challenge</div>
        </div>
        <div className={styles.xpSummary}>
          <div className={styles.xpEarned}>+{earnedXp} XP</div>
          <div className={styles.xpTotal}>of {totalXp} XP</div>
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {completedCount} of {days.length} days complete ({progress}%)
        </div>
      </div>

      <ul className={styles.items}>
        {days.map((day, index) => {
          const isCompleted = completedDays.has(day.day);
          return (
            <li
              key={day.day}
              className={clsx(
                styles.item,
                isCompleted && styles.itemCompleted
              )}
            >
              <button
                className={clsx(
                  styles.checkbox,
                  isCompleted && styles.checkboxChecked
                )}
                onClick={() => handleToggle(day.day)}
                aria-label={`Mark day ${day.day} as ${isCompleted ? 'incomplete' : 'complete'}`}
                type="button"
              >
                {isCompleted && '✓'}
              </button>
              <div className={styles.content}>
                <div className={styles.dayLabel}>Day {day.day}</div>
                <div className={styles.task}>{day.task}</div>
                {day.xp > 0 && (
                  <div className={styles.xpBadge}>+{day.xp} XP</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
