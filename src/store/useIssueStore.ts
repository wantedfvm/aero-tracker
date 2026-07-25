import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: number;
}

interface IssueState {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  updateTaskStatus: (id: string, status: Status) => void;
  deleteTask: (id: string) => void;
  addMockData: () => void;
  isNewIssueModalOpen: boolean;
  openNewIssueModal: () => void;
  closeNewIssueModal: () => void;
  isShortcutsModalOpen: boolean;
  openShortcutsModal: () => void;
  closeShortcutsModal: () => void;
}

const mockTasks: Task[] = [
  { id: 'AER-101', title: 'Implement WebSocket sync', status: 'todo', createdAt: Date.now() },
  { id: 'AER-102', title: 'Design System Overhaul', status: 'todo', createdAt: Date.now() - 1000 },
  { id: 'AER-103', title: 'Optimistic UI updates for Kanban', status: 'in-progress', createdAt: Date.now() - 5000 },
  { id: 'AER-104', title: 'Next.js 15 migration', status: 'done', createdAt: Date.now() - 100000 },
];

export const useIssueStore = create<IssueState>()(
  persist(
    (set) => ({
      tasks: [],
      isNewIssueModalOpen: false,
      isShortcutsModalOpen: false,
      
      openNewIssueModal: () => set({ isNewIssueModalOpen: true }),
      closeNewIssueModal: () => set({ isNewIssueModalOpen: false }),

      openShortcutsModal: () => set({ isShortcutsModalOpen: true }),
      closeShortcutsModal: () => set({ isShortcutsModalOpen: false }),

      addTask: (title, description) => set((state) => {
        const newTask: Task = {
          id: `AER-${Math.floor(Math.random() * 900) + 100}`,
          title,
          description,
          status: 'todo',
          createdAt: Date.now(),
        };
        return { tasks: [...state.tasks, newTask] };
      }),
      
      updateTaskStatus: (id, status) => set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id ? { ...task, status } : task
        )
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      })),

      addMockData: () => set((state) => ({
        tasks: [...state.tasks, ...mockTasks]
      }))
    }),
    {
      name: 'aero-tracker-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
