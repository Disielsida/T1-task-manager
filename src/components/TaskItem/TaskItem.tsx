import React from 'react';
import { Button, Tag, T } from '@admiral-ds/react-ui';
import styles from './TaskItem.module.css';
import type { Task } from '../../types/task';
import { Link } from 'react-router-dom';

type TaskItemProps = {
  task: Task;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
  <div className={styles.card}>
    <div className={styles.body}>
      <div className={styles.header}>
        <T as="h4" font="Header/H4" className={styles.title}>
          {task.title}
        </T>
      </div>

      {task.description && (
        <div className={styles.description}>
          <T as="p" font="Body/Body 2 Long">
            {task.description}
          </T>
        </div>
      )}

      <div className={styles.tags}>
        <Tag dimension="m" kind="success" statusViaBackground>{task.category}</Tag>
        <Tag dimension="m" kind="primary" statusViaBackground>{task.status}</Tag>
        <Tag dimension="m" kind="warning" statusViaBackground>{task.priority}</Tag>
      </div>
    </div>

    <div className={styles.footer}>
      <Link to={`/task/${task.id}`}>
        <Button
          className={styles.button}
          dimension="s"
          appearance="secondary"
        >
          Редактировать
        </Button>
      </Link>
    </div>
  </div>
);

};
