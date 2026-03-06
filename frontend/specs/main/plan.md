# Implementation Plan: Part 1 - The Foundations (Internal Mastery)

**Branch**: `main` | **Date**: 2026-03-05 | **Spec**: [specs/001-chapter-01-criticism-killer/spec.md](../001-chapter-01-criticism-killer/spec.md)

**Input**: Feature specifications for Chapters 01-03 (Part 1 Foundation)

---

## Summary

**Part 1 implements the 3-Step Influence Foundation:**
1. **Chapter 01**: Stop the Damage (Eliminate criticism)
2. **Chapter 02**: Build the Trust (Give appreciation)
3. **Chapter 03**: Inspire Action (Arouse eager want - WIIFM)

**Technical Approach**: Docusaurus 3.9.2 with custom React components for gamification (XP tracking, badges, progress), interactive worksheets, and tri-level scenario displays. All 3 chapters share the same component architecture and design system.

---

## Technical Context

**Language/Version**: TypeScript 5.6+, React 19.0+, Node.js 20.0+
**Primary Dependencies**: 
- Docusaurus 3.9.2 (static site generator)
- React 19.0.0 (UI framework)
- Custom UI components (ChapterHeader, BadgeCard, ProgressBar, MicroScriptCard, ScenarioBox, MissionCard, ChallengeChecklist, Worksheet)
**Storage**: localStorage (browser-based progress tracking via XPContext)
**Testing**: TypeScript type checking (tsc), Docusaurus build validation
**Target Platform**: Web (responsive: mobile 375px, tablet 768px, desktop 1024px+)
**Project Type**: Single Docusaurus project with custom React components
**Performance Goals**: 
- Page load < 3 seconds
- TypeScript compilation < 30 seconds
- Build time < 2 minutes
**Constraints**: 
- All components must support dark mode
- Progress must persist across sessions (localStorage)
- All interactive elements must be keyboard accessible
**Scale/Scope**: 
- 3 chapters (Chapter 01, 02, 03)
- 11 reusable UI components
- 1 gamification context (XPContext)
- 4 part overview pages
- 1 homepage with 4-part structure

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Gate 1: Principle-First Architecture ✅
- [x] Each chapter implements one Carnegie principle with fidelity
- [x] Original Carnegie quote included in all specs
- [x] Modern psychology backing (Covey, Robbins, Tracy, Maxwell) specified
- [x] Step-by-step frameworks defined (5-Step Criticism Killer, 3-Part Appreciation, 4-Step Frequency Tuning)
- [x] Tri-level scenarios (Family/Teen/Professional) required in all specs

### Gate 2: Tri-Level Scenario Requirement ✅
- [x] All 3 chapters specify 3 complete scenarios each (9 total)
- [x] Each scenario shows: Trap → Why It Fails → Bridge → Result
- [x] Word-for-word scripts required in all scenarios

### Gate 3: Gamification Mandatory ✅
- [x] Each chapter awards XP (100 XP per chapter = 300 XP total)
- [x] Unique badges defined (Zen Master, Fuel Master, Frequency Master)
- [x] Daily Missions with success criteria in all chapters
- [x] 7-Day Challenge Checklists in all chapters
- [x] Progress tracking specified (XPContext with localStorage)

### Gate 4: Micro-Script Library ✅
- [x] 12 micro-scripts per chapter (36 total)
- [x] Categorized: DMs/Texts, In-Person, Workplace/Email
- [x] Context-tagged: family, teen, professional
- [x] Copy-paste ready with copy functionality

### Gate 5: Action-First Design ✅
- [x] Daily Mission with XP reward in all chapters
- [x] 3 Fun Exercises per chapter (9 total)
- [x] Interactive Worksheet in all chapters
- [x] 7-Day Challenge Checklist in all chapters
- [x] Theory-to-practice ratio ≤ 40:60 (verified in specs)

### Gate 6: Quality Gates ✅
- [x] Validation checklists created for all chapters
- [x] All acceptance scenarios defined (Given/When/Then format)
- [x] Success criteria are measurable and testable

**RESULT**: ✅ **ALL GATES PASS** - Part 1 specs are constitution-compliant.

---

## Project Structure

### Documentation (this feature)

