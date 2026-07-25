"use client";

import { useIssueStore } from "@/store/useIssueStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command, Search, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

export function ShortcutsModal() {
  const { isShortcutsModalOpen, closeShortcutsModal, openShortcutsModal } = useIssueStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle shortcuts with 'Shift + ?'
      if (e.key === "?" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        openShortcutsModal();
      }
      
      if (e.key === "Escape" && isShortcutsModalOpen) {
        closeShortcutsModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isShortcutsModalOpen, closeShortcutsModal, openShortcutsModal]);

  const shortcuts = [
    { label: "Create new issue", keys: ["C"], icon: Plus },
    { label: "Search issues", keys: ["Ctrl", "K"], icon: Search },
    { label: "View shortcuts", keys: ["?"], icon: Command },
    { label: "Delete issue", keys: ["Hover", "Click"], icon: Trash2 },
  ];

  return (
    <AnimatePresence>
      {isShortcutsModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeShortcutsModal}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/4 -translate-x-1/2 z-50 w-full max-w-md"
          >
            <div className="glass-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden bg-[#16161A]/90">
              
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <span className="text-sm font-medium text-foreground">Keyboard Shortcuts</span>
                <button onClick={closeShortcutsModal} className="p-1 hover:bg-white/10 rounded-md text-foreground/50 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 text-sm text-foreground/70">
                      <shortcut.icon className="w-4 h-4" />
                      <span>{shortcut.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map((key, i) => (
                        <kbd key={i} className="bg-black/30 px-2 py-1 rounded text-xs font-mono border border-white/5 text-foreground/80 shadow-sm">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
