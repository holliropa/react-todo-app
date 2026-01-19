import styles from "./tasks.module.css";
import { TaskItem } from "../TaskItem";
import { useTasks } from "@/contexts/TasksContext.tsx";

export function Tasks() {
  const { tasks, toggleTaskCompleted, deleteTask } = useTasks();

  const tasksCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tasks</p>
          <span>{tasksCount}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>
            {completedTasksCount} of {tasksCount}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onCompleted={() => toggleTaskCompleted(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </section>
  );
}
