// src/components/Widget.tsx
import React, { useState, useEffect, useRef, useContext, JSX } from 'react';
import Draggable from 'react-draggable';
import {
  fetchCurrentWeatherByCoords,
  fetchForecastByCoords,
  WeatherData,
  ForecastData,
} from '../api/weatherApi';
import { CitySuggestion } from './SearchBar';
import WeatherModal from './WeatherModal';
import { SettingsContext } from '../context/SettingsContext';

interface WidgetProps {
  city: CitySuggestion;
  onRemove: (cityName: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ city, onRemove }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [forecastMode, setForecastMode] = useState<'hourly' | 'daily'>('hourly');
  // state cho số ngày dự báo (1 đến 7)
  const [forecastDays, setForecastDays] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { unit } = useContext(SettingsContext);

  // State lưu lại kích thước widget (đơn vị: pixel)
  const [dimensions, setDimensions] = useState<{ width: number}>({
    width: 350,
  });

  // Các biến ref dùng để theo dõi thao tác resize
  const resizingRef = useRef<boolean>(false);
  const initialMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialDimensions = useRef<{ width: number }>({
    width: dimensions.width,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentData = await fetchCurrentWeatherByCoords(city.lat, city.lon, unit);
      const forecastData = await fetchForecastByCoords(city.lat, city.lon, unit);
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
  }, [city, unit]);

  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      setForecastMode('hourly');
      setForecastDays(5);
      fetchData();
    }, 1 * 60 * 60 * 1000); 

    return () => clearTimeout(resetTimeout);
  }, []); 

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    resizingRef.current = true;
    initialMousePos.current = { x: e.clientX, y: e.clientY };
    initialDimensions.current = { width: dimensions.width};
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const deltaX = e.clientX - initialMousePos.current.x;
    setDimensions({
      width: Math.max(200, initialDimensions.current.width + deltaX),
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    resizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  if (loading || !currentWeather || !forecast) {
    return <div className="widget">Loading...</div>;
  }

  // Dynamic background based on weather condition (có thể điều chỉnh nếu cần)
  const weatherMain = currentWeather.weather[0].main.toLowerCase();
  let bgClass = '';
  if (weatherMain.includes('clear')) bgClass = 'clear';
  else if (weatherMain.includes('cloud')) bgClass = 'cloudy';
  else if (weatherMain.includes('rain')) bgClass = 'rainy';
  else if (weatherMain.includes('snow')) bgClass = 'snowy';
  else bgClass = 'default';

  const toggleForecastMode = () => {
    setForecastMode(prev => (prev === 'hourly' ? 'daily' : 'hourly'));
  };

  // Bảng ánh xạ mô tả thời tiết: nếu cần thay "mist" thành "Chi tiết thời tiết"
  const weatherDescriptionMap: Record<string, string> = {
    mist: 'Chi tiết thời tiết',
    // Bạn có thể bổ sung thêm ánh xạ khác nếu cần
  };

  const originalDescription = currentWeather.weather[0].description.toLowerCase();
  const displayDescription =
    weatherDescriptionMap[originalDescription] || currentWeather.weather[0].description;

  // Render forecast content dựa trên chế độ chọn
  let forecastContent: JSX.Element;
  if (forecastMode === 'hourly') {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayForecast = forecast.list.filter(item => item.dt_txt.startsWith(todayStr));
    forecastContent = todayForecast.length ? (
      <ul>
        {todayForecast.map(item => (
          <li key={item.dt}>
            {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {item.main.temp}°
          </li>
        ))}
      </ul>
    ) : (
      <p>Không có dữ liệu dự báo theo giờ cho hôm nay.</p>
    );
  } else {
    // Nhóm dữ liệu dự báo theo ngày
    const dailyData: { [key: string]: number[] } = {};
    forecast.list.forEach(item => {
      const day = item.dt_txt.split(' ')[0];
      if (!dailyData[day]) {
        dailyData[day] = [];
      }
      dailyData[day].push(item.main.temp);
    });
    const availableDays = Object.keys(dailyData);
    // Lấy số ngày theo giá trị forecastDays, không vượt quá số ngày có sẵn
    const days = availableDays.slice(0, forecastDays);
    forecastContent = days.length ? (
      <div>
        <label htmlFor="forecastDays">Chọn số ngày dự báo: </label>
        <select
          id="forecastDays"
          value={forecastDays}
          onChange={(e) => setForecastDays(Number(e.target.value))}
        >
          {Array.from({ length: 7 }, (_, i) => i + 1).map(day => (
            <option key={day} value={day}>{day} ngày</option>
          ))}
        </select>
        <ul>
          {days.map(day => {
            const temps = dailyData[day];
            const min = Math.min(...temps);
            const max = Math.max(...temps);
            return (
              <li key={day}>
                {new Date(day).toLocaleDateString()} - {min}° / {max}°
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <p>Không có dữ liệu dự báo theo ngày.</p>
    );
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        className={`widget ${bgClass}`}
        ref={nodeRef}
        style={{ width: dimensions.width}}
      >
        <button className="remove-btn" onClick={() => onRemove(city.name)}>
          Delete
        </button>
        <div
          className="widget-header"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: 'pointer' }}
        >
          <h3>{city.name}</h3>
          <button
            className="displayDescription"
            onClick={() => setIsModalOpen(true)}
          >
            Thông tin chi tiết
          </button>
        </div>
        <div className="widget-body">
          <div className="current-weather">
            <p>Nhiệt độ: {currentWeather.main.temp}°</p>
            <p>Cảm thấy: {currentWeather.main.feels_like}°</p>
          </div>
          <div className="widget-controls">
            <button onClick={toggleForecastMode}>
              {forecastMode === 'hourly' ? 'Xem dự báo 5 ngày' : 'Xem dự báo theo giờ'}
            </button>
            <button onClick={fetchData}>Làm mới</button>
          </div>
          <div className="forecast">
            <h4>{forecastMode === 'hourly' ? 'Dự báo theo giờ' : `Dự báo ${forecastDays} ngày`}</h4>
            {forecastContent}
          </div>
        </div>
        <div className="resize-handle" onMouseDown={handleMouseDown} />
        <WeatherModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          weatherData={currentWeather}
        />
      </div>
    </Draggable>
  );
};

export default Widget;
