import React from 'react';
import type { Task } from '../../types/task';
import { TaskItem } from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit }) => {
  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};
