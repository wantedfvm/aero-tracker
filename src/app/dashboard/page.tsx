"use client";

import { useIssueStore, Status, Task } from "@/store/useIssueStore";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MoreHorizontal, AlertCircle, CheckCircle2, CircleDashed, Plus, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  useDroppable,
  useDraggable
} from "@dnd-kit/core";

export default function DashboardPage() {
  const { tasks, addMockData, updateTaskStatus } = useIssueStore();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as Status; // Column ID is the status

    const task = tasks.find((t) => t.id === activeId);
    if (task && task.status !== overId) {
      updateTaskStatus(activeId, overId);
    }
  };

  if (!isMounted) return <div className="h-full flex items-center justify-center text-foreground/50">Loading workspace...</div>;

  const columns: { id: Status; title: string; icon: any; color: string }[] = [
    { id: "todo", title: "To Do", icon: CircleDashed, color: "text-foreground/50" },
    { id: "in-progress", title: "In Progress", icon: AlertCircle, color: "text-yellow-500" },
    { id: "done", title: "Done", icon: CheckCircle2, color: "text-primary" },
  ];

  return (
    <div className="flex flex-col h-full z-10 relative">
      
      <header className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-lg">My Issues</h1>
          <div className="h-4 w-px bg-border/50" />
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <span>{tasks.length} issues</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-primary transition-colors" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search (Ctrl+K)" 
              className="bg-secondary/40 border border-border/40 text-sm rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-64 placeholder:text-foreground/30"
            />
          </div>
          <button className="p-1.5 text-foreground/50 hover:text-foreground hover:bg-secondary/80 rounded-md transition-colors border border-transparent hover:border-border/50">
            <Filter className="w-4 h-4" />
          </button>
          {tasks.length === 0 && (
             <button onClick={addMockData} className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded hover:bg-primary/30 transition-colors font-medium">
               Populate Data
             </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-x-auto p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex items-start gap-6 h-full min-w-max">
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} tasks={tasks.filter(t => t.status === column.id)} />
            ))}
          </div>
          
          <DragOverlay>
            {activeTask ? <IssueCard task={activeTask} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

function KanbanColumn({ column, tasks }: { column: any, tasks: Task[] }) {
  const { deleteTask } = useIssueStore();
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="w-[320px] flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-2">
          <column.icon className={`w-4 h-4 ${column.color}`} />
          <span className="font-semibold text-sm">{column.title}</span>
          <span className="text-xs font-medium bg-secondary text-foreground/60 px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 p-1 text-foreground/40 hover:text-foreground transition-all">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div 
        ref={setNodeRef} 
        className={`flex-1 flex flex-col gap-3 pb-20 rounded-xl transition-colors ${
          isOver ? "bg-white/5 border border-primary/30" : ""
        }`}
      >
        {tasks.map((task) => (
          <DraggableIssueCard key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
        ))}
        
        {tasks.length === 0 && !isOver && (
          <div className="h-24 border border-dashed border-border/40 rounded-xl flex items-center justify-center text-xs text-foreground/30 font-medium bg-secondary/10">
            Drag issues here
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableIssueCard({ task, onDelete }: { task: Task, onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // We use a simple div here. AnimatePresence keeps the old node alive,
  // creating two nodes with the same ID for dnd-kit (which breaks it).
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${isDragging ? "opacity-0" : "opacity-100"} transition-opacity`}
    >
      <IssueCard task={task} onDelete={onDelete} />
    </div>
  );
}

function IssueCard({ task, isOverlay = false, onDelete }: { task: Task, isOverlay?: boolean, onDelete?: () => void }) {
  return (
    <div className={`glass-card p-3 rounded-xl transition-colors cursor-grab active:cursor-grabbing group ${
      isOverlay ? "border-primary shadow-2xl scale-105 rotate-2" : "hover:border-primary/40"
    }`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-foreground/40 tracking-wide">{task.id}</span>
        
        {/* We use onPointerDown to prevent the click from initiating a dnd-kit drag */}
        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="opacity-0 group-hover:opacity-100 text-foreground/40 hover:text-red-500 transition-all z-10 relative p-1 rounded-md hover:bg-red-500/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-sm font-medium leading-snug mb-3">
        {task.title}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2"></div>
        <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">
          W
        </div>
      </div>
    </div>
  );
}
