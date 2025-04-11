// src/App.tsx
import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>React Weather App</h1>
      <Dashboard />
    </div>
  );
};

export default App;