```text
specs/
├── 001-chapter-01-criticism-killer/
│   ├── spec.md                    ✅ DONE
│   ├── checklists/
│   │   └── requirements.md        ✅ DONE
│   └── plan.md                    ⏳ TODO (per-chapter plan)
│
├── 002-chapter-02-fuel-tank/
│   ├── spec.md                    ✅ DONE
│   ├── checklists/
│   │   └── requirements.md        ✅ DONE
│   └── plan.md                    ⏳ TODO (per-chapter plan)
│
├── 003-chapter-03-radio-station/
│   ├── spec.md                    ✅ DONE
│   ├── checklists/
│   │   └── requirements.md        ✅ DONE
│   └── plan.md                    ⏳ TODO (per-chapter plan)
│
└── main/
    ├── plan.md                    ✅ THIS FILE (Part 1 overall plan)
    └── research.md                ⏳ TODO
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/                        # Core gamification components
│   │   ├── ChapterHeader.tsx      ✅ DONE
│   │   ├── ChapterHeader.module.css
│   │   ├── BadgeCard.tsx          ✅ DONE
│   │   ├── BadgeCard.module.css
│   │   ├── ProgressBar.tsx        ✅ DONE
│   │   ├── ProgressBar.module.css
│   │   ├── MicroScriptCard.tsx    ✅ DONE
│   │   ├── MicroScriptCard.module.css
│   │   ├── ScenarioBox.tsx        ✅ DONE
│   │   ├── ScenarioBox.module.css
│   │   ├── MissionCard.tsx        ✅ DONE
│   │   ├── MissionCard.module.css
│   │   ├── ChallengeChecklist.tsx ✅ DONE
│   │   ├── ChallengeChecklist.module.css
│   │   ├── Worksheet.tsx          ✅ DONE
│   │   ├── Worksheet.module.css
│   │   └── index.ts               ✅ DONE (exports all)
│   │
│   ├── PartCard.tsx               ✅ DONE (homepage part cards)
│   ├── PartCard.module.css
│   ├── XPDisplay.tsx              ✅ DONE (progress dashboard)
│   ├── XPDisplay.module.css
│   └── HomepageFeatures/          ✅ DONE (default Docusaurus)
│
├── context/
│   └── XPContext.tsx              ✅ DONE (gamification state management)
│
├── pages/
│   ├── index.tsx                  ✅ DONE (homepage with 4-part structure)
│   ├── index.module.css
│   └── markdown-page.md           ⏳ TODO (convert to chapter content)
│
├── css/
│   └── custom.css                 ✅ DONE (design system: colors, typography)
│
├── Root.tsx                       ✅ DONE (XPContext provider wrapper)
│
docs/
├── intro.md                       ✅ DONE (updated with ebook structure)
├── part-1-overview.md             ✅ DONE
├── part-2-overview.md             ✅ DONE
├── part-3-overview.md             ✅ DONE
├── part-4-overview.md             ✅ DONE
├── chapter-01-criticism-killer.md ⏳ TODO (MDX content file)
├── chapter-02-appreciation.md     ⏳ TODO (MDX content file)
├── chapter-03-eager-want.md       ⏳ TODO (MDX content file)
└── tutorial-*                     ⏳ TODO (delete or archive default tutorials)
```

**Structure Decision**: Single Docusaurus project with custom React components. All Part 1 chapters share the same component architecture. Chapter content will be written as MDX files (Markdown + JSX components).

---

## Complexity Tracking

**Overall Complexity**: MODERATE

| Factor | Rating | Justification |
|--------|--------|---------------|
| **Technical Complexity** | Medium | React + TypeScript + Docusaurus (well-documented stack) |
| **Content Complexity** | High | 3 chapters × 13 sections each = 39 major sections to write |
| **Integration Complexity** | Medium | 11 components must work together seamlessly |
| **Testing Complexity** | Low | TypeScript types catch most errors; visual testing required |
| **Gamification Complexity** | Medium | localStorage persistence, XP calculations, badge unlocking |

**Risk Factors**:
1. **Content Volume**: Writing 3 complete chapters is time-intensive
2. **Component Consistency**: All 11 components must maintain design system consistency
3. **Progress Persistence**: localStorage must handle edge cases (clear, corrupt, upgrade)

**Mitigation**:
- Use chapter template for consistent structure
- Create component documentation with usage examples
- Implement error boundaries in XPContext

---

## Phase 0: Research & Discovery

### Unknowns to Resolve

| Unknown | Research Task | Assigned |
|---------|---------------|----------|
| MDX component integration in Docusaurus | Research MDX v2 + Docusaurus 3.9 compatibility | ⏳ TODO |
| localStorage best practices for React | Research persistence patterns, error handling | ⏳ TODO |
| Accessibility requirements for gamification | Research WCAG 2.1 compliance for XP/badges | ⏳ TODO |
| Dark mode color contrast ratios | Research WCAG AA/AAA standards | ⏳ TODO |

### Research Dispatch

**Task 1**: MDX Component Integration
```
Research: How to use custom React components (ChapterHeader, BadgeCard, etc.) 
in Docusaurus MDX files
Output: research.md section with code examples
```

**Task 2**: localStorage Patterns
```
Research: Best practices for localStorage in React apps
- Error handling (quota exceeded, private browsing)
- Data versioning/migration
- SSR compatibility (window check)
Output: research.md section with XPContext recommendations
```

