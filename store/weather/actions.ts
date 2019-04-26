import { ActionTree } from "vuex";
import {
  WeatherState,
  RootState,
  IByCityNameOptions,
  OpenWeatherMapApiDataType
} from "~/types";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/";
const DEFAULT_API_VERSION = "2.5";
const DEFAULT_UNIT = "metric";

function getApiUrl(type: OpenWeatherMapApiDataType) {
  return new URL(
    `data/${DEFAULT_API_VERSION}/${type}?APPID=${
      process.env.KEY_OPENWEATHERMAPAPI
    }`,
    BASE_URL
  );
}
const actions: ActionTree<WeatherState, RootState> = {
  async dayForecastbyCityName(
    { commit },
    { name, countryCode }: IByCityNameOptions
  ) {
    const params = new URLSearchParams({
      q: [name, countryCode].join(),
      units: DEFAULT_UNIT
    });
    const url =
      getApiUrl(OpenWeatherMapApiDataType.Weather) + "&" + params.toString();
    const result = await axios.get(url);
    commit("setDayForecast", result.data);
  },
  async weeklyForecastByCityName(
    { commit },
    { name, countryCode }: IByCityNameOptions
  ) {
    const params = new URLSearchParams({
      q: [name, countryCode].join(),
      units: DEFAULT_UNIT
    });
    const url =
      getApiUrl(OpenWeatherMapApiDataType.Forecast) + "&" + params.toString();
    const result = await axios.get(url);
    commit("setWeeklyForecast", result.data);
  }
};

export default actions;
