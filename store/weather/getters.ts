import { WeatherState, RootState } from "~/types";
import { GetterTree } from "vuex";

// const getters = {
//   name(state): string {
//     return state.currentWeather.name;
//   }
// };
const getters: GetterTree<WeatherState, RootState> = {
  name(state): string {
    return state.dayForecast ? state.dayForecast.name : "";
  }
};

export default getters;
