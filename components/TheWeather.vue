<template>
  <div class="the-weather">
    <div v-if="dayForecast" class="day-forecast">
      <div class="day-forecast__location">
        <b>{{dayForecast.location}}</b>
      </div>
      <div class="day-forecast__summary">{{dayForecast.summary}}</div>
      <div class="columns flex-centered">
        <div class="column col-6 day-forecast__temperature">
          <i :class="dayForecast.icon"/>
          {{dayForecast.temperature.temp}}°
        </div>
        <div class="column col-6 day-forecast__details">
          <div class="day-forecast__humidity">Vochtigheid: {{dayForecast.temperature.humidity}}%</div>
          <div
            class="day-forecast__wind"
          >Wind: {{dayForecast.wind.direction}} {{dayForecast.wind.speed}}km/h</div>
        </div>
      </div>
    </div>
    <!-- <div v-if="weather.isLoading">Loading...</div> -->
    <div v-if="weeklyForecast" class="forecast columns col-gapless">
      <div
        class="forecast-item column col-2"
        v-for="forecast in weeklyForecast.list"
        :key="forecast.dt"
      >
        <div class="forecast-item__day">
          <b>{{forecast.summary}}</b>
        </div>
        <i :class="forecast.icon"/>
        <div class="forecast-item__temp">{{forecast.temperature.temp}}°</div>
        <div class="forecast-item__temp-low">{{forecast.temperature.temp_min}}°</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";
import { WeatherState, DayForecast, WeeklyForecast } from "~/types";

const weather = namespace("weather");

@Component({})
export default class TheWeather extends Vue {
  @State weather!: WeatherState;
  @weather.Action dayForecastbyCityName;
  @weather.Action weeklyForecastByCityName;
  @weather.Getter dayForecast!: DayForecast;
  @weather.Getter weeklyForecast!: WeeklyForecast;

  mounted() {
    const options = {
      name: "veldhoven",
      countryCode: process.env.LANG
    };
    this.dayForecastbyCityName(options);
    this.weeklyForecastByCityName(options);
  }
}
</script>

<style lang="scss" scoped>
.the-weather {
  width: 400px;
  min-width: 400px;
  .day-forecast {
    .day-forecast__location {
      font-size: 20px;
    }
    .day-forecast__summary {
      text-transform: capitalize;
      font-size: 1em;
      margin: 4px 0 2px;
      color: #d8d8d8;
    }
    .day-forecast__temperature {
      font-size: 44px;
      font-weight: 600;
    }
  }
  .forecast {
    .forecast-item {
      text-align: center;
      min-width: 65px;

      .forecast-item__day {
        text-transform: capitalize;
        padding-top: 20px;
        line-height: 100%;
      }
      .forecast-item__icon {
        line-height: 1;
      }
      .forecast-item__temp {
        font-weight: 600;
        font-size: 18px;
      }
      .forecast-item__temp-low {
        font-weight: normal;
        font-size: 1em;
        line-height: 100%;
      }
    }
  }
}
</style>
