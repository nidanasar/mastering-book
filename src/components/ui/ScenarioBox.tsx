import React from 'react';
import clsx from 'clsx';
import styles from './ScenarioBox.module.css';

export interface ScenarioBoxProps {
  type: 'wrong-way' | 'right-way';
  context: 'family' | 'teen' | 'professional';
  title: string;
  dialogue: string;
  reaction: string;
  psychology?: string;
}

export function ScenarioBox({
  type,
  context,
  title,
  dialogue,
  reaction,
  psychology,
}: ScenarioBoxProps) {
  const isWrongWay = type === 'wrong-way';

  return (
    <div
      className={clsx(
        styles.scenarioBox,
        isWrongWay ? styles.wrongWay : styles.rightWay
      )}
    >
      <div className={styles.header}>
        <span
          className={clsx(
            styles.label,
            isWrongWay ? styles.wrongLabel : styles.rightLabel
          )}
        >
          {isWrongWay ? '⚠️ The Trap' : '✅ The Right Way'}
        </span>
        <span className={styles.contextBadge}>{context}</span>
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.dialogue}>
        <div className={styles.dialogueLabel}>What you say:</div>
        {dialogue}
      </div>

      <div className={styles.reaction}>
        <span className={styles.reactionIcon}>
          {isWrongWay ? '💭' : '✨'}
        </span>
        <span className={styles.reactionText}>{reaction}</span>
      </div>

      {psychology && (
        <div className={styles.psychology}>
          <span className={styles.psychologyIcon}>🧠</span>
          <span className={styles.psychologyText}>
            <strong>Psychology:</strong> {psychology}
          </span>
        </div>
      )}
    </div>
  );
}
