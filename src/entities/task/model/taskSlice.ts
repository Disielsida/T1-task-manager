import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@shared/types/task";
import { initialTasks } from "@shared/data/initialTasks";
import { loadTasks, saveTasks } from "@shared/lib/storage";

type TaskState = {
  tasks: Task[];
};

/**
 * Загружаем задачи из localStorage или сохраняем начальные, если их нет.
 */
const loadedTasks = loadTasks();
if (loadedTasks.length === 0) {
  saveTasks(initialTasks);
}

const initialState: TaskState = {
  tasks: loadedTasks ?? initialTasks,
};

/**
 * Redux-срез для управления задачами:
 * - добавление,
 * - обновление,
 * - удаление.
 * Все изменения синхронизируются с localStorage.
 */
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Обновляет задачу и сохраняет изменения в localStorage.
     */
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasks(state.tasks);
      }
    },

    /**
     * Добавляет новую задачу и сохраняет в localStorage.
     */
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },

    /**
     * Удаляет задачу по id и сохраняет результат в localStorage.
     */
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
  },

  selectors: {
    /** Возвращает все задачи. */
    selectTasks: (state) => state.tasks,

    /** Возвращает задачу по её id. */
    selectTaskById: (state, id: string) => state.tasks.find((t) => t.id === id),
  },
});

export const { updateTask, addTask, deleteTask } = taskSlice.actions;
export const { selectTasks, selectTaskById } = taskSlice.selectors;
export const taskReducer = taskSlice.reducer;
