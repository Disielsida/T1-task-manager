import React, { useMemo } from 'react';
import { T } from '@admiral-ds/react-ui';
import { TaskList } from '../components/TaskList';
import { useTasks } from '../context/TasksContext';
import { useSearchParams } from 'react-router-dom';
import { TaskFilters } from '../components/TaskFilters';
import { Footer } from '../components/Footer';
import '../index.css';

export const Home: React.FC = () => {
  const { tasks } = useTasks();
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || 'All';
  const status = searchParams.get('status') || 'All';
  const priority = searchParams.get('priority') || 'All';

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchCategory = category === 'All' || task.category === category;
      const matchStatus = status === 'All' || task.status === status;
      const matchPriority = priority === 'All' || task.priority === priority;
      return matchCategory && matchStatus && matchPriority;
    });
  }, [tasks, category, status, priority]);

  return (
    <div className="pageLayout">
      <div className="container">
        <div className="titleBlock">
          <div className="titleWithUnderline">
            <T font="Header/HL1" as="h1" className="pageTitle">
              Менеджер задач
            </T>
            <div className="titleUnderline" />
          </div>

          <TaskFilters />
        </div>

        <TaskList tasks={filteredTasks} />
      </div>
      <Footer />
    </div>
  );
};
