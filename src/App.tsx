import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskDetails } from './components/TaskDetails/TaskDetails.tsx';
import { ROUTES } from './routes';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.TASK()} element={<TaskDetails />} />
    </Routes>
  );
}
