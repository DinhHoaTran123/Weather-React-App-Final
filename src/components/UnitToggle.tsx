// src/components/UnitToggle.tsx
import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const UnitToggle: React.FC = () => {
  const { unit, toggleUnit } = useContext(SettingsContext);

  return (
    <button onClick={toggleUnit} className="unit-toggle">
      Đổi sang {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
    </button>
  );
};

export default UnitToggle;
