import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Ebook Sidebar Structure - Organized by 4 Parts
 * 
 * Note: Chapter documents will be created as they are developed.
 * For now, sidebar links to non-existent chapters will point to intro.
 */
const sidebars: SidebarsConfig = {
  ebookSidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: [
        'intro',
        {
          type: 'link',
          label: 'How to Use This Ebook',
          href: '/docs/intro',
        },
        {
          type: 'link',
          label: 'Your Learning Path',
          href: '/',
        },
      ],
    },
    {
      type: 'category',
      label: '📖 Part 1: The Foundation',
      link: {type: 'doc', id: 'part-1-overview'},
      collapsed: false,
      items: [
        'part-1-overview',
        {
          type: 'doc',
          id: 'chapter-01-criticism-killer',
          label: 'Chapter 1: Don\'t Criticize, Condemn, or Complain',
        },
        {
          type: 'doc',
          id: 'chapter-02-appreciation',
          label: 'Chapter 2: Give Honest and Sincere Appreciation',
        },
        {
          type: 'doc',
          id: 'chapter-03-eager-want',
          label: 'Chapter 3: Arouse an Eager Want',
        },
        {
          type: 'doc',
          id: 'part-1-integration-challenge',
          label: '🏆 Part 1 Integration Challenge (50 XP)',
        },
      ],
    },
    {
      type: 'category',
      label: '🤝 Part 2: Building Connections',
      link: {type: 'doc', id: 'part-2-overview'},
      collapsed: true,
      items: [
        'part-2-overview',
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 4: Become Genuinely Interested in Others (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 5: Smile (The Dollar Smile) (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 6: Remember Names (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 7: Be a Great Listener (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 8: Talk in Terms of Their Interests (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 9: Make Them Feel Important (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: '🏆 Part 2 Integration Challenge (Coming Soon)',
        },
      ],
    },
    {
      type: 'category',
      label: '👑 Part 3: Leading Others',
      link: {type: 'doc', id: 'part-3-overview'},
      collapsed: true,
      items: [
        'part-3-overview',
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 10: Avoid Arguments (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 11: Respect Opinions (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 12: Admit Mistakes Quickly (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 13: Let Them Talk (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 14: Let Them Feel It\'s Their Idea (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 15: See Their Side (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 16: Sympathize (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 17: Noble Motives (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 18: Dramatize Ideas (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 19: Throw Down a Challenge (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 20: Start with Praise (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 21: Indirect Attention to Errors (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: '🏆 Part 3 Integration Challenge (Coming Soon)',
        },
      ],
    },
    {
      type: 'category',
      label: '⭐ Part 4: Mastery',
      link: {type: 'doc', id: 'part-4-overview'},
      collapsed: true,
      items: [
        'part-4-overview',
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 22: Let Them Save Face (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 23: Praise Every Improvement (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 24: Give a Fine Reputation (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 25: Use Encouragement (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 26: Make Faults Easy to Correct (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 27: Make Them Happy About It (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 28: The Magic Phrase (Safety Valve) (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 29: Stop Worrying (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: 'Chapter 30: Master Influencer Status (Coming Soon)',
        },
        {
          type: 'doc',
          id: 'intro',
          label: '🏆 Part 4 Integration Challenge (Coming Soon)',
        },
      ],
    },
    {
      type: 'category',
      label: '📚 Resources',
      collapsed: true,
      items: [
        {
          type: 'link',
          label: 'Worksheets Library',
          href: '/docs/intro',
        },
        {
          type: 'link',
          label: 'Micro-Script Index',
          href: '/docs/intro',
        },
        {
          type: 'link',
          label: 'Badge Collection',
          href: '/docs/intro',
        },
        {
          type: 'link',
          label: 'Progress Tracker',
          href: '/docs/intro',
        },
      ],
    },
  ],
};

export default sidebars;
