import type { Task } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { arrayMove } from "@dnd-kit/sortable";

interface TasksState {
  tasks: Task[];
  add: (title: string) => void;
  delete: (id: string) => void;
  edit: (id: string, newTitle: string) => void;
  toggleCompleted: (id: string) => void;
  move: (fromIndex: number, toIndex: number) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    immer((set) => ({
      tasks: [],
      add: (title) =>
        set((state) => {
          state.tasks.push({
            id: crypto.randomUUID(),
            title,
            isCompleted: false,
          });
        }),
      delete: (id) =>
        set((state) => {
          const index = state.tasks.findIndex((t) => t.id === id);
          if (index === -1) return;
          state.tasks.splice(index, 1);
        }),
      edit: (id, newTitle) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (task) task.title = newTitle;
        }),
      toggleCompleted: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (task) task.isCompleted = !task.isCompleted;
        }),
      move: (fromIndex, toIndex) =>
        set((state) => {
          state.tasks = arrayMove(state.tasks, fromIndex, toIndex);
        }),
    })),
    { name: "todo-storage" },
  ),
);
