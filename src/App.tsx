import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskDetails } from './components/TaskDetails';
import { ROUTES } from './routes';
import {ModalEditTask} from './components/ModalEditTask'


export default function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(ROUTES.HOME);
  };


  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.TASK()} element={<TaskDetails />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={ROUTES.TASK()}
            element={
              <ModalEditTask onClose={handleClose} labelledBy="edit-task">
                <TaskDetails />
              </ModalEditTask>
            }
          />
        </Routes>
      )}
    </>
  );
}
