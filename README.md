<div align="center">
  <div style="background-color: #5d5cff; width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; margin: 0 auto;">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  </div>
  
  # Aero Tracker 🚀
  
  **Instant issue tracking. Zero latency. 100% Local-First.**
  
  Aero Tracker is an ultra-fast, keyboard-centric project management tool designed for modern engineering teams. Inspired by Linear, it leverages a **Local-First Architecture** to deliver a zero-latency, serverless experience running entirely in your browser.

  <br/>
  <a href="https://wantedfvm.github.io/aero-tracker"><strong>🚀 Live Demo (Try it instantly)</strong></a>
</div>

<br />

## 🧠 The Local-First Architecture

Unlike traditional SaaS applications that rely on constant server roundtrips, Aero Tracker operates completely on the client-side. 
By utilizing **Zustand** coupled with **IndexedDB / LocalStorage Persistence**, the application stores all tasks, sprints, and user preferences natively in the browser.

**Why Local-First?**
- **Zero Latency**: Actions like creating, dragging, and deleting issues happen instantly. No loading spinners, no optimistic UI needed.
- **Serverless**: No backend or database maintenance required. Fully compatible with static hosting (GitHub Pages).
- **Privacy by Design**: Your data never leaves your machine.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with persistent middleware)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Custom Glassmorphism
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/) (Highly optimized for complex Kanban layouts)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Core Features

- **Keyboard First**: Press `C` to create issues, `Ctrl+K` to search, and `?` for the Shortcuts menu.
- **Premium Glassmorphism UI**: High-end visual aesthetics using dark mode, translucent cards, and neon glows.
- **Flawless Drag & Drop**: Smooth Kanban interactions with custom collision detection and overlay rendering.
- **Static Export Ready**: Out-of-the-box configuration for GitHub Pages deployments.

---

## 🚀 Getting Started

To run Aero Tracker locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/wantedfvm/aero-tracker.git
cd aero-tracker
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 About the Project

This project was built as a portfolio piece to demonstrate advanced frontend architecture, state management optimization, and high-fidelity UI/UX design.

*Developed with an uncompromising focus on speed and aesthetics.*
