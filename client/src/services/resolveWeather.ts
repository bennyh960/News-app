import { convertTimeStampToDate } from ".";
import { ChartAxesValues } from "../components/ChartCss/Chart";
import { Weather, WeatherCalculatedObj } from "../types";

export const resolveDay = (dayNum: number) => {
  switch (dayNum) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wensday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      return "";
  }
};
export const resolveDayNumFromString = (dayName: string) => {
  switch (dayName) {
    case "Sunday":
      return 0;
    case "Monday":
      return 1;
    case "Tuesday":
      return 2;
    case "Wensday":
      return 3;
    case "Thursday":
      return 4;
    case "Friday":
      return 5;
    case "Saturday":
      return 6;

    default:
      return 6;
  }
};

export const getDataperDay = (data: Weather[], dayNum: number): WeatherCalculatedObj => {
  const dayObj: WeatherCalculatedObj = {
    dayName: resolveDay(dayNum),
    date: "",
    timeStamp: [],
    temp: [],
    humidity: [],
    pressure: [],
    feelsLike: [],
    grndLevel: [],
    seaLevel: [],
    tempMax: [],
    tempMin: [],
    tempKf: [],
    weatherDescription: [],
    weatherIcon: [],
    windSpeed: [],
    windGust: [],
    windDeg: [],
    getAverage(key) {
      const arr = this[key];
      const sum = arr.reduce<number>((a: number, b: number) => a + b, 0);
      const average = sum / arr.length;
      return Math.round(100 * average) / 100;
    },
    getMaxOccure(key) {
      const arr = this[key];

      let res = 0;
      let count = 1;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[res] && arr[i]) {
          count++;
        } else {
          count--;
        }

        if (count === 0) {
          res = i;
          count = 1;
        }
      }

      return arr[res];
    },
    mergeArray() {
      const timeArray = this.timeStamp;

      const arrOfObjects: ChartAxesValues[] = [];
      // if (timeArray.length !== keyArray.length) throw new Error("merge 2 array in weather app is not ok");

      for (let index = 0; index < timeArray.length; index++) {
        arrOfObjects.push({
          time: timeArray[index],
          temperature: this.temp[index],
          humidity: this.humidity[index],
          pressure: this.pressure[index],
        });
      }

      return arrOfObjects;
    },
  };

  for (const time of data) {
    const day: number = new Date(time.dt * 1000).getDay();

    if (day !== dayNum) continue;

    // if (dayObj.timeStamp.length > 5) continue;
    dayObj.date = new Date(time.dt * 1000).toDateString();
    dayObj.timeStamp.push(convertTimeStampToDate(time.dt) || "");
    dayObj.temp.push(time.main.temp);
    dayObj.feelsLike.push(time.main.feels_like);
    dayObj.humidity.push(time.main.humidity);
    dayObj.pressure.push(time.main.pressure);
    dayObj.seaLevel.push(time.main.sea_level);
    dayObj.grndLevel.push(time.main.grnd_level);
    dayObj.tempMax.push(time.main.temp_max);
    dayObj.tempMin.push(time.main.temp_min);
    dayObj.tempKf.push(time.main.temp_kf);
    dayObj.weatherDescription.push(time.weather[0].description);
    dayObj.weatherIcon.push(time.weather[0].icon);
    dayObj.windSpeed.push(time.wind.speed);
    dayObj.windGust.push(time.wind.gust);
    dayObj.windDeg.push(time.wind.deg);
  }
  return dayObj;
};
