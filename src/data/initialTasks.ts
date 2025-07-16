import type { Task } from '../types/task';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Fix login bug',
    description: 'Users cannot log in with social accounts.',
    category: 'Bug',
    status: 'To Do',
    priority: 'High',
  },
  {
    id: '2',
    title: 'Implement dark mode',
    description: 'Add theme switcher to settings page.',
    category: 'Feature',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Describe all endpoints in Swagger format.',
    category: 'Documentation',
    status: 'To Do',
    priority: 'Low',
  },
  {
    id: '4',
    title: 'Refactor auth module',
    description: 'Separate concerns and improve testability.',
    category: 'Refactor',
    status: 'Done',
    priority: 'Medium',
  },
  {
    id: '5',
    title: 'Add unit tests for TaskList',
    description: 'Cover all cases with Jest.',
    category: 'Test',
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: '6',
    title: 'Fix typo in homepage header',
    description: 'Correct spelling mistake in the main banner.',
    category: 'Bug',
    status: 'To Do',
    priority: 'Low',
  }
];
