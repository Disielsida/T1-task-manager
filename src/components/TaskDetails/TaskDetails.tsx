import React from 'react';
import { useParams } from 'react-router-dom';
import { InputField, Button, T, Divider } from '@admiral-ds/react-ui';
import { useTasksForm } from '../../hooks/useTasksForm';
import styles from './TaskDetails.module.css';

export const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    task,
    errors,
    inputRef,
    handleChange,
    handleSave,
    handleCancel,
    isValid,
  } = useTasksForm(id);

  if (!task) return null;

  return (
    <div className={styles.container}>
      <div className={styles.titleBlock}>
        <T font="Header/HL2" as="h1" className={styles.heading}>
          Редактирование задачи
          <Divider dimension="m" className="titleUnderline" />
        </T>
      </div>

      <InputField
        label="Заголовок"
        value={task.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Введите заголовок задачи"
        ref={inputRef}
        status={errors.title ? 'error' : undefined}
        extraText={errors.title}
      />

      <div className={styles.buttons}>
        <Button dimension="m" appearance="secondary" onClick={handleCancel}>
          Отмена
        </Button>
        <Button
          dimension="m"
          appearance="primary"
          onClick={handleSave}
          disabled={!isValid}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
