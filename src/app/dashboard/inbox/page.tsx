import { Inbox } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center mb-6 shadow-2xl">
        <Inbox className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Zero Inbox</h2>
      <p className="text-foreground/50 max-w-md">
        You're all caught up! New notifications, mentions, and assignments will appear here.
      </p>
    </div>
  );
}