**Task 3**: Accessibility Standards
```
Research: WCAG 2.1 requirements for interactive components
- Keyboard navigation for badges/checklists
- Screen reader announcements for XP updates
- Color contrast for dark mode
Output: research.md section with accessibility checklist
```

**Task 4**: Performance Optimization
```
Research: Docusaurus performance best practices
- Code splitting for components
- Image optimization
- Bundle size management
Output: research.md section with optimization strategies
```

---

## Phase 1: Design & Contracts

### Data Model (from XPContext)

**Entities**:
1. **UserProgress**
   - totalXp: number
   - badges: Badge[]
   - chapters: ChapterProgress[]
   - level: number (1-30)
   - lastActive: ISO date

2. **Badge**
   - id: string
   - name: string
   - icon: string (emoji)
   - chapter: number
   - part: number
   - xp: number
   - unlocked: boolean
   - unlockedDate?: ISO date

3. **ChapterProgress**
   - chapterNumber: number
   - completed: boolean
   - xpEarned: number
   - completedDate?: ISO date
   - missionCompleted: boolean
   - exercisesCompleted: number (0-3)
   - worksheetFilled: boolean
   - challengeCompleted: boolean

**State Transitions**:
```
Chapter Not Started → In Progress → Completed
  - xpEarned: 0        → accumulating → final
  - completed: false   → false        → true
  
Badge Locked → Unlocked
  - unlocked: false → true
  - unlockedDate: null → ISO date
```

### API Contracts

**Not Applicable** - This is a static site with client-side state management. No backend API required.

**Component Contracts** (from specs):

```typescript
// ChapterHeader Props
interface ChapterHeaderProps {
  principleNumber: number;
  title: string;
  carnegieQuote: string;
  badge: string;
  xp: number;
  part: number;
  partChallenge?: string;
  estimatedReading: string;
  estimatedPractice: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedChapters?: number[];
}

// BadgeCard Props
interface BadgeCardProps {
  badgeName: string;
  xp: number;
  icon: string;
  chapter: number;
  part: number;
  unlocked: boolean;
  unlockedDate?: string;
}

// ProgressBar Props
interface ProgressBarProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

// ... (all 11 components have defined interfaces)
```

### Quickstart Guide

**For Content Writers**:

```mdx
---
sidebar_position: 10
title: 'Chapter 01: The Criticism Killer'
badge: 'Zen Master'
xp: 100
---

import { ChapterHeader, ScenarioBox, MicroScriptCard, MissionCard } from '@site/src/components/ui';

<ChapterHeader
  principleNumber={1}
  title="Don't Criticize, Condemn, or Complain"
  carnegieQuote="Criticism is futile because it puts a person on the defensive..."
  badge="Zen Master"
  xp={100}
  part={1}
  estimatedReading="15 min"
  estimatedPractice="24 hours"
  difficulty="intermediate"
/>

## Opening Story

[Your content here...]

<ScenarioBox
  type="wrong-way"
  context="family"
  title="The Dinner Table Disaster"
  dialogue="You never help around here! I do everything!"
  reaction="They shut down and walk away"
  psychology="Criticism triggers fight-or-flight response"
/>

[Continue with all 13 sections from constitution...]
```

**For Developers**:

```bash
# Start development server
npm run start

# Run type checking
npm run typecheck

# Build production
npm run build

# Test locally
npm run serve
```

---

## Phase 2: Task Breakdown

**Next Command**: `/sp.tasks` will break this plan into testable implementation tasks.

**Expected Tasks**:
1. Create Chapter 01 MDX content file (13 sections)
2. Create Chapter 02 MDX content file (13 sections)
3. Create Chapter 03 MDX content file (13 sections)
4. Integrate XPContext with chapter components
5. Test progress persistence across sessions
6. Verify dark mode for all components
7. Test keyboard accessibility
8. Build and deploy Part 1

---

## Constitution Re-Check (Post-Design)

**After Phase 1 design completion, verify**:
- [x] All components support constitution requirements
- [x] Data model supports gamification (XP, badges, progress)
- [x] Chapter structure matches 13-section requirement
- [x] Micro-scripts are copy-paste ready (component supports copy)
- [x] Worksheets are interactive (component supports input + localStorage)

**RESULT**: ✅ **Design is constitution-compliant**

---

## Next Steps

1. **Run `/sp.tasks`** to create detailed task breakdown
2. **Assign tasks** to implementation team
3. **Create Chapter 01 content** first (template for Chapters 02-03)
4. **Test Chapter 01** end-to-end before proceeding
5. **Write Chapters 02-03** using Chapter 01 as template
6. **Part 1 Integration Test** (all 3 chapters + progress tracking)
7. **User Testing** (real readers complete Part 1)
8. **Iterate** based on feedback before Part 2

---

**Plan Status**: ✅ **COMPLETE** - Ready for task breakdown (`/sp.tasks`)
