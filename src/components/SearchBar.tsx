// src/components/SearchBar.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

export interface CitySuggestion {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface SearchBarProps {
  onCitySelect: (city: CitySuggestion) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      axios.get<CitySuggestion[]>('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: query,
          limit: 5,
          appid: '6f5146b1cd2be5ee3f6f1d7f3ffda826'
        }
      })
      .then(response => setSuggestions(response.data))
      .catch(error => {
        console.error('Error fetching city suggestions:', error);
        setSuggestions([]);
      })
      .finally(() => setIsLoading(false));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (city: CitySuggestion) => {
    setQuery('');
    setSuggestions([]);
    onCitySelect(city);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      onCitySelect(suggestions[0]);
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tên thành phố..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Tìm</button>
      </form>
      {isLoading && <div className="loading">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)}>
              {city.name}{city.state ? `, ${city.state}` : ''} {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
