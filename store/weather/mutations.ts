import { DayForecast, WeatherState } from "~/types";
import { MutationTree } from "vuex";

const mutations: MutationTree<WeatherState> = {
  setCurrentWeather(state: WeatherState, payload: DayForecast) {
    // console.log("weather", payload);
    state.dayForecast = payload;
    console.log(state);
  },
  // setCurrentForecast(state, payload) {
  //   // state.currentForecast = payload;
  // },
  setLoading(state: WeatherState, payload: boolean) {
    state.isLoading = payload;
  }
};

export default mutations;
