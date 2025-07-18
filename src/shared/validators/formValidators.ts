import type { Task } from "@shared/types/task";

export type TaskErrors = Partial<Record<keyof Task, string>>;

export const validateField = (
  field: keyof Task,
  value: Task[keyof Task],
): string => {
  switch (field) {
    case "title":
      return typeof value === "string" && value.trim() === ""
        ? "Заголовок не может быть пустым"
        : "";
    case "description":
      return typeof value === "string" && value.length > 300
        ? "Описание слишком длинное"
        : "";
    default:
      return "";
  }
};

export const validateAllFields = (task: Task): TaskErrors => {
  const result: TaskErrors = {};

  (Object.keys(task) as (keyof Task)[]).forEach((field) => {
    const error = validateField(field, task[field]);
    if (error) {
      result[field] = error;
    }
  });

  return result;
};
