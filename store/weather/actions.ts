import { ActionTree } from "vuex";
import { WeatherState, RootState } from "~/types";
import { IByCityNameOptions } from "node-ts-open-weather-map";
import axios from "@nuxtjs/axios";

const actions: ActionTree<WeatherState, RootState> = {
  async dayForecastbyCityName(
    { commit },
    { name, countryCode }: IByCityNameOptions
  ) {
    const data = await this.$axios.$get("/api/weather/forecast/daily", {
      params: { name, countryCode }
    });
    commit("setDayForecast", data);
  },
  async weeklyForecastByCityName(
    { commit },
    { name, countryCode }: IByCityNameOptions
  ) {
    const data = await this.$axios.$get("/api/weather/forecast/weekly", {
      params: { name, countryCode }
    });
    commit("setWeeklyForecast", data);
  }
};

export default actions;
