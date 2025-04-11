// src/context/SettingsContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  unit: 'metric' | 'imperial';
  toggleUnit: () => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  unit: 'metric',
  toggleUnit: () => {}
});

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const toggleUnit = () => {
    setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <SettingsContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </SettingsContext.Provider>
  );
};
