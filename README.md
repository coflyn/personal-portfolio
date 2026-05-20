# coflyn.my.id

<p align="center">
  <img src="preview.png" alt="coflyn Portfolio Preview" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Vanilla_CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=F0F" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

Welcome to the official repository of my personal portfolio. This project serves as a comprehensive showcase of my software development journey, featuring advanced automation tools, modern web experiences, and an intelligent AI assistant.

**Live Demo:** [coflyn.my.id](https://coflyn.my.id)

---

## Key Features

### Context-Aware AI Assistant

Integrated with an advanced AI companion powered by **Llama 3.3 70B** for a truly interactive experience.

- **Deep GitHub Integration:** The assistant can fetch and analyze READMEs, `package.json`, `requirements.txt`, and the **3 latest commits** from my repositories in real-time.
- **Live Status Integration:** Monitors real-time Discord presence (Online, Idle, or DND) and current Spotify tracks via Lanyard API.
- **Performance Optimized Typing:** Features a high-speed adaptive typing engine with smart auto-scroll that respects user interaction.
- **Personalized Easter Eggs:** Features fun conversational secrets, including interactive jokes, customized gaming interests, and philosophical insights.

### Intelligent Project Hub

A dynamically categorized grid showcasing projects fetched in real-time from GitHub.

- **Automatic Framework Classification:** Repositories are automatically analyzed and sorted into specific categories like **Node.js** (e.g. for Discord bots), **Next.js**, **React**, and **Laravel** with custom SVG icons.
- **Multi-Tag Discovery Filter:** Allows users to filter projects by language and tags simultaneously, making multi-language repos (e.g., Python scripts with `nodejs` tags) visible in multiple categories.
- **Premium Skew-Scale Transitions:** An elegant page entrance animation utilizing a left slide-in header and a liquid exponential skew-scale-up grid reveal, while maintaining smooth, native fade transitions for tag-filtering.

### Interactive "Meow-mento Mori" Mascot

A responsive pixel-art cat mascot that adds personality to the home page.

- **Reactive Dialogue:** Features witty, tech-themed speech bubbles and "tickle" responses when clicked.
- **Dynamic Animations:** Implements squash-and-stretch physics for a satisfying, tactile feel.
- **Philosophical Touch:** Blends my "Coflyn" brand with the _Memento Mori_ philosophy in a playful way.

### Minimalist & High-Tech UI

A bespoke dashboard-style design focusing on clean lines, dark mode, and focus-driven interfaces.

- **Glassmorphism:** A modern user interface utilizing frosted glass effects and refined typography.
- **Fluid Motion:** Implements smooth page transitions and element reveals via Framer Motion, Lenis smooth scrolling, and ScrollReveal.
- **Clean Browser Branding:** Unified metadata structure that removes redundant layout suffixes for a cleaner, modern tab appearance.

---

## Project Structure

```bash
src/
├── app/                  # Next.js Pages & API Routes
│   ├── about/            # Experience, education timeline & tech grid
│   ├── contact/          # Clean and animated glassmorphic contact form
│   ├── projects/         # Dynamic GitHub project hub with custom filters
│   ├── api/
│   │   ├── chat/         # Context-aware AI Chat bot endpoint (Groq / Llama)
│   │   └── contact/      # Email dispatch endpoint (Resend)
│   ├── HomeClient.js     # Interactive Home component (Cat Mascot & Typewriter)
│   └── globals.css       # Design tokens, variables & glassmorphism system
├── components/           # Reusable UI & Widget Components
│   ├── AIAssistant.js    # Floating AI chatbot drawer component
│   ├── LiveStatusCard.js # Real-time Discord presence & Spotify monitor
│   ├── TechIcons.js      # Curated custom SVG path icons for tech stack
│   └── MagneticButton.js # Premium magnetic cursor attraction effect
└── lib/                  # Data & API Integration utilities
    ├── data.js           # Static project descriptors
    └── github.js         # Real-time GitHub API fetcher
```

---

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Node.js (API Routes)
- **Styling:** Modular Vanilla CSS (Modern CSS Variables)
- **AI Engine:** Llama 3.3 70B (Groq Cloud API)
- **Real-time Data:** Lanyard API (Discord SDK)
- **Email Service:** Resend API
- **Animations:** Framer Motion & ScrollReveal
- **Deployment:** Vercel

---

## Contact

For collaborations or inquiries:

- **Web:** [coflyn.my.id/contact](https://coflyn.my.id/contact)
- **Instagram:** [@\_coflyn](https://www.instagram.com/_coflyn)
- **GitHub:** [@coflyn](https://github.com/coflyn)

Copyright 2026 — Raffi Andhika (coflyn).
