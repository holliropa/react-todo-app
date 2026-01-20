import styles from "./styles.module.css";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTaskItem } from "@/components/TaskItem";
import { useTasksStore } from "@/store/useTasksStore.ts";

export function Tasks() {
  const tasks = useTasksStore((state) => state.tasks);
  const toggleTaskCompleted = useTasksStore((state) => state.toggleCompleted);
  const deleteTask = useTasksStore((state) => state.delete);
  const moveTask = useTasksStore((state) => state.move);

  const tasksCount = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    moveTask(oldIndex, newIndex);
  }

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

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className={styles.list}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <SortableTaskItem
                key={task.id}
                task={task}
                onCompleted={() => toggleTaskCompleted(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </section>
  );
}
