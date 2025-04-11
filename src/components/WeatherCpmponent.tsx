// src/components/WeatherComponent.tsx
import React from 'react';

interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherComponentProps {
  data: WeatherResponse;
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ data }) => {
  // Chuyển đổi các timestamp sang định dạng dễ đọc
  const date = new Date(data.dt * 1000);
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);

  return (
    <div>
      <h1>Thời tiết tại {data.name}</h1>
      <p>
        Tọa độ: {data.coord.lat}, {data.coord.lon}
      </p>
      <p>Thời gian cập nhật: {date.toLocaleString()}</p>
      
      <h2>{data.weather[0].main} ({data.weather[0].description})</h2>
      <img 
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
        alt={data.weather[0].description} 
      />

      <div>
        <p>Nhiệt độ: {data.main.temp} °C (Cảm nhận: {data.main.feels_like} °C)</p>
        <p>Nhiệt độ tối thiểu: {data.main.temp_min} °C - Tối đa: {data.main.temp_max} °C</p>
        <p>Áp suất: {data.main.pressure} hPa</p>
        <p>Độ ẩm: {data.main.humidity}%</p>
      </div>

      <div>
        <p>Tầm nhìn: {data.visibility} m</p>
        <p>Tốc độ gió: {data.wind.speed} m/s, Hướng gió: {data.wind.deg}°</p>
        <p>Mây che: {data.clouds.all}%</p>
      </div>

      <div>
        <p>Mặt trời mọc: {sunrise.toLocaleTimeString()}</p>
        <p>Mặt trời lặn: {sunset.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default WeatherComponent;
