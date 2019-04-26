import {
  WeatherState,
  OpenWeatherMapDayForecast,
  IOpenWeatherMapWeeklyForecast
} from "~/types";
import { MutationTree } from "vuex";

const mutations: MutationTree<WeatherState> = {
  setDayForecast(state: WeatherState, payload: OpenWeatherMapDayForecast) {
    state.dayForecast = payload;
  },
  setWeeklyForecast(
    state: WeatherState,
    payload: IOpenWeatherMapWeeklyForecast
  ) {
    state.weeklyForecast = payload;
  }
};

export default mutations;
