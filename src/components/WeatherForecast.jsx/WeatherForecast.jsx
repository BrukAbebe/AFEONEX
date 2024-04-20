import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

function WeatherForecast({ forecastData, cityName }) {
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    if (forecastData.length > 0) {
      const groupedForecasts = forecastData.reduce((acc, forecast) => {
        const date = new Date(forecast.dt_txt.split(" ")[0]);
        const dateString = date.toDateString();
        if (!acc[dateString]) {
          acc[dateString] = [];
        }
        acc[dateString].push(forecast);
        return acc;
      }, {});

      const dailyForecastsArray = Object.entries(groupedForecasts).map(
        ([date, forecasts]) => ({
          date,
          hourlyForecast: forecasts,
        })
      );

      setDailyForecasts(dailyForecastsArray);
    }
  }, [forecastData]);

  return (
    <Tabs variant="enclosed" backgroundColor="gray.200" pb={10}>
      <TabList borderBottom="none">
        {dailyForecasts.map((day, index) => (
          <Tab
            key={index}
            _selected={{ color: "teal.500", bg: "white" }}
            _hover={{ color: "#FBBC04" }}
          >
            <Box as="span" flex="1" textAlign="left" fontWeight="bold">
              {day.date.replace(/\s/, ", ")}
            </Box>
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {dailyForecasts.map((day, index) => (
          <TabPanel key={index} backgroundColor={"white"}>
            <Accordion allowToggle>
              {day.hourlyForecast.map((hour, hourIndex) => (
                <AccordionItem key={hourIndex} m={2}>
                  <h2>
                    <AccordionButton
                      color="teal.500"
                      _hover={{ bg: "gray.100", color: "#FBBC04" }}
                      _expanded={{ bg: "teal.500", color: "white" }}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                      >
                        {new Date(hour.dt_txt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <CurrentWeather
                      forecast={true}
                      weatherData={hour}
                      cityName={cityName}
                    />
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default WeatherForecast;
