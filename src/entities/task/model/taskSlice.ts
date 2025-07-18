import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { initialTasks } from "@shared/data/initialTasks";
import { loadTasks, saveTasks } from "@shared/lib/storage";

type TaskState = {
  tasks: Task[];
};

const loadedTasks = loadTasks();
if (loadedTasks.length === 0) {
  saveTasks(initialTasks);
}

const initialState: TaskState = {
  tasks: loadedTasks ?? initialTasks,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
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
