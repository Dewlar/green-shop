import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './app/app';
import { StateProvider } from './app/state/state-context';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render React component
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <StrictMode>
    <StateProvider>
      <App />
      <ToastContainer />
    </StateProvider>
  </StrictMode>
);
