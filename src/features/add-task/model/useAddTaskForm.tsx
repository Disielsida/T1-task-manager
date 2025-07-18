import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { addTask } from "@entities/task/model/taskSlice";
import {
  validateAllFields,
  validateField,
} from "@shared/validators/formValidators";
import { ROUTES } from "@shared/config/routes";
import type { Task } from "@shared/types/task";
import { v4 as uuidv4 } from "uuid";

export const useAddTaskForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    id: uuidv4(),
    title: "",
    description: "",
    category: "Bug",
    status: "To Do",
    priority: "Medium",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = <K extends keyof Task>(field: K, value: Task[K]) => {
    const updated = { ...task, [field]: value };
    setTask(updated);

    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSave = () => {
    const newErrors = validateAllFields(task);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addTask(task));
    navigate(ROUTES.HOME);
  };

  const handleCancel = () => {
    navigate(ROUTES.HOME);
  };

  const isValid = Object.values(validateAllFields(task)).every((e) => !e);

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
