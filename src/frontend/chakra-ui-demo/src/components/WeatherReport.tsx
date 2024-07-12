import React, { useState, useEffect } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import { fetchWeatherForecast } from "../api/weatherApi";

const WeatherReport = () => {
  const [location, setLocation] = useState("New York");
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherForecast(location);
      setForecast(data);
    };

    getWeather();
  }, [location]);

  return (
    <Box>
      <Select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        mb={4}
      >
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        <option value="Houston">Houston</option>
        <option value="Phoenix">Phoenix</option>
      </Select>
      {forecast ? (
        <Box>
          <Text>Today's Weather: {forecast.today}</Text>
          <Text>Next 7 Days:</Text>
          {forecast.next7Days.map((day, index) => (
            <Text key={index}>{day}</Text>
          ))}
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default WeatherReport;
