"use client";

import { useIssueStore } from "@/store/useIssueStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function NewIssueModal() {
  const { isNewIssueModalOpen, closeNewIssueModal, addTask } = useIssueStore();
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when opened
  useEffect(() => {
    if (isNewIssueModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTitle(""); // clear input when closed
    }
  }, [isNewIssueModalOpen]);

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with 'C' (only if not currently typing in an input)
      if (e.key.toLowerCase() === "c" && !isNewIssueModalOpen && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        useIssueStore.getState().openNewIssueModal();
      }
      
      // Close with Escape
      if (e.key === "Escape" && isNewIssueModalOpen) {
        closeNewIssueModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNewIssueModalOpen, closeNewIssueModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask(title.trim());
    closeNewIssueModal();
  };

  return (
    <AnimatePresence>
      {isNewIssueModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNewIssueModal}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/4 -translate-x-1/2 z-50 w-full max-w-lg"
          >
            <div className="glass-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden bg-[#16161A]/90">
              
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    AER
                  </div>
                  <span className="text-sm font-medium text-foreground/80">New Issue</span>
                </div>
                <button onClick={closeNewIssueModal} className="p-1 hover:bg-white/10 rounded-md text-foreground/50 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                <input
                  ref={inputRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Issue title"
                  className="bg-transparent text-lg font-medium outline-none placeholder:text-foreground/30 w-full"
                />
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2 text-xs text-foreground/40">
                    <span>Press</span>
                    <kbd className="bg-black/30 px-1.5 py-0.5 rounded border border-white/5">Enter</kbd>
                    <span>to create</span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!title.trim()}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-4 h-4" />
                    Create Issue
                  </button>
                </div>
              </form>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
