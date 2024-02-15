import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const { city } = router.query;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b8bfcd9263004c3ea6a6b076aee0ad9`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleDetails = () => {
    if (city && city.trim() !== '') {
      router.push(`/details?city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-300">
      {weatherData && weatherData.weather && (
        <img
          className="w-full"
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="Weather Icon"
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Weather Data</div>
        {weatherData && (
          <div>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Search;