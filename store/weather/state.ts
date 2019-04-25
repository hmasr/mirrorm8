import { WeatherState } from "~/types";

const state = (): WeatherState => ({
  dayForecast: undefined,
  weeklyForecast: undefined
});

export default state;
