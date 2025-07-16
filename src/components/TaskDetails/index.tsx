import React from 'react';
import { useParams } from 'react-router-dom';
import { InputField, Button, T, Divider, TextField, SelectField, Option } from '@admiral-ds/react-ui';
import { useTasksForm } from '../../hooks/useTasksForm';
import styles from './TaskDetails.module.css';
import type { TaskCategory, TaskStatus, TaskPriority } from '../../types/task';
import { categoryOptions, statusOptions, priorityOptions } from '../../constants/taskOptions';


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  const renderSelectOptions = <T extends string>(
    options: { id: T; label: string }[],
  ) => {
    return options.map((option) => (
      <Option key={option.id} value={option.id}>
        {option.label}
      </Option>
    ));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.titleBlock}>
        <T font="Header/HL3" as="h1" className={styles.heading}>
          Редактирование<br />задачи
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

      <TextField
        label="Описание"
        placeholder="Введите описание задачи"
        value={task.description ?? ''}
        onChange={(e) => handleChange('description', e.target.value)}
        status={errors.description ? 'error' : undefined}
        extraText={errors.description}
        dimension="m"
        rows={4}
        maxRows={6}
        data-container-id="descriptionField"
      />

      <SelectField
        label="Категория"
        placeholder="Выберите категорию"
        mode="searchSelect"
        value={task.category}
        onChange={(e) => handleChange('category', e.target.value as TaskCategory)}
        status={errors.category ? 'error' : undefined}
        extraText={errors.category}
        dimension="m"
        data-container-id="categorySelect"
        alignSelf="center"
      >
        {renderSelectOptions(categoryOptions)}
      </SelectField>

      <SelectField
        label="Статус"
        placeholder="Выберите статус"
        mode="searchSelect"
        value={task.status}
        onChange={(e) => handleChange('status', e.target.value as TaskStatus)}
        status={errors.status ? 'error' : undefined}
        extraText={errors.status}
        dimension="m"
        data-container-id="statusSelect"
        alignSelf="center"
      >
        {renderSelectOptions(statusOptions)}
      </SelectField>

      <SelectField
        label="Приоритет"
        placeholder="Выберите приоритет"
        mode="searchSelect"
        value={task.priority}
        onChange={(e) => handleChange('priority', e.target.value as TaskPriority)}
        status={errors.priority ? 'error' : undefined}
        extraText={errors.priority}
        dimension="m"
        data-container-id="prioritySelect"
        alignSelf="center"
      >
        {renderSelectOptions(priorityOptions)}
      </SelectField>



      <div className={styles.buttons}>
        <Button dimension="m" appearance="secondary" onClick={handleCancel}>
          Отмена
        </Button>
        <Button
          dimension="m"
          appearance="primary"
          onClick={handleSave}
          disabled={!isValid}
          type="submit"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
