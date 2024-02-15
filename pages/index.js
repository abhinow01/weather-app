import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      router.push(`/search?city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
