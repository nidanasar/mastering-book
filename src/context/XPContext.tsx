import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  chapter: number;
  part: number;
  xp: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface ChapterProgress {
  chapterNumber: number;
  completed: boolean;
  xpEarned: number;
  completedDate?: string;
  missionCompleted: boolean;
  exercisesCompleted: number;
  worksheetFilled: boolean;
  challengeCompleted: boolean;
}

export interface UserProgress {
  totalXp: number;
  badges: Badge[];
  chapters: ChapterProgress[];
  level: number;
  lastActive: string;
}

interface XPContextType {
  progress: UserProgress;
  addXp: (amount: number, source: string) => void;
  unlockBadge: (badgeId: string) => void;
  completeChapter: (chapterNumber: number, xp: number) => void;
  completeMission: (chapterNumber: number, xp: number) => void;
  completeExercise: (chapterNumber: number) => void;
  completeWorksheet: (chapterNumber: number) => void;
  completeChallenge: (chapterNumber: number, xp?: number) => void;
  resetProgress: () => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

const STORAGE_KEY = 'mastering-influence-progress';

const initialProgress: UserProgress = {
  totalXp: 0,
  badges: Array.from({ length: 30 }, (_, i) => ({
    id: `badge-${i + 1}`,
    name: getBadgeName(i + 1),
    icon: getBadgeIcon(i + 1),
    chapter: i + 1,
    part: getPartForChapter(i + 1),
    xp: getXpForChapter(i + 1),
    unlocked: false,
  })),
  chapters: Array.from({ length: 30 }, (_, i) => ({
    chapterNumber: i + 1,
    completed: false,
    xpEarned: 0,
    missionCompleted: false,
    exercisesCompleted: 0,
    worksheetFilled: false,
    challengeCompleted: false,
  })),
  level: 1,
  lastActive: new Date().toISOString(),
};

function getBadgeName(chapter: number): string {
  const badgeNames: Record<number, string> = {
    1: 'Zen Master',
    2: 'Appreciation Ambassador',
    3: 'Motivation Master',
    4: 'Interest Explorer',
    5: 'Smile Specialist',
    6: 'Name Navigator',
    7: 'Listening Legend',
    8: 'Interest Innovator',
    9: 'Importance Influencer',
    10: 'Argument Avoider',
    11: 'Opinion Observer',
    12: 'Mistake Admitter',
    13: 'Talk Transformer',
    14: 'Idea Instigator',
    15: 'Perspective Pro',
    16: 'Sympathy Sage',
    17: 'Noble Navigator',
    18: 'Drama Director',
    19: 'Challenge Champion',
    20: 'Praise Pioneer',
    21: 'Correction Coach',
    22: 'Face Saver',
    23: 'Progress Praiser',
    24: 'Reputation Builder',
    25: 'Encouragement Expert',
    26: 'Barrier Buster',
    27: 'Win-Win Wizard',
    28: 'Magic Phrase Master',
    29: 'Worry Warrior',
    30: 'Master Influencer',
  };
  return badgeNames[chapter] || `Badge ${chapter}`;
}

function getBadgeIcon(chapter: number): string {
  if (chapter === 1) return '🧘';
  if (chapter <= 3) return '📖';
  if (chapter <= 9) return '🤝';
  if (chapter <= 21) return '👑';
  if (chapter === 30) return '⭐';
  return '🌟';
}

function getPartForChapter(chapter: number): number {
  if (chapter <= 3) return 1;
  if (chapter <= 9) return 2;
  if (chapter <= 21) return 3;
  return 4;
}

function getXpForChapter(chapter: number): number {
  return chapter === 1 ? 100 : 75;
}

export function XPProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved progress:', e);
        }
      }
    }
    return initialProgress;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const addXp = (amount: number, source: string) => {
    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + amount,
      level: calculateLevel(prev.totalXp + amount),
      lastActive: new Date().toISOString(),
    }));
    console.log(`+${amount} XP from ${source}`);
  };

  const unlockBadge = (badgeId: string) => {
    setProgress((prev) => ({
      ...prev,
      badges: prev.badges.map((badge) =>
        badge.id === badgeId
          ? { ...badge, unlocked: true, unlockedDate: new Date().toISOString() }
          : badge
      ),
    }));
  };

  const completeChapter = (chapterNumber: number, xp: number) => {
    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xp,
      chapters: prev.chapters.map((chapter) =>
        chapter.chapterNumber === chapterNumber
          ? { ...chapter, completed: true, xpEarned: xp, completedDate: new Date().toISOString() }
          : chapter
      ),
      level: calculateLevel(prev.totalXp + xp),
      lastActive: new Date().toISOString(),
    }));
    unlockBadge(`badge-${chapterNumber}`);
  };

  const completeMission = (chapterNumber: number, xp: number) => {
    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xp,
      chapters: prev.chapters.map((chapter) =>
        chapter.chapterNumber === chapterNumber
          ? { ...chapter, missionCompleted: true, xpEarned: chapter.xpEarned + xp }
          : chapter
      ),
      level: calculateLevel(prev.totalXp + xp),
      lastActive: new Date().toISOString(),
    }));
  };

  const completeExercise = (chapterNumber: number) => {
    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + 25,
      chapters: prev.chapters.map((chapter) =>
        chapter.chapterNumber === chapterNumber
          ? { ...chapter, exercisesCompleted: Math.min(chapter.exercisesCompleted + 1, 3), xpEarned: chapter.xpEarned + 25 }
          : chapter
      ),
      level: calculateLevel(prev.totalXp + 25),
      lastActive: new Date().toISOString(),
    }));
  };

  const completeWorksheet = (chapterNumber: number) => {
    setProgress((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) =>
        chapter.chapterNumber === chapterNumber
          ? { ...chapter, worksheetFilled: true }
          : chapter
      ),
      lastActive: new Date().toISOString(),
    }));
  };

  const completeChallenge = (chapterNumber: number, xp: number = 0) => {
    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xp,
      chapters: prev.chapters.map((chapter) =>
        chapter.chapterNumber === chapterNumber
          ? { ...chapter, challengeCompleted: true, xpEarned: chapter.xpEarned + xp }
          : chapter
      ),
      level: calculateLevel(prev.totalXp + xp),
      lastActive: new Date().toISOString(),
    }));
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress(initialProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <XPContext.Provider
      value={{
        progress,
        addXp,
        unlockBadge,
        completeChapter,
        completeMission,
        completeExercise,
        completeWorksheet,
        completeChallenge,
        resetProgress,
      }}
    >
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
}

function calculateLevel(totalXp: number): number {
  // Simple leveling: every 100 XP = 1 level, max level 30
  return Math.min(30, Math.floor(totalXp / 100) + 1);
}
