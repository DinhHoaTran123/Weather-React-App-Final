// src/components/Dashboard.tsx
import React, { useState } from 'react';
import SearchBar, { CitySuggestion } from './SearchBar';
import Widget from './Widget';

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<CitySuggestion[]>([]);

  const handleCitySelect = (city: CitySuggestion) => {
    // Kiểm tra trùng lặp dựa trên tên và tọa độ (lat, lon)
    if (!widgets.find(w => w.name === city.name && w.lat === city.lat && w.lon === city.lon)) {
      setWidgets(prev => [...prev, city]);
    }
  };

  const handleRemoveWidget = (cityName: string) => {
    setWidgets(prev => prev.filter(city => city.name !== cityName));
  };

  return (
    <div className="dashboard">
      <SearchBar onCitySelect={handleCitySelect} />
      <div className="widgets-container">
        {widgets.map((city, idx) => (
          <Widget key={`${city.name}-${idx}`} city={city} onRemove={handleRemoveWidget} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
