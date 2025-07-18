import type { TaskCategory, TaskStatus, TaskPriority } from "../types/task";

export const categoryOptions = [
  { id: "Bug", label: "Bug" },
  { id: "Feature", label: "Feature" },
  { id: "Documentation", label: "Documentation" },
  { id: "Refactor", label: "Refactor" },
  { id: "Test", label: "Test" },
] satisfies { id: TaskCategory; label: string }[];

export const statusOptions = [
  { id: "To Do", label: "To Do" },
  { id: "In Progress", label: "In Progress" },
  { id: "Done", label: "Done" },
] satisfies { id: TaskStatus; label: string }[];

export const priorityOptions = [
  { id: "Low", label: "Low" },
  { id: "Medium", label: "Medium" },
  { id: "High", label: "High" },
] satisfies { id: TaskPriority; label: string }[];
