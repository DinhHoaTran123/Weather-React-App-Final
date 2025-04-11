// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import SearchBar, { CitySuggestion } from './SearchBar';
import Widget from './Widget';
import UnitToggle from './UnitToggle';

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<CitySuggestion[]>([]);

  // Khi ứng dụng khởi động, cố gắng lấy vị trí hiện tại của người dùng.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const currentLocation: CitySuggestion = {
            name: 'Vị trí hiện tại',
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            country: ''
          };
          setWidgets(prev => [...prev, currentLocation]);
        },
        error => {
          console.warn('Không lấy được định vị:', error);
        }
      );
    }
  }, []);

  const handleCitySelect = (city: CitySuggestion) => {
    if (!widgets.find(w => w.lat === city.lat && w.lon === city.lon)) {
      setWidgets(prev => [...prev, city]);
    }
  };

  const handleRemoveWidget = (cityName: string) => {
    setWidgets(prev => prev.filter(city => city.name !== cityName));
  };

  return (
    <div className="dashboard">
      <UnitToggle />
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
