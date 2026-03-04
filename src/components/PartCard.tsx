import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './PartCard.module.css';

export interface PartCardProps {
  partNumber: number;
  title: string;
  icon: string;
  badgeName: string;
  xp: number;
  days: string;
  description: string;
  chapters: string[];
  chapterLinks: string[];
  challengeLink?: string;
}

export function PartCard({
  partNumber,
  title,
  icon,
  badgeName,
  xp,
  days,
  description,
  chapters,
  chapterLinks,
  challengeLink,
}: PartCardProps) {
  return (
    <div className={styles.partCard}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <span className={styles.icon}>{icon}</span>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.badgeName}>🏆 {badgeName}</div>
          </div>
        </div>
        <div className={styles.meta}>
          <div className={styles.xp}>{xp.toLocaleString()} XP</div>
          <div className={styles.days}>{days}</div>
        </div>
      </div>

      <p className={styles.description}>{description}</p>

      <ul className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <li key={index} className={styles.chapter}>
            {chapterLinks[index] ? (
              <Link to={chapterLinks[index]} className={styles.chapterLink}>
                {chapter}
              </Link>
            ) : (
              <span className={styles.chapterComingSoon}>{chapter} (Coming Soon)</span>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <Link to={chapterLinks[0] || '#'} className={clsx(styles.button, styles.buttonPrimary)}>
          Start Part {partNumber}
        </Link>
        {challengeLink && (
          <Link to={challengeLink} className={clsx(styles.button, styles.buttonSecondary)}>
            View Challenge
          </Link>
        )}
      </div>
    </div>
  );
}
