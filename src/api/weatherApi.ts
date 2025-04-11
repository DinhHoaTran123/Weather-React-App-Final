// src/api/weatherApi.ts
import axios from 'axios';

const API_KEY = '6f5146b1cd2be5ee3f6f1d7f3ffda826';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  weather: { description: string }[];
  main: { temp: number };
  name: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: { temp: number };
    weather: { description: string }[];
  }>;
}

// Lấy dữ liệu thời tiết theo tọa độ
export const fetchCurrentWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};
