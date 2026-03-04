# Feature Specification: Chapter 01 - The Criticism Killer

**Feature Branch**: `001-chapter-01-criticism-killer`
**Created**: 2026-03-03
**Status**: Draft
**Input**: Chapter 1 specification based on Carnegie Principle #1: "Don't criticize, condemn, or complain"

## User Scenarios & Testing

### User Story 1 - Read and Understand the Principle (Priority: P1)

As a reader, I want to understand Carnegie's Principle #1 and why criticism fails, so I can recognize when I'm making this mistake in my daily interactions.

**Why this priority**: This is the foundational knowledge required before any behavior change can occur. Without understanding why criticism fails, readers won't be motivated to change.

**Independent Test**: Reader can explain why criticism fails and identify at least 3 reasons they personally criticize others.

**Acceptance Scenarios**:

1. **Given** a reader opens Chapter 1, **When** they read the opening story, **Then** they recognize the scenario from their own life and feel motivated to continue
2. **Given** a reader finishes the principle section, **When** asked why criticism fails, **Then** they can explain the psychology (Emotional Bank Account, state management, etc.)
3. **Given** a reader reviews the 4 reasons we criticize, **When** they reflect on their behavior, **Then** they can identify which reasons apply to them personally

---

### User Story 2 - Learn the 5-Step Framework (Priority: P1)

As a reader, I want a step-by-step framework to stop criticizing and communicate constructively, so I have a clear alternative when I feel the urge to criticize.

**Why this priority**: Understanding the problem isn't enough—readers need actionable steps they can implement immediately.

**Independent Test**: Reader can demonstrate all 5 steps of the Criticism Killer Framework in a role-play scenario.

**Acceptance Scenarios**:

1. **Given** a frustrating situation arises, **When** the reader uses the 3-Second Pause, **Then** they interrupt their automatic criticism response
2. **Given** the reader needs to address a problem, **When** they apply "Address the Behavior, Not the Person", **Then** they describe the issue without attacking character
3. **Given** a mistake has been made, **When** the reader uses "Ask, Don't Tell", **Then** they turn criticism into curiosity with genuine questions

---

### User Story 3 - Practice with Real-World Scenarios (Priority: P2)

As a reader, I want to see the principle applied in family, teen, and professional contexts, so I can adapt it to my specific situations.

**Why this priority**: Different contexts require different applications. Readers need to see concrete examples relevant to their life.

**Independent Test**: Reader can identify which scenario context applies to their situation and select the appropriate micro-script.

**Acceptance Scenarios**:

1. **Given** a family conflict over forgotten groceries, **When** the reader uses the right-way script, **Then** their spouse responds cooperatively instead of defensively
2. **Given** a teen scenario with damaged notes, **When** the reader addresses the problem without attacking, **Then** the friendship remains intact
3. **Given** a professional missed deadline, **When** the reader takes responsibility and focuses on solutions, **Then** trust is maintained and the team respects them

---

### User Story 4 - Use Micro-Scripts in Real Conversations (Priority: P2)

As a reader, I want ready-to-use scripts for DMs, in-person conversations, and workplace emails, so I don't have to figure out what to say in the moment.

**Why this priority**: In emotionally charged moments, people revert to old habits. Having pre-written scripts removes the cognitive load.

**Independent Test**: Reader successfully uses at least 3 micro-scripts from the library in real conversations within 24 hours.

**Acceptance Scenarios**:

1. **Given** someone forgets something, **When** the reader uses the script "No worries! Can we set a reminder for next time?", **Then** the interaction remains positive
2. **Given** a colleague misses a deadline, **When** the reader sends the workplace email script, **Then** the colleague responds with support needs rather than defensiveness
3. **Given** a team member makes an error, **When** the reader uses the in-person feedback script, **Then** they collaboratively solve the problem

---

### User Story 5 - Complete the Daily Mission and Track Progress (Priority: P3)

As a reader, I want to complete the 24-Hour No-Criticism Challenge and track my progress, so I can build the habit and see my improvement.

**Why this priority**: Behavior change requires practice and accountability. The mission provides structured practice with measurable success. This is Day 1-2 of the Part 1 7-Day Mastery Path.

**Independent Test**: Reader completes the 24-hour challenge, fills out the tracker worksheet, and earns 100 XP.

