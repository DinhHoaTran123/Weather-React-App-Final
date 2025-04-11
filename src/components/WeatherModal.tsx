// src/components/WeatherModal.tsx
import React from 'react';
import { WeatherData } from '../api/weatherApi';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  weatherData: WeatherData;
}

const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onClose, weatherData }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{weatherData.name} - Chi tiết thời tiết</h2>
        <p><strong>Nhiệt độ:</strong> {weatherData.main.temp}°</p>
        <p><strong>Cảm thấy:</strong> {weatherData.main.feels_like}°</p>
        <p><strong>Tối thiểu:</strong> {weatherData.main.temp_min}°</p>
        <p><strong>Tối đa:</strong> {weatherData.main.temp_max}°</p>
        <p><strong>Độ ẩm:</strong> {weatherData.main.humidity}%</p>
        <p><strong>Áp suất:</strong> {weatherData.main.pressure} hPa</p>
        <p><strong>Tốc độ gió:</strong> {weatherData.wind.speed} m/s</p>
        <p><strong>Hướng gió:</strong> {weatherData.wind.deg}°</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default WeatherModal;
