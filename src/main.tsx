// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error("Root container not found");

const root = createRoot(container);
root.render(
  <App />
);
