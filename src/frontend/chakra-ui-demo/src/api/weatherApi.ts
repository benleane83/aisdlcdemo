import axios from "axios";

const API_KEY = "d61ea7f6cc685d2945063add6a5743bb";
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall";

export const fetchWeatherForecast = async (location: any) => {
  const response = await axios.get(BASE_URL, {
    params: {
      q: location,
      appid: API_KEY,
      units: "metric",
    },
  });

  const data = response.data;
  const forecast = {
    today: data.current.weather[0].description,
    next7Days: data.daily.slice(1, 8).map((day: { weather: { description: any; }[]; }) => day.weather[0].description),
  };

  return forecast;
};
