import { WeatherState } from "~/types";

const state = (): WeatherState => ({
  isLoading: false,
  dayForecast: undefined,
  weeklyForecast: undefined
});

export default state;
