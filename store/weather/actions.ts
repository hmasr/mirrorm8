import { ActionTree } from "vuex";
import {
  OpenWeatherMapApi,
  OpenWeatherMapApiUnits,
  IByCityNameOptions
} from "node-ts-open-weather-map";
import { WeatherState, RootState } from "~/types";

if (
  !process.env.KEY_OPENWEATHERMAPAPI ||
  !process.env.KEY_OPENWEATHERMAPAPI.length
) {
  throw new Error("Undefined environment variable 'KEY_OPENWEATHERMAPAPI'");
}

const openWeatherMapApi = new OpenWeatherMapApi({
  key: process.env.KEY_OPENWEATHERMAPAPI,
  temperatureUnit: OpenWeatherMapApiUnits.Celsius
});

const actions: ActionTree<WeatherState, RootState> = {
  async dayForecastbyCityName(
    { commit },
    { name, countryCode }: IByCityNameOptions
  ) {
    const data = await openWeatherMapApi.byCityName({
      name,
      countryCode
    });

    commit("setDayForecast", data);
  },
  async weeklyForecastByCityName(
    { commit },
    { name, countryCode }: IByCityNameOptions
  ) {
    const data = await openWeatherMapApi.forecastByCityName({
      name,
      countryCode
    });
    commit("setWeeklyForecast", data);
  }
};

export default actions;
