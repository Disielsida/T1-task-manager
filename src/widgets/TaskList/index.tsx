import React from "react";
import type { Task } from "@shared/types/task";
import { TaskItem } from "@entities/task/ui/TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
