import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="text-gray-600">{data.weather[0].description}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          className="w-20 h-20"
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Humidity</p>
          <p className="font-bold">{data.main.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-600">Wind Speed</p>
          <p className="font-bold">{data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
