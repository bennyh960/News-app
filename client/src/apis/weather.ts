import axios from "axios";

// const url = "https://api.openweathermap.org/data/2.5/weather";
const url = "https://api.openweathermap.org/data/2.5/forecast";

const router = axios.create({
  baseURL: url,
  params: {
    appid: process.env.REACT_APP_WEATHER_API_KEY,
    units: "metric",
  },
});

export default router;
