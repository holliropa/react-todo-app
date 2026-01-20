import styles from "./styles.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import * as React from "react";
import { useState } from "react";
import { useTasksStore } from "@/store/useTasksStore";

export function Header() {
  const [title, setTitle] = useState<string>("");
  const addTask = useTasksStore((state) => state.add);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (title.length === 0) return;

    addTask(title);
    setTitle("");
  }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  return (
    <header className={styles.header}>
      <img src="/todoLogo.svg" alt="logo" />

      <form className={styles.newTaskForm} onSubmit={handleSubmit}>
        <input
          placeholder="add a new task"
          type="text"
          value={title}
          onChange={onChangeTitle}
        />
        <button>
          Create <AiOutlinePlusCircle size={18} />
        </button>
      </form>
    </header>
  );
}
