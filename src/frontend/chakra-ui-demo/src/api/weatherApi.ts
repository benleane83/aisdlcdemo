import axios from "axios";

const API_KEY = "d61ea7f6cc685d2945063add6a5743bb";
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeatherForecast = async (location: string) => {
  // Fetch current weather
  const currentWeatherResponse = await axios.get(CURRENT_WEATHER_URL, {
    params: {
      q: location,
      appid: API_KEY,
      units: "metric",
    },
  });

  // Fetch 5-day forecast
  const forecastResponse = await axios.get(FORECAST_URL, {
    params: {
      q: location,
      appid: API_KEY,
      units: "metric",
    },
  });

  const currentWeatherData = currentWeatherResponse.data;
  const forecastData = forecastResponse.data;

  const forecast = {
    today: currentWeatherData.weather[0].description,
    next5Days: forecastData.list.filter((_: any, index: number) => index % 8 === 0).map((day: { dt_txt: any; weather: { description: any; }[]; }) => ({
      date: day.dt_txt,
      description: day.weather[0].description,
    })),
  };

  return forecast;
};