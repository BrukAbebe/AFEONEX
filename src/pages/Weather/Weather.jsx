import { Button, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";

import { useLocation } from "react-router-dom";
import {
  fetchWeatherData,
  fetchForecastData,
} from "../../utils/WeatherApi/WeatherApi";
import { getBackgroundColor } from "../../utils/WeatherBackground/WeatherBackground";
import WeatherForecast from "../../components/WeatherForecast.jsx/WeatherForecast";
import Footer from "../../components/Footer/Footer";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [isLoading, setIsLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [cityName, setCityName] = useState(null);

  const location = useLocation();

  const data = location.state;

  useEffect(() => {
    if (selectedLocation || data) {
      const locationToFetch = selectedLocation || data;

      setCityName(locationToFetch.name);
      setWeatherData(null);
      setForecastData(null);
      setIsLoading(true);

      fetchWeatherData(locationToFetch.lat, locationToFetch.lon)
        .then((data) => {
          setWeatherData(data);
          if (data.weather && data.weather.length > 0) {
            const weatherCondition = data.weather[0].main;
            setBackgroundColor(getBackgroundColor(weatherCondition));
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setIsLoading(false);
        });

      fetchForecastData(locationToFetch.lat, locationToFetch.lon)
        .then((data) => {
          setForecastData(data.list);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
          setIsLoading(false);
        });
    }
  }, [selectedLocation, data]);

  const handleLocationSelect = (searchedLocation) => {
    if (searchedLocation && Object.keys(searchedLocation).length !== 0) {
      setSelectedLocation(searchedLocation);
    } else {
      console.log("Searched location is empty");
    }
  };

  const handleToggleForecast = () => {
    setShowForecast(!showForecast);
  };

  return (
    <div>
      <div style={{ backgroundColor, margin: 0, minHeight: "100vh" }}>
        <Header onSelect={handleLocationSelect} />
        <Container maxW={"container.lg"}>
          {!isLoading &&
            weatherData &&
            forecastData &&
            (selectedLocation || data) && (
              <div>
                <CurrentWeather
                  forecast={false}
                  weatherData={weatherData}
                  cityName={cityName}
                />
                <Button
                  onClick={handleToggleForecast}
                  colorScheme="teal"
                  variant="solid"
                  size="md"
                  mt={4}
                  _hover={{
                    color: "#FBBC04",
                  }}
                >
                  {showForecast ? "Hide Forecast" : "Show Forecast"}
                </Button>
                {showForecast && (
                  <WeatherForecast
                    forecastData={forecastData}
                    cityName={cityName}
                  />
                )}
              </div>
            )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Weather;
