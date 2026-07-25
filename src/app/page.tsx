"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Layers, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Aero Tracker</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-foreground/70">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#method" className="hover:text-foreground transition-colors">Method</Link>
          <Link href="#changelog" className="hover:text-foreground transition-colors">Changelog</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            Try Demo
          </Link>
          <Link href="/dashboard" className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-full hover:bg-foreground/90 transition-all">
            Enter Workspace
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 pt-24 pb-32">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-secondary/50 mb-8 text-xs font-medium text-primary">
            <Zap className="w-3 h-3" />
            <span>Local-First Architecture</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
            Instant issue tracking, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">zero latency.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl font-light">
            Aero Tracker runs entirely in your browser using IndexedDB. 
            No databases, no loading screens, just pure speed. Try it instantly without creating an account.
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all group">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/wantedfvm/aero-tracker" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/80 transition-all border border-border/50">
              <Terminal className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-24 w-full max-w-6xl glass-card rounded-2xl border border-border/40 overflow-hidden relative z-10"
        >
          {/* Mac window controls */}
          <div className="h-10 border-b border-border/40 flex items-center px-4 gap-2 bg-secondary/30">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          
          {/* Mockup content */}
          <div className="flex h-[500px]">
            {/* Sidebar (Mimic layout.tsx) */}
            <div className="w-[260px] flex-shrink-0 border-r border-border/40 bg-secondary/20 flex flex-col p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-2 py-1 rounded-md bg-white/5">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/20">
                    W
                  </div>
                  <span className="font-medium text-sm">Wanted's Workspace</span>
                </div>
              </div>
              <nav className="flex flex-col gap-1 mt-6">
                <div className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider px-2 mb-2">
                  Your Views
                </div>
                <div className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-foreground font-medium bg-white/5 relative">
                  <Layers className="w-4 h-4" />
                  <span>My Issues</span>
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-r-full" />
                </div>
                <div className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-foreground/60">
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </div>
              </nav>
            </div>

            {/* Main Area (Mimic Kanban page.tsx) */}
            <div className="flex-1 p-6 flex flex-col bg-background/50 overflow-hidden relative">
              {/* Fake topbar */}
              <div className="h-10 border-b border-border/40 flex items-center justify-between mb-6 pb-4">
                <div className="flex items-center gap-4">
                  <h1 className="font-semibold text-lg">My Issues</h1>
                  <div className="h-4 w-px bg-border/50" />
                  <span className="text-sm text-foreground/50">3 issues</span>
                </div>
              </div>

              {/* Columns */}
              <div className="flex items-start gap-6 h-full min-w-max">
                
                {/* Todo Column */}
                <div className="w-[300px] flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-foreground/50 border-dashed" />
                      <span className="font-semibold text-sm">To Do</span>
                      <span className="text-xs font-medium bg-secondary text-foreground/60 px-1.5 py-0.5 rounded-full">2</span>
                    </div>
                  </div>
                  <div className="glass-card p-3 rounded-xl border border-border/50 shadow-sm opacity-90">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-foreground/40 tracking-wide">AER-101</span>
                    </div>
                    <p className="text-sm font-medium leading-snug mb-3">Implement WebSocket sync</p>
                    <div className="flex items-center justify-end mt-auto">
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">W</div>
                    </div>
                  </div>
                  <div className="glass-card p-3 rounded-xl border border-border/50 shadow-sm opacity-90">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-foreground/40 tracking-wide">AER-102</span>
                    </div>
                    <p className="text-sm font-medium leading-snug mb-3">Design System Overhaul</p>
                    <div className="flex items-center justify-end mt-auto">
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">W</div>
                    </div>
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="w-[300px] flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin-slow" style={{ animationDuration: '3s' }} />
                      <span className="font-semibold text-sm">In Progress</span>
                      <span className="text-xs font-medium bg-secondary text-foreground/60 px-1.5 py-0.5 rounded-full">1</span>
                    </div>
                  </div>
                  <div className="glass-card p-3 rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(148,163,255,0.1)] relative">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-foreground/40 tracking-wide">AER-103</span>
                    </div>
                    <p className="text-sm font-medium leading-snug mb-3">Optimistic UI updates for Kanban</p>
                    <div className="flex items-center justify-end mt-auto">
                      <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">W</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
