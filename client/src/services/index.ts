import { getDataperDay } from "./resolveWeather";

export const convertTimeStampToDate = (timestamp: number | undefined): string | null => {
  if (!timestamp) return null;
  const houers = new Date(timestamp * 1000).getHours();
  const minutes = new Date(timestamp * 1000).getMinutes();
  return `${houers}:${minutes}`;
};

export const getWeatherDataPerDay = getDataperDay;
