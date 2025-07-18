import React, { createContext, useContext, useState } from "react";
import { initialTasks } from "@shared/data/initialTasks";
import type { Task } from "@shared/types/task";

type TasksContextType = {
  tasks: Task[];
  getTask: (id: string) => Task | undefined;
  updateTask: (updatedTask: Task) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getTask = (id: string) => tasks.find((task) => task.id === id);

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, getTask, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
