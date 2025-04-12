// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import SearchBar, { CitySuggestion } from './SearchBar';
import Widget from './Widget';
import UnitToggle from './UnitToggle';

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<CitySuggestion[]>([]);

  // Thêm widget mặc định cho Singapore khi component mount
  useEffect(() => {
    const singapore: CitySuggestion = {
      name: "Singapore",
      lat: 1.3521,
      lon: 103.8198,
      country: "SG",
    };
    setWidgets(prev => {
      const exists = prev.some(widget => widget.name.toLowerCase() === "singapore");
      if (!exists) {
        return [...prev, singapore];
      }
      return prev;
    });
  }, []);

  // Sử dụng định vị của trình duyệt để thêm widget "Vị trí hiện tại"
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation: CitySuggestion = {
            name: 'Vị trí hiện tại',
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            country: '',
          };
          setWidgets(prev => {
            const exists = prev.some(widget => widget.name === "Vị trí hiện tại");
            if (!exists) {
              return [...prev, currentLocation];
            }
            return prev;
          });
        },
        (error) => {
          console.warn('Không lấy được định vị:', error);
        }
      );
    }
  }, []);

  const handleCitySelect = (city: CitySuggestion) => {
    // Thêm widget của thành phố nếu chưa có (kiểm tra dựa theo tọa độ)
    setWidgets(prev => {
      const exists = prev.some(w => w.lat === city.lat && w.lon === city.lon);
      if (!exists) {
        return [...prev, city];
      }
      return prev;
    });
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
