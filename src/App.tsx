import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskDetails } from './components/TaskDetails/TaskDetails.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<TaskDetails />} />
    </Routes>
  );
}
