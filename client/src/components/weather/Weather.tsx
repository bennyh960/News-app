import React, { useEffect, useState } from "react";
import weaterApi from "../../apis/weather";
import Select from "react-select";

import "./weather.css";
import { getWeatherDataPerDay } from "../../services";
import { Forecast, City, WeatherCalculatedObj, Weather } from "../../types";
import citiesApi from "../../apis/countries.js";
import Chart, { chartLabelUnits } from "../ChartCss/Chart";
import { resolveDay, resolveDayNumFromString } from "../../services/resolveWeather";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [generalData, setGeneralData] = useState<City | undefined>();
  const [listData, setListData] = useState<Weather[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherCalculatedObj | undefined>();
  const [dayAtWeek, setdayAtWeek] = useState<number>(new Date().getDay());
  const [isLoading, setIsLoading] = useState(false);
  const [chartType, setChartType] = useState<"temperature" | "pressure" | "humidity">("temperature");

  useEffect(() => {
    getWeaterData();
    renderDaysButtons();
  }, [city]);

  useEffect(() => {
    if (weatherData?.temp[0]) setWeatherData(() => getWeatherDataPerDay(listData, dayAtWeek));
    // console.log("methode2", weatherData);
  }, [dayAtWeek]);

  const getWeaterData = async () => {
    if (!city) return;
    setIsLoading(() => true);
    try {
      const { data }: { data: Forecast } = await weaterApi.get("", {
        params: {
          q: city.toLowerCase(),
        },
      });
      setGeneralData(() => data.city);
      setListData(() => data.list);
      setWeatherData(() => getWeatherDataPerDay(data.list, dayAtWeek));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(() => false);
  };

  const handleSearch = (option: { value: string; label: string }) => {
    setCity(() => option.value);
  };
  const handleChangeChartType = (option: { value: "temperature" | "pressure" | "humidity"; label: string }) => {
    setChartType(() => option.value);
  };

  const renderDaysButtons = () => {
    const currentDay = new Date().getDay();
    const nextFiveDays = [];
    let counter = 0;
    const daysObj = {};
    while (counter < 5) {
      const dayData = getWeatherDataPerDay(listData, currentDay + counter);

      // @ts-ignore
      daysObj[resolveDay((currentDay + counter) % 7)] = dayData.getMaxOccure("weatherDescription");
      nextFiveDays.push(resolveDay((currentDay + counter) % 7));
      counter++;
    }
    console.log(daysObj);

    return nextFiveDays.map((day) => {
      return (
        <div
          key={day}
          className={resolveDay(dayAtWeek).toLowerCase() === day.toLowerCase() ? `active_day` : ``}
          onClick={() => setdayAtWeek(() => resolveDayNumFromString(day))}
        >
          <div>{day}</div>
          <div style={{ color: "black" }}>
            {/* @ts-ignore */}
            {daysObj[day]}
          </div>
        </div>
      );
    });
  };

  return (
    <section id="weather" className={`container ${weatherData?.getMaxOccure("weatherDescription").replace(" ", "")}`}>
      <div className="search_city fill-bg">
        <h3>{weatherData?.date?.split(" ").slice(0, 3).join(" ")}</h3>
        <div className="select_container">
          <Select
            isLoading={isLoading}
            isDisabled={isLoading}
            options={citiesApi}
            placeholder={"Search City ..."}
            // @ts-ignore
            onChange={handleSearch}
          />
        </div>
        <h3>{generalData && `City:${city[0].toUpperCase() + city.slice(1)}`}</h3>
        <h3 className="hide_on_low_width">{generalData && `Population:${generalData.population}`}</h3>
      </div>
      {weatherData && (
        <>
          <div className="other-days-btn">{renderDaysButtons()}</div>
          <div className="weather-data-container">
            <span className="btn_change_chart">
              Temperature :{weatherData?.getAverage("temp")} {chartLabelUnits.temperature}
            </span>
            <span>
              Feels like :{weatherData?.getAverage("feelsLike")} {chartLabelUnits.temperature}
            </span>

            {/* <span>Sunrise : {convertTimeStampToDate(generalData?.sunrise)}</span> */}
            {/* <span>Sunset : {convertTimeStampToDate(generalData?.sunset)}</span> */}

            <span>
              Max Temp: {weatherData?.getAverage("tempMax")} {chartLabelUnits.temperature}
            </span>
            <span>
              Min Temp: {weatherData?.getAverage("tempMin")} {chartLabelUnits.temperature}
            </span>
            <span className="btn_change_chart">
              Humidity :{weatherData?.getAverage("humidity")}
              {chartLabelUnits.humidity}
            </span>
            <span className="btn_change_chart">
              Pressure :{weatherData?.getAverage("pressure")}
              {chartLabelUnits.pressure}
            </span>
            <span>Wind Speed: {weatherData?.getAverage("windSpeed")} km/h</span>
            <span>Wind Gust: {weatherData?.getAverage("windGust")} km/h</span>
            <span>Ground Level : {weatherData?.getAverage("grndLevel")} mm</span>
            <span>Sea Level: {weatherData?.getAverage("seaLevel")} mm</span>
          </div>
          <div className="fill-bg space-between">
            <h3>
              {chartType[0].toLocaleUpperCase() + chartType.split("").slice(1).join("")}[{chartLabelUnits[chartType]}]
            </h3>
            <Select
              options={[
                { value: "temperature", label: "Temperature" },
                { value: "humidity", label: "Humidity" },
                { value: "pressure", label: "Pressure" },
              ]}
              placeholder={"Select Chart Values..."}
              // @ts-ignore
              onChange={handleChangeChartType}
            />
          </div>
          {weatherData && <Chart data={weatherData?.mergeArray()} type={chartType} />}
        </>
      )}
    </section>
  );
};

export default WeatherApp;
