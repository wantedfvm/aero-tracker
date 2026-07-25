"use client";

import { motion } from "framer-motion";
import { Layers, Plus, Settings, Inbox, LayoutDashboard, Keyboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NewIssueModal } from "@/components/NewIssueModal";
import { ShortcutsModal } from "@/components/ShortcutsModal";
import { useIssueStore } from "@/store/useIssueStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { openNewIssueModal, openShortcutsModal } = useIssueStore();

  const navItems = [
    { icon: Inbox, label: "Inbox", href: "/dashboard/inbox" },
    { icon: LayoutDashboard, label: "My Issues", href: "/dashboard" },
    { icon: Layers, label: "Active Sprint", href: "/dashboard/sprint" },
    { icon: Users, label: "Team", href: "/dashboard/team" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/30">
      
      {/* Sidebar */}
      <aside className="w-[260px] flex-shrink-0 border-r border-border/40 bg-secondary/20 flex flex-col justify-between">
        <div className="flex flex-col gap-6 p-4">
          
          {/* Workspace Switcher & New Issue */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/20">
                W
              </div>
              <span className="font-medium text-sm">Wanted's Workspace</span>
            </div>
            
            <button 
              onClick={openNewIssueModal}
              className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-2 rounded-md font-medium text-sm transition-all border border-primary/20 hover:border-primary"
            >
              <Plus className="w-4 h-4" />
              <span>New Issue</span>
              <div className="ml-auto flex items-center gap-1 opacity-60">
                <kbd className="bg-black/20 px-1.5 rounded text-[10px]">C</kbd>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <div className="text-[11px] font-semibold text-foreground/40 uppercase tracking-wider px-2 mb-2">
              Your Views
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors relative ${
                    isActive ? "text-foreground font-medium bg-white/5" : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border/40 flex flex-col gap-2">
           <button 
             onClick={() => alert("Settings panel is coming soon!")}
             className="flex items-center justify-between px-2 py-2 text-sm text-foreground/50 hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
           >
             <div className="flex items-center gap-2">
               <Settings className="w-4 h-4" />
               <span>Settings</span>
             </div>
             <kbd className="bg-black/20 px-1.5 rounded text-[10px] uppercase font-mono">S</kbd>
           </button>
           <button 
             onClick={openShortcutsModal}
             className="flex items-center justify-between px-2 py-2 text-sm text-foreground/50 hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
           >
             <div className="flex items-center gap-2">
               <Keyboard className="w-4 h-4" />
               <span>Shortcuts</span>
             </div>
             <kbd className="bg-black/20 px-1.5 rounded text-[10px] uppercase font-mono">?</kbd>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle radial glow background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        {children}
        <NewIssueModal />
        <ShortcutsModal />
      </main>

    </div>
  );
}
