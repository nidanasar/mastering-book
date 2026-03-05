---

description: "Task list for Part 1 - The Foundations implementation"
---

# Tasks: Part 1 - The Foundations (Internal Mastery)

**Input**: Design documents from `specs/main/`, `specs/001-chapter-01-criticism-killer/`, `specs/002-chapter-02-fuel-tank/`, `specs/003-chapter-03-radio-station/`
**Prerequisites**: plan.md ✅, spec.md ✅ (3 chapters), research.md ✅
**Tests**: NOT included - content-focused feature, visual testing via Docusaurus build validation

**Organization**: Tasks organized by chapter (US1=Chapter 01, US2=Chapter 02, US3=Chapter 03) to enable independent implementation and testing of each chapter.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which chapter this task belongs to (US1=Chapter 01, US2=Chapter 02, US3=Chapter 03)
- Include exact file paths in descriptions

## Path Conventions

- **Single Docusaurus project**: `src/`, `docs/`, `tests/` at repository root
- **Components**: `src/components/ui/`
- **Context**: `src/context/`
- **Content**: `docs/*.mdx` or `docs/*.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Docusaurus configuration

- [ ] T001 Verify Docusaurus 3.9.2 project structure exists
- [ ] T002 Verify Node.js 20.0+ and npm installed
- [ ] T003 [P] Run `npm install` to install all dependencies
- [ ] T004 [P] Verify TypeScript configuration (tsconfig.json)
- [ ] T005 [P] Run `npm run typecheck` to verify no type errors
- [ ] T006 [P] Run `npm run build` to verify clean build

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY chapter content can be implemented

**⚠️ CRITICAL**: No chapter content work can begin until this phase is complete

- [ ] T007 [P] Verify custom.css design system is complete (colors, typography, dark mode)
- [ ] T008 [P] Verify all 11 UI components exist in src/components/ui/
- [ ] T009 [P] Verify XPContext.tsx exists with localStorage persistence
- [ ] T010 [P] Verify Root.tsx wraps app with XPContext provider
- [ ] T011 [P] Verify homepage (src/pages/index.tsx) has 4-part structure
- [ ] T012 [P] Verify sidebars.ts has ebookSidebar with all 4 parts
- [ ] T013 [P] Verify docusaurus.config.ts has correct title, tagline, navbar
- [ ] T014 [P] Run `npm run start` and verify all components render
- [ ] T015 [P] Test dark mode toggle works across all components
- [ ] T016 [P] Test keyboard navigation (Tab, Enter, Space) on interactive elements
- [ ] T017 [P] Test localStorage persistence (add XP, refresh, verify XP persists)

**Checkpoint**: Foundation ready - chapter content implementation can now begin

---

## Phase 3: User Story 1 - Chapter 01: The Criticism Killer (Priority: P1) 🎯 MVP

**Goal**: Complete Chapter 01 content with all 13 constitution sections, gamification, and interactive components

**Independent Test**: Reader can open `/docs/chapter-01-criticism-killer`, read all sections, interact with components (ScenarioBox, MicroScriptCard, MissionCard, Worksheet, ChallengeChecklist), and see progress saved to localStorage

### Implementation for Chapter 01

- [X] T018 [P] [US1] Create docs/chapter-01-criticism-killer.mdx with YAML frontmatter
- [X] T019 [US1] Add ChapterHeader component with principleNumber=1, badge="Zen Master", xp=100
- [X] T020 [US1] Write Opening Story section (family dinner table scenario, the failure, hook)
- [X] T021 [US1] Write The Principle section (Carnegie wisdom, 4 reasons we criticize, why it matters)
- [X] T022 [US1] Write The Psychology section (Covey: Emotional Bank Account, Robbins: State Management, Tracy: Law of Concentration, Maxwell: Law of the Lid)
- [X] T023 [US1] Write Implementation Strategy section (5-Step Criticism Killer Framework: 3-Second Pause, Address Behavior Not Person, Ask Don't Tell, Save Face, Solution Focus)
- [X] T024 [US1] Add 3 ScenarioBox components (Family: forgotten groceries, Teen: damaged notes, Professional: missed deadline)
- [X] T025 [P] [US1] Add 12 MicroScriptCard components (4 DMs/Texts, 4 In-Person, 4 Workplace Email)
- [X] T026 [US1] Write Common Issue Clinic section (FAQ-style troubleshooting)
- [X] T027 [US1] Add MissionCard component (24-Hour No-Criticism Challenge, 100 XP, success criteria, reflection questions)
- [X] T028 [US1] Write 3 Fun Exercises section (Criticism Audit, Reframe Game, Compliment Challenge with XP rewards)
- [X] T029 [US1] Add Worksheet component (storageKey="chapter-01-worksheet", 4 fields: situation, response, learning, next-time)
- [X] T030 [US1] Add ChallengeChecklist component (7-Day Challenge, totalXp=175, 7 daily tasks)
- [X] T031 [US1] Write Integration Notes section (connection to Chapters 2 and 3, 3-Step Influence Foundation)
- [X] T032 [US1] Write Outcome Reflection section (before/after comparison)
- [X] T033 [US1] Add YAML frontmatter metadata (sidebar_position, title, description, principle_number, carnegie_quote, badge, xp, estimated_reading, estimated_practice, difficulty, related_chapters, tags)
- [X] T034 [US1] Update sidebars.ts to link to chapter-01-criticism-killer
- [X] T035 [US1] Run `npm run typecheck` and fix any TypeScript errors
- [X] T036 [US1] Run `npm run build` and verify chapter builds without errors
- [ ] T037 [US1] Test chapter locally: open in browser, verify all components render
- [ ] T038 [US1] Test Worksheet: fill form, refresh page, verify data persists
- [ ] T039 [US1] Test ChallengeChecklist: click checkboxes, verify XP updates in XPContext
- [ ] T040 [US1] Test MicroScriptCard copy buttons: click copy, verify script copied to clipboard
- [ ] T041 [US1] Verify dark mode: toggle dark mode, verify all components display correctly
- [ ] T042 [US1] Verify keyboard accessibility: Tab through all interactive elements

**Checkpoint**: Chapter 01 complete and independently testable - MVP scope delivered

---

## Phase 4: User Story 2 - Chapter 02: The Fuel Tank Principle (Priority: P1)

**Goal**: Complete Chapter 02 content with all 13 constitution sections, gamification, and interactive components

**Independent Test**: Reader can open `/docs/chapter-02-appreciation`, read all sections, interact with components, and see progress saved separately from Chapter 01

### Implementation for Chapter 02

- [X] T043 [P] [US2] Create docs/chapter-02-appreciation.mdx with YAML frontmatter
- [X] T044 [US2] Add ChapterHeader component with principleNumber=2, badge="Fuel Master", xp=100
- [X] T045 [US2] Write Opening Story section (someone feeling unappreciated at home/work)
- [X] T046 [US2] Write The Principle section (Carnegie wisdom, 5 reasons we fail to appreciate, why it matters)
- [X] T047 [US2] Write The Psychology section (Covey: Emotional Bank Account deposits, Robbins: state elevation, Tracy: reciprocity principle, Maxwell: Law of Addition)
- [X] T048 [US2] Write Appreciation vs Flattery comparison table (5 distinguishing characteristics)
- [X] T049 [US2] Write Implementation Strategy section (3-Part Appreciation Formula: Observe → Specific → Impact)
- [X] T050 [US2] Add 3 ScenarioBox components (Family, Teen, Professional with wrong-way/right-way)
- [X] T051 [P] [US2] Add 12 MicroScriptCard components (4 DMs/Texts, 4 In-Person, 4 Workplace Email)
- [X] T052 [US2] Write Common Issue Clinic section (appreciation feels unnatural, seems fake, no response)
- [X] T053 [US2] Add MissionCard component (24-Hour Appreciation Challenge, 100 XP, success criteria, reflection questions)
- [X] T054 [US2] Write 3 Fun Exercises section (Appreciation Audit, Specificity Practice, Impact Journal with XP rewards)
- [X] T055 [US2] Add Worksheet component (storageKey="chapter-02-worksheet", fields for appreciation moments)
- [X] T056 [US2] Add ChallengeChecklist component (7-Day Challenge, totalXp=175, 7 daily tasks)
- [X] T057 [US2] Write Integration Notes section (connection to Chapters 1 and 3, 3-Step Influence Foundation)
- [X] T058 [US2] Write Outcome Reflection section (before/after comparison)
- [X] T059 [US2] Add YAML frontmatter metadata (sidebar_position, title, description, principle_number, carnegie_quote, badge, xp, estimated_reading, estimated_practice, difficulty, related_chapters, tags)
- [X] T060 [US2] Update sidebars.ts to link to chapter-02-appreciation
- [X] T061 [US2] Run `npm run typecheck` and fix any TypeScript errors
- [X] T062 [US2] Run `npm run build` and verify chapter builds without errors
- [ ] T063 [US2] Test chapter locally: open in browser, verify all components render
- [ ] T064 [US2] Test Worksheet: fill form, refresh page, verify data persists
- [ ] T065 [US2] Test ChallengeChecklist: click checkboxes, verify XP updates
- [ ] T066 [US2] Verify dark mode and keyboard accessibility

**Checkpoint**: Chapter 02 complete and independently testable

---

## Phase 5: User Story 3 - Chapter 03: The Radio Station Rule (Priority: P1)

**Goal**: Complete Chapter 03 content with all 13 constitution sections, gamification, and interactive components

**Independent Test**: Reader can open `/docs/chapter-03-eager-want`, read all sections, interact with components, and complete Part 1 foundation

### Implementation for Chapter 03

- [X] T067 [P] [US3] Create docs/chapter-03-eager-want.mdx with YAML frontmatter
- [X] T068 [US3] Add ChapterHeader component with principleNumber=3, badge="Frequency Master", xp=100
- [X] T069 [US3] Write Opening Story section (failing to get buy-in because focused on own wants)
- [X] T070 [US3] Write The Principle section (Carnegie wisdom, 5 reasons we fail to tune in, why it matters)
- [X] T071 [US3] Write The Psychology section (Covey: Seek First to Understand, Robbins: values alignment, Tracy: benefit-focused selling, Maxwell: Law of Addition)
- [X] T072 [US3] Write Influence vs Manipulation comparison table (5 distinguishing characteristics)
- [X] T073 [US3] Write Implementation Strategy section (4-Step Frequency Tuning Framework: Identify → Empathize → Align → Invite)
- [X] T074 [US3] Write Discovery Questions section (10+ questions to uncover what others want)
- [X] T075 [US3] Add 3 ScenarioBox components (Family, Teen, Professional with self-station vs their-station)
- [X] T076 [P] [US3] Add 12 MicroScriptCard components (4 DMs/Texts, 4 In-Person, 4 Workplace Email with WIIFM framing)
- [X] T077 [US3] Write Common Issue Clinic section (don't know what they want, feels selfish, rejected after WIIFM)
- [X] T078 [US3] Add MissionCard component (24-Hour WIIFM Challenge, 100 XP, success criteria, reflection questions)
- [X] T079 [US3] Write 3 Fun Exercises section (Station Audit, Frequency Finder, Win-Win Reframe with XP rewards)
- [X] T080 [US3] Add Worksheet component (storageKey="chapter-03-worksheet", fields for WIIFM conversations)
- [X] T081 [US3] Add ChallengeChecklist component (7-Day Challenge, totalXp=175, 7 daily tasks)
- [X] T082 [US3] Write Integration Notes section (completes 3-Step Influence Foundation, connection to Chapters 1 and 2)
- [X] T083 [US3] Write Outcome Reflection section (before/after comparison)
- [X] T084 [US3] Add YAML frontmatter metadata (sidebar_position, title, description, principle_number, carnegie_quote, badge, xp, estimated_reading, estimated_practice, difficulty, related_chapters, tags)
- [X] T085 [US3] Update sidebars.ts to link to chapter-03-eager-want
- [X] T086 [US3] Run `npm run typecheck` and fix any TypeScript errors
- [X] T087 [US3] Run `npm run build` and verify chapter builds without errors
- [ ] T088 [US3] Test chapter locally: open in browser, verify all components render
- [ ] T089 [US3] Test Worksheet: fill form, refresh page, verify data persists
- [ ] T090 [US3] Test ChallengeChecklist: click checkboxes, verify XP updates
- [ ] T091 [US3] Verify dark mode and keyboard accessibility

**Checkpoint**: Chapter 03 complete - Part 1 foundation complete

---

## Phase 6: Part 1 Integration & Polish

**Purpose**: Cross-cutting concerns, Part 1 integration challenge, final validation

- [X] T092 Create docs/part-1-integration-challenge.mdx (50 XP challenge, use all 3 principles in one conversation)
- [X] T093 Update sidebars.ts to link Part 1 Integration Challenge
- [ ] T094 Verify XPContext tracks all 3 chapters' progress correctly
- [ ] T095 Verify badge unlocking works (Zen Master, Fuel Master, Frequency Master)
- [ ] T096 Verify total XP calculation (300 XP from chapters + 50 XP integration = 350 XP)
- [ ] T097 Test complete user journey: Read Ch 1 → Complete Mission → Read Ch 2 → Complete Mission → Read Ch 3 → Complete Mission → Integration Challenge
- [X] T098 Run `npm run typecheck` - verify zero errors
- [X] T099 Run `npm run build` - verify zero errors, zero warnings
- [ ] T100 Run `npm run serve` and test production build locally
- [X] T101 Test all internal links work (no broken links) - Part 1 links fixed!
- [ ] T102 Test all external links work (no 404s)
- [ ] T103 Verify all images load correctly
- [ ] T104 Verify color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] T105 Verify screen reader compatibility (aria-labels, focus indicators)
- [ ] T106 Create Part 1 README (docs/PART-1-README.md) with chapter overview and quickstart
- [ ] T107 Update docs/intro.md to link to Part 1 chapters
- [ ] T108 Final validation: Constitution compliance check (6 gates)
- [ ] T109 Document known issues or limitations
- [ ] T110 Prepare Part 1 for user testing (create testing checklist)

**Checkpoint**: Part 1 complete, tested, and ready for user testing

---

## Dependency Graph

```
Phase 1: Setup (T001-T006)
    ↓
