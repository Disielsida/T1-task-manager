import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { useAppSelector } from "@shared/hooks/useAppSelector";
import { selectTaskById, updateTask } from "@entities/task/model/taskSlice";
import { ROUTES } from "@shared/config/routes";
import { validateAllFields, validateField } from "./validators";
import type { Task } from "@shared/types/task";

export const useTaskForm = (id?: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const existingTask = useAppSelector((state) =>
    id ? selectTaskById(state, id) : null,
  );

  const [task, setTask] = useState<Task | null>(existingTask ?? null);
  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFocused = useRef(false);

  useEffect(() => {
    if (!id) return;
    if (!existingTask) {
      navigate(ROUTES.HOME);
    } else {
      setTask(existingTask);
    }
  }, [id, existingTask, navigate]);

  useEffect(() => {
    if (task && inputRef.current && !hasFocused.current) {
      inputRef.current.focus();
      inputRef.current.select();
      hasFocused.current = true;
    }
  }, [task]);

  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    if (!task) return;

    const updated = { ...task, [field]: value };
    setTask(updated);

    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSave = () => {
    if (!task) return;
    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(updateTask(task));
    navigate(ROUTES.HOME);
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  const isValid = Object.values(validateAllFields(task || ({} as Task))).every(
    (e) => !e,
  );

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
