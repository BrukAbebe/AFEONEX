import React, { useState, useEffect, useMemo } from "react";
import { Button, Container, Spinner, Flex, Box } from "@chakra-ui/react";
import Header from "../../components/Header/Header";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import { useLocation } from "react-router-dom";
import { fetchWeatherData, fetchForecastData } from "../../utils/WeatherApi/WeatherApi";
import { getBackgroundColor } from "../../utils/WeatherBackground/WeatherBackground";
import WeatherForecast from "../../components/WeatherForecast.jsx/WeatherForecast";
import Footer from "../../components/Footer/Footer";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const [cityName, setCityName] = useState(null);
  const location = useLocation();
  const data = location.state;

  const backgroundColor = useMemo(() => {
    if (weatherData?.weather?.[0]?.main) {
      return getBackgroundColor(weatherData.weather[0].main);
    }
    return "#FFFFFF";
  }, [weatherData]);

  useEffect(() => {
    if (selectedLocation || data) {
      const locationToFetch = selectedLocation || data;
      setCityName(locationToFetch.name);
      setIsLoading(true);

      Promise.all([
        fetchWeatherData(locationToFetch.lat, locationToFetch.lon),
        fetchForecastData(locationToFetch.lat, locationToFetch.lon),
      ])
        .then(([weather, forecast]) => {
          setWeatherData(weather);
          setForecastData(forecast.list);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedLocation, data]);

  if (isLoading) {
    return (
      <Flex
        minHeight="100vh" 
        alignItems="center" 
        justifyContent="center" 
        style={{ backgroundColor }} 
      >
        <Spinner size="xl" /> 
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      minHeight="100vh" 
      style={{ backgroundColor, margin: 0 }} 
    >
      <Header onSelect={setSelectedLocation} />
      <Container maxW={"container.lg"} flex="1" mb={4}> 
        {weatherData && forecastData && (
          <>
            <CurrentWeather
              forecast={false}
              weatherData={weatherData}
              cityName={cityName}
            />
            <Button
              onClick={() => setShowForecast(!showForecast)}
              colorScheme="teal"
              variant="solid"
              size="md"
              mt={4}
              _hover={{ color: "#FBBC04" }}
            >
              {showForecast ? "Hide Forecast" : "Show Forecast"}
            </Button>
            {showForecast && (
              <WeatherForecast forecastData={forecastData} cityName={cityName} />
            )}
          </>
        )}
      </Container>
      <Footer />
    </Flex>
  );
}

export default Weather;