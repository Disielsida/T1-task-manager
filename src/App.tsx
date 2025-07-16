import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskDetails } from './components/TaskDetails/TaskDetails.tsx';
import { ROUTES } from './routes';
import { Modal } from '@admiral-ds/react-ui';


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
              <Modal
                onClose={handleClose}
                aria-labelledby="edit-task"
                style={{ overflow: 'auto' }}
              >
                <TaskDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
