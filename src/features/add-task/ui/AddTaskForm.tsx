import React, { useEffect, useState } from "react";
import {
  InputField,
  TextField,
  SelectField,
  Option,
  Button,
  T,
} from "@admiral-ds/react-ui";
import { useAddTaskForm } from "@features/add-task/model/useAddTaskForm";
import styles from "./AddTaskForm.module.css";
import {
  categoryOptions,
  statusOptions,
  priorityOptions,
} from "@shared/constants/taskOptions";
import type {
  TaskCategory,
  TaskStatus,
  TaskPriority,
} from "@shared/types/task";

export const AddTaskForm: React.FC = () => {
  const {
    task,
    errors,
    inputRef,
    handleChange,
    handleSave,
    handleCancel,
    isValid,
  } = useAddTaskForm();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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
        <div className={styles.titleWithUnderline}>
          <T
            font={isMobile ? "Header/H1" : "Header/HL3"}
            as="h1"
            className={styles.heading}
          >
            Новая задача
          </T>
          <div className={styles.titleUnderline} />
        </div>
      </div>

      <InputField
        label="Заголовок"
        value={task.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Введите заголовок задачи"
        ref={inputRef}
        status={errors.title ? "error" : undefined}
        extraText={errors.title}
      />

      <TextField
        label="Описание"
        placeholder="Введите описание задачи"
        value={task.description ?? ""}
        onChange={(e) => handleChange("description", e.target.value)}
        status={errors.description ? "error" : undefined}
        extraText={errors.description}
        dimension="m"
        rows={4}
        maxRows={6}
      />

      <SelectField
        label="Категория"
        placeholder="Выберите категорию"
        mode="select"
        value={task.category}
        onChange={(e) =>
          handleChange("category", e.target.value as TaskCategory)
        }
        status={errors.category ? "error" : undefined}
        extraText={errors.category}
        dimension="m"
      >
        {renderSelectOptions(categoryOptions)}
      </SelectField>

      <SelectField
        label="Статус"
        placeholder="Выберите статус"
        mode="select"
        value={task.status}
        onChange={(e) => handleChange("status", e.target.value as TaskStatus)}
        status={errors.status ? "error" : undefined}
        extraText={errors.status}
        dimension="m"
      >
        {renderSelectOptions(statusOptions)}
      </SelectField>

      <SelectField
        label="Приоритет"
        placeholder="Выберите приоритет"
        mode="select"
        value={task.priority}
        onChange={(e) =>
          handleChange("priority", e.target.value as TaskPriority)
        }
        status={errors.priority ? "error" : undefined}
        extraText={errors.priority}
        dimension="m"
      >
        {renderSelectOptions(priorityOptions)}
      </SelectField>

      <div className={styles.buttons}>
        <Button appearance="secondary" onClick={handleCancel} dimension="m">
          Отмена
        </Button>
        <Button
          appearance="primary"
          type="submit"
          disabled={!isValid}
          dimension="m"
        >
          Создать
        </Button>
      </div>
    </form>
  );
};
