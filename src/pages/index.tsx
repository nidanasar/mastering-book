import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {PartCard} from '../components/PartCard';
import {ProgressBar} from '../components/ui/ProgressBar';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          <h1 className={styles.logoTitle}>Mastering the Art of People and Influence</h1>
        </div>
        <p className={clsx('hero__subtitle', styles.tagline)}>
          Transform Your Relationships in 30 Days
        </p>
        <p className={styles.description}>
          Master Dale Carnegie's timeless principles with interactive exercises,
          real-world scenarios, and gamified progress tracking.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.startButton)}
            to="/docs/part-1-overview">
            🚀 Start Reading Free
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.progressButton)}
            to="/docs/intro">
            📊 View Progress
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📈</span>
            <span className={styles.statValue}>2,250 XP</span>
            <span className={styles.statLabel}>Available</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🏆</span>
            <span className={styles.statValue}>30 Badges</span>
            <span className={styles.statLabel}>To Earn</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📖</span>
            <span className={styles.statValue}>30 Chapters</span>
            <span className={styles.statLabel}>Complete Path</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepIcon}>📖</div>
            <h3 className={styles.stepTitle}>Read</h3>
            <p className={styles.stepDescription}>
              Each chapter teaches one Carnegie principle with real-world scenarios
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>🎯</div>
            <h3 className={styles.stepTitle}>Practice</h3>
            <p className={styles.stepDescription}>
              Complete missions, exercises, and 7-day challenges
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>⭐</div>
            <h3 className={styles.stepTitle}>Master</h3>
            <p className={styles.stepDescription}>
              Earn XP, collect badges, and transform your relationships
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartsSection() {
  const parts = [
    {
      partNumber: 1,
      title: 'The Foundation',
      icon: '🎯',
      badgeName: 'Zen Master',
      xp: 300,
      days: 'Days 1-7',
      description: 'Stop damage, build trust, inspire action. Master the 3-Step Influence Foundation.',
      chapters: [
        'Don\'t Criticize, Condemn, or Complain',
        'Give Honest and Sincere Appreciation',
        'Arouse an Eager Want',
      ],
      chapterLinks: [
        '/docs/chapter-01-criticism-killer',
        '/docs/chapter-02-appreciation',
        '/docs/chapter-03-eager-want',
      ],
      challengeLink: '/docs/part-1-integration-challenge',
    },
    {
      partNumber: 2,
      title: 'Building Connections',
      icon: '🤝',
      badgeName: 'Relationship Builder',
      xp: 450,
      days: 'Days 8-20',
      description: 'Master the art of genuine connection and influence in every interaction.',
      chapters: [
        'Become Genuinely Interested in Others',
        'Smile (The Dollar Smile)',
        'Remember Names',
        'Be a Great Listener',
        'Talk in Terms of Their Interests',
        'Make Them Feel Important',
      ],
      chapterLinks: [
        '/docs/chapter-04-interested',
        '/docs/chapter-05-smile',
        '/docs/chapter-06-names',
        '/docs/chapter-07-listener',
        '/docs/chapter-08-interests',
        '/docs/chapter-09-important',
      ],
      challengeLink: '/docs/part-2-integration-challenge',
    },
    {
      partNumber: 3,
      title: 'Leading Others',
      icon: '👑',
      badgeName: 'Leadership Circle',
      xp: 900,
      days: 'Days 21-45',
      description: 'Transform conflict, delegate effectively, and lead without creating resentment.',
      chapters: [
        'Avoid Arguments',
        'Respect Opinions',
        'Admit Mistakes Quickly',
        'Let Them Talk',
        'Let Them Feel It\'s Their Idea',
        'See Their Side',
        'Sympathize',
        'Noble Motives',
        'Dramatize Ideas',
        'Throw Down a Challenge',
        'Start with Praise',
        'Indirect Attention to Errors',
      ],
      chapterLinks: Array(12).fill('/docs/intro'),
      challengeLink: '/docs/part-3-integration-challenge',
    },
    {
      partNumber: 4,
      title: 'Mastery',
      icon: '⭐',
      badgeName: 'Master Influencer',
      xp: 675,
      days: 'Days 46-60',
      description: 'Advanced influence techniques for family harmony, career growth, and lasting relationships.',
      chapters: [
        'Let Them Save Face',
        'Praise Every Improvement',
        'Give a Fine Reputation',
        'Use Encouragement',
        'Make Faults Easy to Correct',
        'Make Them Happy About It',
        'Magic Phrase (Safety Valve)',
        'Stop Worrying',
        'Master Influencer Status',
      ],
      chapterLinks: Array(9).fill('/docs/intro'),
      challengeLink: '/docs/part-4-integration-challenge',
    },
  ];

  return (
    <section className={styles.partsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Your Learning Path</h2>
        <p className={styles.sectionSubtitle}>
          30 chapters organized into 4 parts. Complete missions, earn XP, and master people skills.
        </p>
        <div className={styles.partsGrid}>
          {parts.map((part) => (
            <PartCard
              key={part.partNumber}
              partNumber={part.partNumber}
              title={part.title}
              icon={part.icon}
              badgeName={part.badgeName}
              xp={part.xp}
              days={part.days}
              description={part.description}
              chapters={part.chapters}
              chapterLinks={part.chapterLinks}
              challengeLink={part.challengeLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GamificationPreview() {
  return (
    <section className={styles.gamificationSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Track Your Progress</h2>
        <div className={styles.gamificationGrid}>
          <div className={styles.gamificationCard}>
            <div className={styles.gamificationIcon}>📈</div>
            <h3>XP System</h3>
            <p>Earn points for completing chapters, missions, and challenges</p>
            <ProgressBar current={0} total={2250} showPercentage label="Total XP" />
          </div>
          <div className={styles.gamificationCard}>
            <div className={styles.gamificationIcon}>🏆</div>
            <h3>Badge Collection</h3>
            <p>Unlock 30 unique badges as you master each principle</p>
            <div className={styles.badgePreview}>
              <span className={styles.badgeEmoji}>🧘</span>
              <span className={styles.badgeEmoji}>🤝</span>
              <span className={styles.badgeEmoji}>👑</span>
              <span className={styles.badgeEmoji}>⭐</span>
            </div>
          </div>
          <div className={styles.gamificationCard}>
            <div className={styles.gamificationIcon}>📅</div>
            <h3>7-Day Challenges</h3>
            <p>Build habits with structured daily practice and tracking</p>
            <div className={styles.challengePreview}>
              <div className={styles.challengeDay}>Day 1</div>
              <div className={styles.challengeDay}>Day 2</div>
              <div className={styles.challengeDay}>Day 3</div>
              <div className={styles.challengeDayMore}>+4 more</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: '🏠',
      title: 'Family Harmony',
      description: 'Transform conflicts into cooperation with your spouse and children',
    },
    {
      icon: '🎓',
      title: 'Teen Relationships',
      description: 'Navigate school, friends, and social media with confidence',
    },
    {
      icon: '💼',
      title: 'Career Growth',
      description: 'Lead teams, influence bosses, and build professional networks',
    },
    {
      icon: '🧠',
      title: 'Emotional Intelligence',
      description: 'Understand psychology behind influence and human behavior',
    },
  ];

  return (
    <section className={styles.benefitsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>What You'll Gain</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.title} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Mastering the Art of People and Influence`}
      description="Transform your relationships with Dale Carnegie's 30 principles. Interactive exercises, real-world scenarios, and gamified progress tracking.">
      <HomepageHeader />
      <main>
        <HowItWorks />
        <PartsSection />
        <GamificationPreview />
        <BenefitsSection />
      </main>
    </Layout>
  );
}
