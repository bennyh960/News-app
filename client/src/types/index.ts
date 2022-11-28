interface City {
  id: string;
  name: string;
  coord: {
    lat: number;
    long: number;
  };
  country: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

interface Weather {
  dt: number;
  dt_text: string;
  pop: number;
  visibility: number;
  sys: any;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  clouds: any;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
}

export interface Forecast {
  city: City;
  cnt: number;
  cod: string;
  message?: number;
  list: Weather[];
}
