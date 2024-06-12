// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Your global styles
import { FirebaseProvider } from './firebase';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <FirebaseProvider>
    <App />
    </FirebaseProvider>
  </React.StrictMode>
);