**Acceptance Scenarios**:

1. **Given** the reader starts the Daily Mission (Day 1), **When** they go 24 hours without criticizing, **Then** they earn 100 XP and the Zen Master badge
2. **Given** the reader catches themselves about to criticize, **When** they use the worksheet to track it, **Then** they can reflect on patterns and triggers
3. **Given** the reader completes the mission (Day 2), **When** they answer reflection questions, **Then** they identify what surprised them and what they'll do differently
4. **Given** the reader finishes Day 2, **When** they practice the 3-Second Pause in 5 situations, **Then** they're ready to proceed to Chapter 2 on Day 3

---

### User Story 6 - Complete Fun Exercises and 7-Day Challenge (Priority: P3)

As a reader, I want engaging exercises and a structured 7-day challenge, so I can master the principle through varied practice.

**Why this priority**: Mastery requires repetition over time. The 7-day challenge builds the habit through daily practice.

**Independent Test**: Reader completes all 3 exercises and the 7-day challenge checklist, earning up to 175 additional XP.

**Acceptance Scenarios**:

1. **Given** the reader does the Criticism Audit, **When** they count their tally marks, **Then** they're shocked by how often they criticize
2. **Given** the reader plays the Reframe Game, **When** they convert 5 criticisms into constructive statements, **Then** they can use the reframes in real life
3. **Given** the reader completes the 7-day challenge, **When** they finish all daily tasks, **Then** they've practiced each framework step multiple times

---

## Requirements

### Functional Requirements

- **FR-001**: Chapter MUST include the complete Carnegie Principle #1 with original quote, badge name (Zen Master), and XP points (100)
- **FR-002**: Chapter MUST include an opening story that illustrates the problem in a relatable scenario (family dinner table scene)
- **FR-003**: Chapter MUST explain the 4 psychological reasons why we criticize (feels productive, being constructive, frustration, motivation myth)
- **FR-004**: Chapter MUST include psychology insights from 4 experts: Covey (Emotional Bank Account), Robbins (State Management), Tracy (Law of Concentration), Maxwell (Law of the Lid)
- **FR-005**: Chapter MUST provide the 5-Step Criticism Killer Framework with step-by-step implementation
- **FR-006**: Chapter MUST include 3 complete tri-level scenarios (Family, Teen, Professional) showing wrong way vs. right way
- **FR-007**: Chapter MUST provide 12 micro-scripts across 3 categories (DMs/Texts, In-Person, Workplace Email)
- **FR-008**: Chapter MUST include the Daily Mission (24-Hour No-Criticism Challenge) with success criteria and reflection questions
- **FR-009**: Chapter MUST include 3 fun exercises (Criticism Audit, Reframe Game, Compliment Challenge) with XP rewards
- **FR-010**: Chapter MUST include an interactive worksheet/tracker for logging criticism instances and progress
- **FR-011**: Chapter MUST include a 7-Day Challenge Checklist with daily tasks and XP rewards (total 175 XP)
- **FR-012**: Chapter MUST display gamification elements: badge (Zen Master), XP points (100 base + bonuses), progress tracking
- **FR-013**: Each scenario MUST show: context, wrong way (what you say/what they hear/their reaction), why it fails, right way, result, and word-for-word script
- **FR-014**: Each micro-script MUST include: situation, exact script text, context tag (family/teen/professional), and tone (casual/formal/empathetic)
- **FR-015**: Chapter metadata MUST include: chapter number (1), part (Foundations), difficulty (intermediate), estimated time, related chapters, tags
- **FR-016**: Chapter MUST include Integration Notes section explaining the 3-Step Influence Foundation model (Stop Damage → Build Trust → Inspire Action)
- **FR-017**: Chapter metadata MUST include: `part_number: 1`, `learning_path_days: "1-2"`, `part_challenge: "The Foundation Builder Challenge (50 XP)"`

### Key Entities

- **Principle**: Core Carnegie principle with number, title, quote, badge, XP, part, difficulty level
- **Scenario**: Tri-level scenario (Family/Teen/Professional) with wrong way, right way, psychology explanation, and script
- **Micro-Script**: Ready-to-use exact words for specific situations, categorized by communication channel
- **Mission**: Daily challenge with XP reward, instructions, success criteria, and reflection questions
- **Exercise**: Practice activity (reflection/practice/challenge/game) with XP reward and instructions
- **Worksheet**: Interactive tracker with fields for logging situations, responses, outcomes, and reflections
- **7-Day Challenge**: Structured daily practice program with specific tasks and cumulative XP

