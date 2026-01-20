import styles from "./styles.module.css";
import { TbCheck, TbPencil, TbTrash } from "react-icons/tb";
import type { Task } from "@/types";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { useTasksStore } from "@/store/useTasksStore.ts";
import { Link } from "react-router-dom";

interface Props {
  task: Task;
  onCompleted: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onCompleted, onDelete }: Props) {
  const editTask = useTasksStore((state) => state.edit);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSave() {
    if (!editedTitle.trim()) return;

    editTask(task.id, editedTitle);
    setIsEditing(false);
  }

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={onCompleted}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <div className={styles.contentContainer}>
        {isEditing ? (
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <Link to={`task/${task.id}`}>
            <p className={task.isCompleted ? styles.textCompleted : ""}>
              {task.title}
            </p>
          </Link>
        )}
      </div>

      <button
        className={styles.actionButton}
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
      >
        {isEditing ? <TbCheck size={20} /> : <TbPencil size={20} />}
      </button>

      <button className={styles.deleteButton} onClick={onDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
