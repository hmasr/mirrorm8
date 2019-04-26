export interface WeatherState {
  dayForecast?: OpenWeatherMapDayForecast;
  weeklyForecast?: IOpenWeatherMapWeeklyForecast;
}
export type WindDirection =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "WSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW";

export interface WeatherTemperature {
  temp_min: number;
  temp_max: number;
  temp: number;
  humidity: number;
}

export interface DayForecast {
  location: string;
  summary: string;
  dt: number;
  date: Date;
  temperature: WeatherTemperature;
  icon: string;
  wind: {
    direction: WindDirection;
    speed: number;
  };
}

export interface OpenWeatherMapDayForecast {
  name: string;
  dt: number;
  dt_txt: string;
  sys: {
    country: string;
  };
  wind: {
    deg: number;
    speed: number;
  };
  main: WeatherTemperature;
  weather: Array<OpenWeatherMapDayForecastWeather>;
}

export interface OpenWeatherMapDayForecastWeather {
  description: string;
  icon: string;
  name: string;
}

export interface IOpenWeatherMapWeeklyForecast {
  list: Array<OpenWeatherMapDayForecast>;
}
export interface WeeklyForecast {
  list: Array<DayForecast>;
}

export enum OpenWeatherMapApiDataType {
  Weather = "weather",
  Forecast = "forecast"
}

export interface IByCityNameOptions {
  name: string;
  countryCode?: string;
}
