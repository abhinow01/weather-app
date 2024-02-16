import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CiSearch } from "react-icons/ci";
export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      router.push(`/search?city=${encodeURIComponent(city)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Weather App</h1>
      <div className="flex items-center">
        <input
          className="border border-gray-400 px-4 py-2 rounded-l w-full"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-m m-2 "
          onClick={handleSearch}
        >
          <CiSearch  className='w-8 h-6'/>
        </button>
      </div>
    </div>
  );
}
