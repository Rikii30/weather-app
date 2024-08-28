import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric'
        }
      });
      
      // Fetch 5-day forecast data
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric'
        }
      });

      setWeather(weatherResponse.data);

      // Process forecast data
      const forecastData = forecastResponse.data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
      setForecast(forecastData);
      
    } catch (error) {
      alert('Error fetching the weather data');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div>
          <h2>Current Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div>
          <h2>5-Day Forecast</h2>
          {forecast.map((day, index) => (
            <div key={index}>
              <h3>{new Date(day.dt_txt).toLocaleDateString()}</h3>
              <p>Temperature: {day.main.temp}°C</p>
              <p>Description: {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowInfo(!showInfo)}>Info</button>

      {showInfo && (
        <div>
          <p>Created by Rikshitha Ravikumar</p>
          <p>
            PM Accelerator is a leading platform for product management professionals, offering tools, resources, and community support to help product managers advance their careers.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
