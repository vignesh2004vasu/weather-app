import React, { useState, useEffect } from "react";
import axios from "axios";

const Forecast = () => {
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState("");
  const API_KEY = "94be292d2cedb7a25c3a20fccbfca437";

  const getForecast = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
      );
      setForecast(response.data);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={getForecast} className="mb-8">
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
          >
            Get Forecast
          </button>
        </div>
      </form>

      {forecast && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.list
            .filter((item, idx) => idx % 8 === 0)
            .map((item) => (
              <div key={item.dt} className="bg-white rounded-lg shadow p-4">
                <p className="font-bold">
                  {new Date(item.dt * 1000).toLocaleDateString()}
                </p>
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
                <p className="text-xl">{Math.round(item.main.temp)}°C</p>
                <p className="text-gray-600">{item.weather[0].description}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
