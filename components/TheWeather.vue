<template>
  <div class="the-weather">
    <div v-if="dayForecast" class="day-forecast">
      <div class="day-forecast__location">
        <b>{{ dayForecast.location }}</b>
      </div>
      <div class="columns col-gapless">
        <div class="column col-4 day-forecast__temperature">
          <i :class="dayForecast.icon" />
          {{ dayForecast.temperature.temp }}°
        </div>
        <div class="column col-6 day-forecast__wind">
          <div class="d-inline-block">
            <i class="meteo-wind" />
          </div>
          <div class="d-inline-block">
            {{ dayForecast.wind.direction }}
            <br />
            {{ dayForecast.wind.speed }}km/h
          </div>
        </div>
      </div>
    </div>

    <div v-if="weeklyForecast" class="forecast columns col-gapless">
      <div
        class="forecast-item column col-2"
        v-for="forecast in weeklyForecast.list"
        :key="forecast.dt"
      >
        <div class="forecast-item__day">
          <b>{{ forecast.summary }}</b>
        </div>
        <i :class="forecast.icon" class="forecast-item__icon" />
        <div class="forecast-item__temp">{{ forecast.temperature.temp }}°</div>
        <div class="forecast-item__temp-low">
          {{ forecast.temperature.temp_min }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { namespace } from "vuex-class";
import { WeatherState, DayForecast, WeeklyForecast } from "~/types";

const weather = namespace("weather");

@Component({})
export default class TheWeather extends Vue {
  @weather.State weather!: WeatherState;
  @weather.Action dayForecastbyCityName;
  @weather.Action weeklyForecastByCityName;
  @weather.Getter dayForecast!: DayForecast;
  @weather.Getter weeklyForecast!: WeeklyForecast;

  private interval!: NodeJS.Timer;

  mounted() {
    this.$_update();
    // Update hourly.
    this.interval = setInterval(this.$_update, 60 * 60 * 1000);
  }

  destroy() {
    clearTimeout(this.interval);
  }

  private $_update() {
    const options = {
      name: encodeURIComponent(process.env.CITY as string),
      countryCode: process.env.LANG,
    };
    this.dayForecastbyCityName(options);
    this.weeklyForecastByCityName(options);
  }
}
</script>

<style lang="scss" scoped>
.the-weather {
  width: 420px;
  min-width: 420px;
  .day-forecast {
    .day-forecast__location {
      font-size: 14px;
      margin-top: 8px;
    }
    .day-forecast__temperature {
      font-size: 44px;
      font-weight: 600;
      line-height: 1;
    }
    .day-forecast__wind {
      display: inline-block;
      line-height: 1;
    }
  }
  .forecast {
    .forecast-item {
      text-align: center;
      min-width: 65px;

      .forecast-item__day {
        text-transform: capitalize;
        padding-top: 12px;
        line-height: 100%;
      }
      .forecast-item__icon:before {
        font-size: 32px;
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
