import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Details = () => {
  const router = useRouter();
  const { city } = router.query; // Access city from query parameters
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('celcius');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b8bfcd9263004c3ea6a6b076aee0ad9`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4b8bfcd9263004c3ea6a6b076aee0ad9`);
        const forecastData = response.data.list.slice(0, 5); // Extract forecast data for the next 5 days
        setForecastData(forecastData);
        console.log('Forecast Data:', forecastData);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
      fetchForecastData();
    }
  }, [city]);

  const toggleTemperature = () => {
    setTemperatureUnit(prevUnit => (prevUnit === 'celcius' ? 'fahrenheit' : 'celcius'));
  };

  const convertTemperature = (temp) => {
    if (temperatureUnit === 'celcius') {
      return temp - 273.15;
    } else {
      return (temp - 273.15) * 1.8 + 32;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Details page</h1>
      {weatherData && weatherData.weather && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Current Weather</h2>
          <p>Temperature: {convertTemperature(weatherData.main.temp).toFixed(2)}°{temperatureUnit}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleTemperature}>Toggle Temperature Unit ({temperatureUnit})</button>

      {/* Forecast section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Forecast</h2>
        {forecastData && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecastData.map((forecast, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-md">
                <p className="text-xl font-bold">Day {index + 1}</p>
                <p className="text-gray-600">Temperature: {convertTemperature(forecast.main.temp).toFixed(2)}°{temperatureUnit}</p>
                {/* Add other forecast data */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
