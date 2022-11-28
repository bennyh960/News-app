import React, { useEffect, useState } from "react";
import weaterApi from "../../apis/weather";
import Select from "react-select";

import "./weather.css";
import { convertTimeStampToDate, numbersToDay } from "../../services";
import { Forecast } from "../../types";
import citiesApi from "../../apis/countries.js";
import Chart, { ChartAxesValues, chartLabelUnits } from "../ChartCss/Chart";

const Weather = () => {
  const [forecast, setForecast] = useState<Forecast | undefined>();
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartValue, setChartValue] = useState<ChartAxesValues[] | []>([]);
  const [chartType, setChartType] = useState<"temperature" | "pressure" | "humidity">("temperature");

  useEffect(() => {
    getWeaterData();
  }, [city]);

  useEffect(() => {
    const values: { time: string; temperature: number }[] =
      forecast?.list.slice(0, 8).map((val) => {
        return {
          time: convertTimeStampToDate(val.dt) || "",
          temperature: val.main.temp,
          humidity: val.main.humidity,
          pressure: val.main.pressure,
        };
      }) || [];
    setChartValue(() => values);

    console.log(forecast?.list[0].dt_text);
  }, [forecast]);

  const getWeaterData = async () => {
    setIsLoading(() => true);
    try {
      const { data }: { data: Forecast } = await weaterApi.get("", {
        params: {
          q: city.toLowerCase(),
        },
      });
      setForecast(() => data);
      console.log(data);
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
          {forecast?.city.name}, {forecast?.city.country}
        </h2>
        Population:{forecast?.city.population}
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
          <button onClick={() => setChartType(() => "temperature")}>Temperature</button>
          <button onClick={() => setChartType(() => "humidity")}>Humidity</button>
          <button onClick={() => setChartType(() => "pressure")}>Pressure</button>
        </div>
      </div>
      <h3>
        {chartType[0].toLocaleUpperCase() + chartType.split("").slice(1).join("")}[{chartLabelUnits[chartType]}]
      </h3>
      <Chart data={chartValue} type={chartType} />
    </section>
  );
};

export default Weather;
