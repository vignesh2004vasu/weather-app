import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "94be292d2cedb7a25c3a20fccbfca437";
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          setWeather(response.data);
        } catch (err) {
          setError("Error fetching weather data");
        }
      });
    }
  };

  const searchLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Location not found");
    }
    setLoading(false);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={searchLocation} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            Search
          </button>
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Use My Location
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default Home;

