import React, { useEffect, useState } from "react";
import weaterApi from "../../apis/weather";
import Select from "react-select";

import "./weather.css";
import { convertTimeStampToDate, getWeatherDataPerDay } from "../../services";
import { Forecast } from "../../types";
import citiesApi from "../../apis/countries.js";
import Chart, { ChartAxesValues, chartLabelUnits } from "../ChartCss/Chart";

interface AveragesState {
  avgTemp: number;
  avgHummidity: number;
  avgPressure: number;
  avgFeels_like: number;
  avgGrnd_level: number;
  avgSea_level: number;
  avgTemp_max: number;
  avgTemp_min: number;
  avgTemp_kf: number;
}

const Weather = () => {
  const [forecast, setForecast] = useState<Forecast | undefined>();
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartValue, setChartValue] = useState<ChartAxesValues[] | []>([]);
  const [chartType, setChartType] = useState<"temperature" | "pressure" | "humidity">("temperature");
  const [avereges, setAverages] = useState<AveragesState>({
    avgTemp: 0,
    avgHummidity: 0,
    avgPressure: 0,
    avgFeels_like: 0,
    avgGrnd_level: 0,
    avgSea_level: 0,
    avgTemp_max: 0,
    avgTemp_min: 0,
    avgTemp_kf: 0,
  });

  useEffect(() => {
    getWeaterData();
  }, [city]);

  useEffect(() => {
    let avgTemp = 0;
    let avgHummidity = 0;
    let avgPressure = 0;
    let avgFeels_like = 0;
    let avgGrnd_level = 0;
    let avgSea_level = 0;
    let avgTemp_max = 0;
    let avgTemp_min = 0;
    let avgTemp_kf = 0;

    const values: { time: string; temperature: number }[] =
      forecast?.list.slice(0, 8).map((val) => {
        avgTemp += val.main.temp;
        avgHummidity += val.main.humidity;
        avgPressure += val.main.pressure;
        avgFeels_like += val.main.feels_like;
        avgGrnd_level += val.main.grnd_level;
        avgSea_level += val.main.sea_level;
        avgTemp_max += val.main.temp_max;
        avgTemp_min += val.main.temp_min;
        avgTemp_kf += val.main.temp_kf;
        // console.log(new Date(val.dt * 1000).getDay());

        return {
          time: convertTimeStampToDate(val.dt) || "",
          temperature: val.main.temp,
          humidity: val.main.humidity,
          pressure: val.main.pressure,
        };
      }) || [];
    setChartValue(() => values);

    avgTemp = Math.round((100 * avgTemp) / 8) / 100;
    avgHummidity = Math.round((100 * avgHummidity) / 8) / 100;
    avgPressure = Math.round((100 * avgPressure) / 8) / 100;
    avgFeels_like = Math.round((100 * avgFeels_like) / 8) / 100;
    avgGrnd_level = Math.round((100 * avgGrnd_level) / 8) / 100;
    avgSea_level = Math.round((100 * avgSea_level) / 8) / 100;
    avgTemp_max = Math.round((100 * avgTemp_max) / 8) / 100;
    avgTemp_min = Math.round((100 * avgTemp_min) / 8) / 100;
    avgTemp_kf = Math.round((100 * avgTemp_kf) / 8) / 100;
    setAverages((prev: AveragesState) => {
      return {
        ...prev,
        avgTemp,
        avgHummidity,
        avgPressure,
        avgFeels_like,
        avgGrnd_level,
        avgTemp_max,
        avgTemp_min,
        avgTemp_kf,
      };
    });

    // console.log(forecast?.list[0].dt_text);
  }, [forecast]);

  const getWeaterData = async () => {
    if (!city) return;
    setIsLoading(() => true);
    try {
      const { data }: { data: Forecast } = await weaterApi.get("", {
        params: {
          q: city.toLowerCase(),
        },
      });
      setForecast(() => data);
      const test = getWeatherDataPerDay(data.list, 3);
      console.log(test);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(() => false);
  };

  const handleSearch = (option: { value: string; label: string }) => {
    setCity(() => option.value);
  };

  return (
    <section id="weather" className="container">
      <div className="search_city">
        <h2>
          {forecast?.city.name}
          {/* , {forecast?.city.country} */}
        </h2>
        {forecast && `Population: ${forecast?.city.population}`}
        <div style={{ width: "150px" }}>
          <Select
            isLoading={isLoading}
            isDisabled={isLoading}
            options={citiesApi}
            // @ts-ignore
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="weather-data-container">
        <div className="other-days-btn">
          <div>day2</div>
          <div>day3</div>
          <div>day4</div>
          <div>day5</div>
        </div>
        <div
          className="weather-center-data"
          style={{
            background:
              "url(https://w0.peakpx.com/wallpaper/450/272/HD-wallpaper-%E2%9C%B0bright-and-beauty%E2%9C%B0-rocks-pretty-lotus-premade-bg-beautiful-clouds-atmosphere-leaves-splendor-grasses-stock-love-bright-exterior-flowers-fields-resources-animals-lovely-colors.jpg) no-repeat center center / cover",
          }}
        >
          <span>Sunrise : {convertTimeStampToDate(forecast?.city.sunrise)}</span>
          <span>Sunset : {convertTimeStampToDate(forecast?.city.sunset)}</span>
        </div>
        <div className="main-description-weather">
          <button onClick={() => setChartType(() => "temperature")}>
            Temperature : {avereges.avgTemp}
            {chartLabelUnits.temperature}
          </button>
          <button onClick={() => setChartType(() => "humidity")}>
            Humidity : {avereges.avgHummidity}
            {chartLabelUnits.humidity}
          </button>
          <button onClick={() => setChartType(() => "pressure")}>
            Pressure : {avereges.avgPressure}
            {chartLabelUnits.pressure}
          </button>
          <div>
            Feels like :{avereges.avgFeels_like}
            {chartLabelUnits.temperature}
          </div>
          <div>Ground Level :{avereges.avgGrnd_level}mm</div>
          <div>Sea Level:{avereges.avgSea_level}mm</div>
        </div>
      </div>
      <h3>
        {chartType[0].toLocaleUpperCase() + chartType.split("").slice(1).join("")}[{chartLabelUnits[chartType]}]
      </h3>
      {forecast && <Chart data={chartValue} type={chartType} />}
    </section>
  );
};

export default Weather;
