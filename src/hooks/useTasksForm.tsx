import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';
import type { Task } from '../types/task';
import { ROUTES } from '../routes';

type TaskErrors = Partial<Record<keyof Task, string>>;

export const useTasksForm = (id: string | undefined) => {
  const navigate = useNavigate();
  const { getTask, updateTask } = useTasks();

  const [task, setTask] = useState<Task | null>(null);
  const [errors, setErrors] = useState<TaskErrors>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    const current = getTask(id);
    if (current) {
      setTask(current);
    } else {
      navigate(ROUTES.HOME);
    }
  }, [id, getTask, navigate]);

  const hasFocused = useRef(false);

  useEffect(() => {
    if (task && inputRef.current && !hasFocused.current) {
      inputRef.current.focus();
      inputRef.current.select();
      hasFocused.current = true;
    }
  }, [task]);

  const validateField = (field: keyof Task, value: Task[keyof Task]): string => {
    switch (field) {
      case 'title':
        return typeof value === 'string' && value.trim() === ''
          ? 'Заголовок не может быть пустым'
          : '';
      default:
        return '';
    }
  };

  const validateAllFields = (task: Task): TaskErrors => {
    const result: TaskErrors = {};

    (Object.keys(task) as (keyof Task)[]).forEach((field) => {
      const error = validateField(field, task[field]);
      if (error) {
        result[field] = error;
      }
    });

    return result;
  };

  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    console.log(value);
    if (!task) return;

    const updated = { ...task, [field]: value };
    setTask(updated);

    const error = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleSave = () => {
    if (!task) return;

    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateTask(task);
    navigate(ROUTES.HOME);
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  const isValid = Object.values(validateAllFields(task || {} as Task)).every((e) => !e);

  return {
    task,
    errors,
    inputRef,
    handleChange,
    handleSave,
    handleCancel,
    isValid,
  };
};
