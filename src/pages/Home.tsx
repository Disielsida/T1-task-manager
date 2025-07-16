import React from 'react';
import { T, Divider } from '@admiral-ds/react-ui';
import { TaskList } from '../components/TaskList/TaskList';
import { useTasks } from '../context/TasksContext';
import '../index.css';

export const Home: React.FC = () => {
  const { tasks } = useTasks(); 
  return (
    <div className="appContainer">
      <div className="titleBlock">
        <T font="Header/HL1" as="h1" className="pageTitle">
          Менеджер задач
          <Divider dimension="m" className="titleUnderline" />
        </T>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
};
