---
id: 001
title: create-ebook-constitution
stage: constitution
date: 2026-03-03
surface: agent
model: qwen-code
feature: mastering-art-people-influence
branch: main
user: nida.nasarr
command: /sp.constitution
labels: ["constitution", "ebook", "dale-carnegie", "gamification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  null
---

## Prompt

Create or update the project constitution for "Mastering the Art of People and Influence" - a practical implementation guide based on Dale Carnegie's 30 principles from "How to Win Friends and Influence People". The book structure includes:

- 30 chapters organized into 4 parts (Foundations, Likeability & Trust, Win People to Your Thinking, Leadership & Influence)
- Gamification system with 2,250 XP total and 30 badges
- Tri-level scenarios (Family/Teen/Professional) for each chapter
- Micro-script library with 360+ scripts
- Daily missions, exercises, worksheets, and 7-day challenges
- Integration of psychology from Covey, Robbins, Tracy, and Maxwell
- Docusaurus MDX format with interactive components

## Response snapshot

Created constitution v1.0.0 with 6 core principles:
1. Principle-First Architecture
2. Tri-Level Scenario Requirement
3. Gamification Mandatory (NON-NEGOTIABLE)
4. Micro-Script Library
5. Action-First Design
6. Quality Gates

Added sections for Content Architecture Standards, Gamification & Engagement System, and Governance with semantic versioning policy.

## Outcome

- ✅ Impact: Constitution established for ebook project with clear principles, structure requirements, and quality gates
- 🧪 Tests: N/A (constitution document)
- 📁 Files: 1 created (.specify/memory/constitution.md)
- 🔁 Next prompts: Generate feature specs for individual chapters using /sp.specify
- 🧠 Reflection: Constitution captures all key requirements from user input including gamification, scenario structure, and mandatory components

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin chapter spec generation starting with Chapter 1 (The Criticism Killer)
