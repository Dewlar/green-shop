import './global.scss';
import 'react-toastify/dist/ReactToastify.css';
import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './app/app';
import { StateProvider } from './app/state/state-context';
import ScrollToTop from './app/route/scrollToTop';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render React component
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <StateProvider>
        <App />
        <ToastContainer />
      </StateProvider>
    </BrowserRouter>
  </StrictMode>
);
