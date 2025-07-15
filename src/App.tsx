import { useState } from 'react';
import { T, Link } from '@admiral-ds/react-ui';
import { TaskList } from './components/TaskList/TaskList';
import { initialTasks } from './data/initialTasks';
import type { Task } from './types/task';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleEdit = (id: string) => {
    console.log('Редактировать задачу с id:', id);
  };

  return (
    <div className="appContainer">
      <T font="Header/HL1" as="h1" className="pageTitle">
        Менеджер задач
      </T>
      <TaskList tasks={tasks} onEdit={handleEdit} />
    </div>
  );
}

