import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { initialTasks } from "@shared/data/initialTasks";

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: initialTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  selectors: {
    selectTasks: (state) => state.tasks,
    selectTaskById: (state, id: string) => state.tasks.find((t) => t.id === id),
  },
});

export const { updateTask, addTask, deleteTask } = taskSlice.actions;
export const { selectTasks, selectTaskById } = taskSlice.selectors;
export const taskReducer = taskSlice.reducer;