## Success Criteria

### Measurable Outcomes

- **SC-001**: Readers can identify at least 3 personal triggers for criticism after completing the Criticism Audit exercise
- **SC-002**: 90% of readers successfully complete the 24-Hour No-Criticism Challenge on first attempt
- **SC-003**: Readers use at least 3 micro-scripts from the library within 24 hours of reading the chapter
- **SC-004**: 75% of readers complete the full 7-Day Challenge Checklist
- **SC-005**: Readers report improved relationship dynamics (measured via worksheet reflection: "What changed in your interactions?")
- **SC-006**: Average chapter completion time is 30 minutes reading + 24 hours practice (as estimated)
- **SC-007**: Readers can demonstrate all 5 steps of the Criticism Killer Framework in role-play scenarios
- **SC-008**: 85% of readers earn the Zen Master badge by completing the chapter mission
- **SC-009**: 80% of readers who complete Chapter 1 proceed to Chapter 2 within 7 days

## Assumptions

- Readers have access to digital or printable worksheet formats
- Readers are motivated to improve their relationships and communication skills
- Readers have at least one relationship (family/friend/colleague) where they currently use criticism
- Readers can dedicate 24 hours to the Daily Mission without major interruptions
- The Docusaurus platform supports interactive components (XP tracking, badge display, progress visualization)
- Readers are expected to continue to Chapters 2 and 3 as part of the 7-day Part 1 learning path
- Part 1 progress tracking dashboard exists at part level

## Notes

- Chapter 1 is the foundation for all subsequent chapters—mastery here is critical for success with Principles 2-30
- The 24-Hour No-Criticism Challenge is intentionally difficult; bonus XP is available for extended challenges (48 hours, helping others)
- Related chapters: Chapter 2 (Fuel Tank Principle - appreciation as alternative to criticism), Chapter 12 (Quick Admission - admitting mistakes quickly)
- Chapter 1 is part of the Part 1 7-Day Mastery Path (Days 1-2)
- Upon completion, readers are encouraged to attempt the Part 1 Integration Challenge: "The Foundation Builder Challenge" (50 XP)

## Integration Notes

### The 3-Step Influence Foundation

Chapter 1 is the first step in a 3-part foundation that transforms your ability to influence others:

**STEP 1: Stop the Damage (Chapter 1)**
- Stop criticizing, condemning, complaining
- Remove withdrawals from Emotional Bank Account
- Create neutral ground

**STEP 2: Build the Trust (Chapter 2)**
- Give honest, sincere appreciation
- Make deposits to Emotional Bank Account
- Build positive balance

**STEP 3: Inspire Action (Chapter 3)**
- Arouse eager want in others
- Frame requests in their terms (WIIFM)
- Leverage trust to influence

**The Sequence Matters:**
You can't build trust (Chapter 2) while still criticizing (Chapter 1).
You can't inspire action (Chapter 3) without trust (Chapter 2).

**Example: Getting your teen to clean their room**

| Approach | What You Say | Result |
|----------|-------------|--------|
| Wrong (Criticism only) | "Your room is a disaster! Clean it now or you're grounded!" | Compliance with resentment. Relationship damaged. |
| Chapter 1 only | "The backpack is a tripping hazard. Can you put it away?" | Better—no criticism. But no motivation either. |
| All 3 Chapters | "I noticed you organized your desk yesterday. That looked great. The backpack is a tripping hazard. If you keep the hallway clear, you'll have more space to move around, and I won't have to nag you about it. Can you put it away?" | Compliance without resentment. Relationship intact. |

**Master them in order. Use them together.**

### Part 1 Integration Challenge (Optional)

After completing all 3 chapters, attempt **"The Foundation Builder Challenge"** (50 XP):
- Use all 3 principles in ONE difficult conversation
- Plan your approach using: (1) No criticism, (2) Genuine appreciation, (3) WIIFM framing
- Track the outcome and reflect on what worked

This challenge is tracked at the Part 1 level, not individual chapter level.
