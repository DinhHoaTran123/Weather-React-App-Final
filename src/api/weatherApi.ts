// src/api/weatherApi.ts
import axios from 'axios';

// Lấy API key từ biến môi trường
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  weather: { id: number; main: string; description: string }[];
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: { temp: number; temp_min: number; temp_max: number };
    weather: { id: number; main: string; description: string }[];
    clouds: { all: number };
    wind: { speed: number; deg: number };
  }>;
  city: { id: number; name: string; coord: { lat: number; lon: number }; country: string; timezone: number; sunrise: number; sunset: number };
}

export const fetchCurrentWeatherByCoords = async (lat: number, lon: number, units: string = 'metric'): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units
    }
  });
  return response.data;
};

export const fetchForecastByCoords = async (lat: number, lon: number, units: string = 'metric'): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units
    }
  });
  return response.data;
};
