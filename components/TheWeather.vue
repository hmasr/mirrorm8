<template>
  <div class="the-weather">
    <div class="forecast-details">
      <div class="forecast-details__city">
        <!-- <b>{{name}}</b> -->
      </div>
      <!-- <div class="forecast-description">{{weather.weather[0].main}}</div> -->
      <div class="forecast-details__temperature-value"></div>
      <!-- {{isLoading}} -->
    </div>
    <!-- <div v-if="weather.isLoading">Loading...</div> -->
    <div class="forecast columns col-gapless">
      <div class="forecast-item column col-2">
        <div class="forecast-item__day">
          <b>Sun</b>
        </div>
        <img
          class="forecast-item__icon"
          src="https://duckduckgo.com/assets/weather/svg/new/partly-cloudy-day.svg"
          alt="Partly cloudy in the morning."
        >
        <div class="forecast-item__temp-high">13°</div>
        <div class="forecast-item__temp-low">0°</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { WeatherState } from "~/types";

// const weather = namespace("");
const namespace: string = "weather";
@Component({})
export default class TheWeather extends Vue {
  @State("weather", { namespace }) weather!: WeatherState;
  @Action("byCityName", { namespace }) byCityName;
  // @weather.Getter("isLoading") isLoading: boolean;
  // @weather.Getter(
  //   (state: WeatherState): string => {
  //     return state.currentWeather.name;
  //   }
  // )
  // name: string;

  mounted() {
    console.log(this.byCityName.toString());
    this.byCityName({ name: "veldhoven", countryCode: "nl" });
    console.log("WeatherState", this.weather);
    console.log("store", this.$store.state);
  }
}
</script>

<style lang="scss" scoped>
.the-weather {
  .forecast-details {
    .forecast-details__city {
      font-size: 20px;
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
      .forecast-item__temp-high {
        font-size: 20px;
      }
    }
  }
}
</style>
