import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTasksStore } from "@/store/useTasksStore.ts";
import { TbArrowLeft, TbTrash } from "react-icons/tb";

export function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useTasksStore((state) => state.tasks.find((t) => t.id === id));

  const deleteTask = useTasksStore((state) => state.delete);

  if (!task) {
    return <div className={styles.container}>Task not found</div>;
  }

  function handleDelete() {
    deleteTask(task!.id);
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <TbArrowLeft size={24} />
        </button>
        <h1>Details</h1>
      </header>

      <div className={styles.card}>
        <h1>{task.title}</h1>
        <div className={styles.meta}>
          <span className={task.isCompleted ? styles.done : styles.todo}>
            {task.isCompleted ? "Completed" : "In Progress"}
          </span>
        </div>

        <button onClick={handleDelete} className={styles.deleteButton}>
          <TbTrash size={20} /> Delete Task
        </button>
      </div>
    </div>
  );
}
