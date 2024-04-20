import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeatherData = async (lat, lon) => {
  try {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

const fetchForecastData = async (lat, lon) => {
  try {
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=41&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch forecast data");
  }
};

const fetchGeocodingData = async (location) => {
  try {
    let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Location not found");
  }
};
const fetchZipData = async (zip) => {
  try {
    let apiUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};
export {
  fetchWeatherData,
  fetchForecastData,
  fetchGeocodingData,
  fetchZipData,
};
