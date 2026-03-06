<!-- 
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0
Modified principles: None (initial creation)
Added sections:
  - Core Principles (6 principles for ebook structure and quality)
  - Content Architecture Standards
  - Gamification & Engagement System
  - Governance
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending review
  - .specify/templates/spec-template.md ⚠ pending review
  - .specify/templates/tasks-template.md ⚠ pending review
Follow-up TODOs:
  - TODO(TEMPLATE_SYNC): Review and update spec/plan/tasks templates to align with constitution
  - TODO(COPYRIGHT_DATE): Verify copyright year matches actual publication year
-->

# Mastering the Art of People and Influence Constitution

## Core Principles

### I. Principle-First Architecture
Every chapter must implement one of Dale Carnegie's 30 principles with fidelity. Each principle requires: (1) Original Carnegie quote, (2) Modern psychology backing (Covey, Robbins, Tracy, Maxwell), (3) Step-by-step implementation framework, (4) Real-world scenarios across three contexts (Family/Teen/Professional). No principle may be diluted or abstracted—concrete actionability is mandatory.

### II. Tri-Level Scenario Requirement
Every chapter must include three complete scenarios: Family (spouse/parent/sibling), Teen (school/friends/social media), Professional (boss/client/team). Each scenario must show: The Trap (wrong way), Why It Fails (psychology), The Bridge (right way), and Result. Scripts must be word-for-word ready for immediate use.

### III. Gamification Mandatory (NON-NEGOTIABLE)
Every chapter must award XP (50-150 points) and a unique badge. Total system: 2,250 XP across 30 chapters. Missions must have clear success criteria, reflection questions, and time estimates. Progress tracking (XP accumulation, badge collection, completion percentage) must be visible and measurable throughout the reader journey.

### IV. Micro-Script Library
Every chapter must provide 9-15 micro-scripts categorized by: DMs/Texts, In-Person, Workplace/Email. Scripts must be copy-paste ready, context-tagged (family/teen/professional), and tone-appropriate (casual/formal/empathetic). No vague advice—exact words required.

### V. Action-First Design
Every chapter must include: Daily Mission with XP reward, 3 Fun Exercises (reflection/practice/challenge), Interactive Worksheet, 7-Day Challenge Checklist. Theory-to-practice ratio must not exceed 40:60. Readers must be able to act within 5 minutes of reading any section.

### VI. Quality Gates
Every chapter must pass validation checklist: All links work, all images load, all scripts realistic, all exercises doable, tone consistent, examples diverse, language inclusive, content actionable. Missing any item = chapter incomplete. No exceptions.

## Content Architecture Standards

**Chapter Structure (Mandatory Order):**
1. Header Section (Badge, XP, Carnegie Quote, Who This Helps)
2. Opening Story (real-world scenario, the failure, hook)
3. The Principle (Carnegie wisdom, why we violate it, why it matters)
4. The Psychology (Covey/Robbins/Tracy/Maxwell integration)
5. Implementation Strategy (step-by-step framework)
6. Tri-Level Scenarios (Family/Teen/Professional)
7. Micro-Scripts Library (9-15 scripts)
8. Common Issue Clinic (troubleshooting)
9. Daily Mission (XP, instructions, success criteria, reflection)
10. Fun Exercises (3 exercises)
11. Worksheet/Tracker
12. 7-Day Challenge Checklist
13. Outcome Reflection

**Writing Standards:**
- Tone: Conversational, direct, engineer's mindset, motivational but practical
- Voice: First-person from Haider's perspective, authentic, expert but relatable
- Language: Simple, clear, concrete, short sentences, active voice, modern references
- Formatting: Heavy use of bullets, numbered lists, tables, diagrams, quote boxes, script boxes

**Metadata Requirements:**
Every chapter must include YAML frontmatter with: id, title, sidebar_position, tags (part/context/skill), description, keywords, image, principle number, carnegie_quote, badge, xp, estimated_reading, estimated_practice, difficulty, related_chapters, author, last_updated.

## Gamification & Engagement System

**XP Distribution:**
- Part 1 (3 chapters): 100 XP each = 300 XP
- Part 2 (6 chapters): 75 XP each = 450 XP
- Part 3 (12 chapters): 75 XP each = 900 XP
- Part 4 (9 chapters): 75 XP each = 675 XP
- Bonus exercises: Up to 500 XP

**Badge System:** 30 unique badges, one per chapter. Master Influencer Status upon 100% completion.

**Progress Tracking:** Chapter completion percentage, XP accumulation graph, badge collection display, 30-day calendar visualization must all be implemented and functional.

## Governance

This constitution supersedes all other development practices. Amendments require:
1. Documentation of proposed change
2. Impact analysis on existing chapters
3. Version bump according to semantic versioning
4. Migration plan for affected content

**Versioning Policy:**
- MAJOR: Backward incompatible changes (principle removal, structure overhaul)
- MINOR: New sections, additional principles, material expansions
- PATCH: Clarifications, typo fixes, non-semantic refinements

**Compliance Review:** All chapters must be validated against this constitution before publication. Use `.specify/templates/spec-template.md` and `.specify/templates/tasks-template.md` for chapter development.

**Version**: 1.0.0 | **Ratified**: 2026-03-03 | **Last Amended**: 2026-03-03
