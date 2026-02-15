# Project Context — AI-Powered Cybersecurity Training Simulator for Tunisia

## Project Identity

This is NOT just a game.
This is NOT a static awareness website.
This is NOT a generic chatbot.

This project is:

> An AI-Powered Cybersecurity Training Simulator designed specifically for Tunisian citizens.

It trains users to recognize, understand, and respond to real cyber threats affecting Tunisia.

The platform is interactive, localized, educational, and adaptive.

---

# Core Objectives

The platform must:

1. Be interactive (simulation-based, decision-making driven).
2. Be educational but simple (non-technical explanations).
3. Be localized to Tunisian cyber threats.
4. Promote both protection and legal responsibility.
5. Use AI intelligently (not artificially).

---

# Core Feature (Highest Priority)

## 1. AI-Driven Phishing & Scam Simulation

This is the main feature.

Users go through realistic Tunisian cyber threat scenarios:

Examples:
- Fake Poste Tunisienne SMS
- Fake bank account suspension email
- WhatsApp OTP code theft
- Facebook marketplace scam
- Fake STEG electricity bill

Each scenario:
- User must choose action (Trust / Suspicious / Scam).
- Immediate AI-generated explanation.
- Highlight red flags.
- Explain psychological manipulation.
- Provide real-life prevention advice.

This must feel realistic and dynamic.

AI must generate localized Tunisian content.

---

# Secondary Feature

## 2. AI Scam Analyzer Tool

User can paste:
- SMS
- Email
- Suspicious URL

AI returns:
- Risk score (0–100)
- List of red flags
- Why it is suspicious
- Recommended action
- Educational explanation

Output must be:
- Clear
- Simple
- Non-technical
- Arabic-first

---

# Legal Awareness Module (Lightweight)

Scenario-based micro-quiz:

Examples:
- Is accessing someone’s account without permission punishable?
- Is sharing private photos illegal?
- Is impersonating someone online a crime?

Each answer:
- Simple explanation
- Basic legal awareness
- Ethical reinforcement

No long legal text.
Keep it short and practical.

---

# Bonus Page — Cybersecurity Updates in Tunisia

This page contains:

- Recent cyber incidents in Tunisia
- AI-generated summary
- Key takeaways
- Prevention tips

Each article must answer:
1. What happened?
2. Why does it matter?
3. What can citizens learn?
4. What should they do differently?

Keep it lightweight.

---

# AI Usage Guidelines

AI must be used for:

1. Generating realistic Tunisian phishing scenarios.
2. Analyzing pasted suspicious messages.
3. Explaining red flags in simple Arabic.
4. Summarizing cybersecurity news.
5. Providing key takeaways.

Do NOT:
- Overcomplicate with model training.
- Build custom ML pipelines.
- Introduce unnecessary backend complexity.

Use prompt engineering strategically.

---

# UX Philosophy

The first screen must:

- Immediately create urgency.
- Clearly state the purpose.
- Encourage starting the simulation.

Tone:
Serious but engaging.
Not childish.
Not overly technical.

Arabic-first interface.
Optional secondary language support.

---

# Iteration Rules for Claude Code

When generating code:

1. Prioritize simplicity.
2. Avoid unnecessary architecture.
3. Avoid authentication systems.
4. Avoid databases unless strictly required.
5. Keep it deployable quickly.
6. Optimize for demo impact.
7. Improve UI clarity continuously.
8. Refactor only when it improves simplicity or clarity.
9. Suggest UI improvements where relevant.
10. Maintain clear component structure.

If something can be simplified, simplify it.

---

# Prompt Templates for AI

## 1. Generate Tunisian Phishing Scenario

Prompt Template:

Generate a realistic phishing message targeting a Tunisian citizen.

Context:
- Impersonated entity: [Poste Tunisienne / BIAT Bank / STEG / WhatsApp Contact]
- Tone: urgent but believable
- Include subtle red flags
- Use Tunisian context
- Output in Arabic (simple language)

Then also output:
- List of red flags
- Psychological tactic used
- Recommended safe action

---

## 2. Scam Analyzer Prompt

User Input: {user_message}

Prompt:

Analyze the following message for scam indicators.

Tasks:
1. Assign a risk score (0–100).
2. Identify red flags.
3. Explain why they are suspicious.
4. Suggest what the user should do.
5. Keep explanation simple and non-technical.
6. Respond in Arabic.

Message:
{user_message}

---

## 3. Cyber News Summary Prompt

Input: {news_article_text}

Prompt:

Summarize this cybersecurity incident for Tunisian citizens.

Output:
- Short summary (3–5 sentences)
- Why it matters
- 3 lessons citizens should learn
- 3 preventive actions

Language: Arabic-first.
Tone: educational and accessible.

---

# Technical Constraints

- Single-page app preferred.
- Clean component-based structure.
- Minimal backend endpoints.
- No heavy infrastructure.
- Must be demo-ready within hackathon time.

---

# Continuous Improvement Directive

When iterating:

- Improve clarity before adding features.
- Improve realism of scenarios.
- Improve educational value.
- Improve UI polish.
- Remove anything unnecessary.
- Keep the simulator central.

This is a training simulator, not a content portal.

Always ask:
Does this improve training impact?

If not, simplify.
