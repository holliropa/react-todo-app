import styles from "@/components/TaskItem/sortable.module.css";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { TaskItem } from "@/components/TaskItem/TaskItem.tsx";
import { MdDragHandle } from "react-icons/md";
import type { ComponentProps } from "react";

type TaskItemProps = ComponentProps<typeof TaskItem>;

export function SortableTaskItem(props: TaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative" as const,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.wrapper}>
      <div className={styles.dragHandle} {...attributes} {...listeners}>
        <MdDragHandle size={20} />
      </div>
      <TaskItem {...props} />
    </div>
  );
}