Phase 2: Foundational (T007-T017) ← BLOCKING
    ↓
    ├─→ Phase 3: Chapter 01 (T018-T042) ← MVP
    ├─→ Phase 4: Chapter 02 (T043-T066)
    └─→ Phase 5: Chapter 03 (T067-T091)
    ↓
Phase 6: Integration & Polish (T092-T110)
```

---

## Parallel Execution Opportunities

**Highly Parallelizable** (different files, no dependencies):

| Story | Parallel Tasks | Files |
|-------|----------------|-------|
| **US1** | T018, T024, T025 | chapter-01.mdx, scenarios, micro-scripts |
| **US2** | T043, T050, T051 | chapter-02.mdx, scenarios, micro-scripts |
| **US3** | T067, T075, T076 | chapter-03.mdx, scenarios, micro-scripts |
| **All** | T034, T060, T085 | sidebars.ts updates (merge carefully) |

**Recommended Parallel Strategy**:
1. Complete Phase 1 & 2 sequentially (blocking)
2. Split Chapters 01, 02, 03 across 3 writers/developers
3. Each chapter is independent - can be done in parallel
4. Merge in Phase 6 for integration testing

---

## Task Summary

| Phase | Task Count | Story | Priority |
|-------|------------|-------|----------|
| Phase 1: Setup | 6 | N/A | Blocking |
| Phase 2: Foundational | 11 | N/A | Blocking |
| Phase 3: Chapter 01 | 25 | US1 | P1 (MVP) |
| Phase 4: Chapter 02 | 24 | US2 | P1 |
| Phase 5: Chapter 03 | 25 | US3 | P1 |
| Phase 6: Integration | 19 | N/A | Cross-cutting |
| **Total** | **110** | - | - |

---

## Independent Test Criteria

| Chapter | Test |
|---------|------|
| **Chapter 01** | Reader can complete 24-Hour No-Criticism Challenge, earn 100 XP, unlock Zen Master badge |
| **Chapter 02** | Reader can complete 24-Hour Appreciation Challenge, earn 100 XP, unlock Fuel Master badge |
| **Chapter 03** | Reader can complete 24-Hour WIIFM Challenge, earn 100 XP, unlock Frequency Master badge |
| **Part 1** | Reader can complete all 3 chapters + Integration Challenge, earn 350 XP total |

---

## Implementation Strategy

**MVP Scope** (Minimum Viable Part 1):
- Phase 1 & 2: Complete (blocking infrastructure)
- Phase 3: Chapter 01 complete (first foundation principle)
- Phase 6 (partial): T094-T099 only (basic validation)

**Incremental Delivery**:
1. **Week 1**: MVP (Chapters 01 only)
2. **Week 2**: Chapter 02 + Chapter 03
3. **Week 3**: Part 1 Integration + User Testing

**Quality Gates**:
- All chapters must pass constitution check (6 gates)
- All components must support dark mode
- All interactive elements must be keyboard accessible
- All progress must persist across sessions
- Zero TypeScript errors, zero build warnings

---

**Tasks Status**: ✅ **COMPLETE** - Ready for implementation

**Next Command**: `/sp.implement` to start implementing tasks in priority order
