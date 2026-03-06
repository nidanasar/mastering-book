import React from 'react';
import clsx from 'clsx';
import styles from './MissionCard.module.css';

export interface MissionCardProps {
  title: string;
  xp: number;
  successCriteria: string[];
  reflectionQuestions: string[];
  bonusXp?: string;
  timeEstimate?: string;
}

export function MissionCard({
  title,
  xp,
  successCriteria,
  reflectionQuestions,
  bonusXp,
  timeEstimate,
}: MissionCardProps) {
  return (
    <div className={styles.missionCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>🎯 {title}</h3>
        <div className={styles.xpBadge}>+{xp} XP</div>
      </div>

      {timeEstimate && (
        <div className={styles.timeEstimate}>
          <span className={styles.timeIcon}>⏱️</span>
          {timeEstimate}
        </div>
      )}

      <div className={styles.criteria}>
        <div className={styles.criteriaTitle}>
          <span className={styles.criteriaIcon}>✓</span>
          Success Criteria
        </div>
        <ul className={styles.criteriaList}>
          {successCriteria.map((criteria, index) => (
            <li key={index}>{criteria}</li>
          ))}
        </ul>
      </div>

      <div className={styles.reflection}>
        <div className={styles.reflectionTitle}>
          <span className={styles.reflectionIcon}>💭</span>
          Reflection Questions
        </div>
        <ol className={styles.reflectionList}>
          {reflectionQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ol>
      </div>

      {bonusXp && (
        <div className={styles.bonus}>
          <span className={styles.bonusIcon}>⭐</span>
          <span className={styles.bonusText}>
            <strong>Bonus:</strong> {bonusXp}
          </span>
        </div>
      )}
    </div>
  );
}
