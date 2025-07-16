import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';
import type { Task } from '../types/task';

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
      navigate('/');
    }
  }, [id, getTask, navigate]);

  const hasFocused = useRef(false); //используем реф, чтобы ререндер не влиял на значение

  useEffect(() => {
    if (task && inputRef.current && !hasFocused.current) {
      inputRef.current.focus();
      inputRef.current.select();
      hasFocused.current = true;
    }
  }, [task]);

  const validateField = (field: keyof Task, value: Task[keyof Task]): string => {
    if (field === 'title' && typeof value === 'string' && value.trim() === '') {
      return 'Заголовок не может быть пустым';
    }
    return '';
  };

  const validateAllFields = (task: Task): TaskErrors => {
    const result: TaskErrors = {};
    (['title'] as (keyof Task)[]).forEach((field) => {
      const error = validateField(field, task[field]);
      if (error) result[field] = error;
    });
    return result;
  };

  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
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
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const isValid = task?.title.trim() !== '';

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
