import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, DropdownProvider, FontsVTBGroup } from '@admiral-ds/react-ui';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { TasksProvider } from './context/TasksContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <TasksProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TasksProvider>
      </DropdownProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
