import './global.scss';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render React component
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
