// src/App.tsx
import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';
import { SettingsProvider } from './context/SettingsContext';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="App">
        <h1>React Weather App</h1>
        <Dashboard />
      </div>
    </SettingsProvider>
  );
};

export default App;
