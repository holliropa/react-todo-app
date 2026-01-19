import type { Task } from "@/types.ts";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TasksContextType {
  tasks: Task[];
  addTask: (taskTitle: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newTitle: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Failed to parse tasks from local storage");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(taskTitle: string) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: taskTitle, isCompleted: false },
    ]);
  }

  function toggleTaskCompleted(taskId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  function editTask(taskId: string, newTitle: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <TasksContext value={{ tasks, addTask, toggleTaskCompleted, deleteTask, editTask }}>
      {children}
    </TasksContext>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
