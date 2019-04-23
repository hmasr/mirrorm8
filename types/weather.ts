export interface WeatherState {
  isLoading: boolean;
  dayForecast?: DayForecast;
  weeklyForecast?: WeeklyForecast;
}

export interface DayForecast {
  name: string;
}

export interface WeeklyForecast {}

export enum OpenWeatherMapApiDataType {
  Weather = "weather",
  Forecast = "forecast"
}

export interface IByCityNameOptions {
  name: string;
  countryCode?: string;
}
