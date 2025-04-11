// src/components/Widget.tsx
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { fetchCurrentWeatherByCoords, fetchForecastByCoords, WeatherData, ForecastData } from '../api/weatherApi';
import { CitySuggestion } from './SearchBar';

interface WidgetProps {
  city: CitySuggestion;
  onRemove: (cityName: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ city, onRemove }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const nodeRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentData = await fetchCurrentWeatherByCoords(city.lat, city.lon);
      const forecastData = await fetchForecastByCoords(city.lat, city.lon);
      console.log(`Dữ liệu cho ${city.name}:`, currentData, forecastData);
      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu cho ${city.name}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  if (loading || !currentWeather || !forecast) {
    return <div className="widget">Loading...</div>;
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const todayForecast = forecast.list.filter(item => item.dt_txt.startsWith(todayStr));

  return (
    <Draggable nodeRef={nodeRef}>
      <div className="widget" ref={nodeRef}>
        <button className="remove-btn" onClick={() => onRemove(city.name)}>
          Delete
        </button>
        <h3>{city.name}</h3>
        <div className="current-weather">
          <p>Nhiệt độ: {currentWeather.main.temp}°C</p>
          <p>Thời tiết: {currentWeather.weather[0].description}</p>
        </div>
        <div className="forecast">
          <h4>Dự báo theo giờ (Hôm nay)</h4>
          {todayForecast.length > 0 ? (
            <ul>
              {todayForecast.map(item => (
                <li key={item.dt}>
                  {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.main.temp}°C
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có dữ liệu dự báo theo giờ cho hôm nay</p>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default Widget;
