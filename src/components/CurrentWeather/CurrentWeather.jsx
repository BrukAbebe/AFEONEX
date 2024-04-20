import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

function CurrentWeather({ forecast, weatherData, cityName }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temp) => {
    if (isCelsius) {
      return temp;
    } else {
      return (temp * 9) / 5 + 32;
    }
  };

  let localTimeString = "";
  const WeatherData = weatherData;
  const CityName = cityName;

  if (!forecast) {
    const utcTimestamp = WeatherData.dt * 1000;
    const timezoneOffsetSeconds = WeatherData.timezone;
    const utcDate = new Date(utcTimestamp);

    const timezoneOffsetMilliseconds = timezoneOffsetSeconds * 1000;
    const localTimestamp = utcTimestamp + timezoneOffsetMilliseconds;
    const localDate = new Date(localTimestamp);

    localTimeString = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    }).format(localDate);
  }

  return (
    <motion.div
      initial={{ y: -100, x: -100, opacity: 0 }}
      animate={{ y: 0, x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box mt={10} backgroundColor={"whiteAlpha.700"}>
        <Card
          borderLeftColor={!forecast ? { base: "none", md: "red" } : "none"}
          borderLeftWidth={!forecast ? { base: "none", md: "2px" } : "0px"}
          borderRadius="lg"
        >
          {!forecast && (
            <CardHeader>
              <Heading textAlign={"center"} size={!forecast ? "lg" : "xs"}>
                {CityName}
              </Heading>
            </CardHeader>
          )}

          <CardBody>
            {!forecast && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderBottomWidth={"1px"}
                borderColor="#FBBC04"
                pb={2}
                mb={5}
              >
                <Box>Current Weather</Box>
                <Box>{localTimeString}</Box>
              </Box>
            )}

            <Box
              display={{ base: "block", md: "flex" }}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={4}
            >
              <Box
                display="flex"
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems="center"
              >
                <Box ml={5} textAlign="center">
                  <Heading size="lg" color="blue.500" fontWeight="bold">
                    {WeatherData.weather[0].main}
                  </Heading>

                  <span style={{ color: "gray.600" }}>
                    {WeatherData.weather[0].description}.
                  </span>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box p={4}>
                    <img
                      src={`https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                    />
                  </Box>
                  <Box>
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Text
                        as={"span"}
                        fontSize="4xl"
                        fontWeight="bold"
                        color="orange.500"
                      >
                        {convertTemperature(WeatherData.main.temp).toFixed(1)}
                      </Text>

                      <Text
                        as={"span"}
                        style={{
                          paddingTop: "16px",
                          fontWeight: "lighter",
                          fontSize: "large",
                          color: "green.500",
                        }}
                      >
                        {isCelsius ? "°C" : "°F"}
                      </Text>
                    </Text>
                  </Box>
                </Box>
                <Box textAlign="center" mt={2}>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={toggleTemperatureUnit}
                    _hover={{ color: "#FBBC04" }}
                  >
                    {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
                  </Button>
                </Box>
              </Box>

              <Box mt={2} gap={4} w={{ base: "100%", md: "50%" }}>
                <Box>
                  <Stack
                    divider={<StackDivider borderColor="#FBBC04" />}
                    spacing="2"
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>Wind Speed </Text>
                      <Text>
                        {(WeatherData.wind.speed * 3.6).toFixed(2)} km/hr
                      </Text>
                    </Box>
                    {WeatherData.wind.gust && (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Text>Wind Gusts</Text>
                        <Text>
                          {(WeatherData.wind.gust * 3.6).toFixed(2)} km/hr
                        </Text>
                      </Box>
                    )}
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>Humidity</Text>
                      <Text>{WeatherData.main.humidity} %</Text>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text> Pressure</Text>
                      <Text>{WeatherData.main.pressure} hPa</Text>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      mr={2}
                    >
                      <Text>Cloud cover</Text>
                      <Text>{WeatherData.clouds.all} %</Text>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>Visibility</Text>
                      <Text>{WeatherData.visibility / 1000}.0km</Text>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </Box>
    </motion.div>
  );
}

export default CurrentWeather;
