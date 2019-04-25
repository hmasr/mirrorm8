import {
  WeatherState,
  RootState,
  DayForecast,
  WindDirection,
  WeatherTemperature,
  WeeklyForecast,
  OpenWeatherMapDayForecast
} from "~/types";
import { GetterTree } from "vuex";
import { stringify } from "querystring";

const angles: Array<WindDirection> = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW"
];

function degToCompass(num: number): WindDirection {
  return angles[Math.floor(((num + 360 / 16 / 2) % 360) / (360 / 16))];
}

function ToDayForecast(dayForecast: OpenWeatherMapDayForecast): DayForecast {
  const date = new Date(dayForecast.dt * 1000);

  return {
    date: date,
    dt: dayForecast.dt * 1000,
    location: `${dayForecast.name}, ${dayForecast.sys.country}`,
    temperature: {
      temp: Math.round(dayForecast.main.temp),
      temp_min: Math.round(dayForecast.main.temp_min),
      temp_max: Math.round(dayForecast.main.temp_max),
      humidity: Math.round(dayForecast.main.humidity)
    } as WeatherTemperature,
    wind: {
      direction: degToCompass(dayForecast.wind.deg),
      speed: Math.round(dayForecast.wind.speed * 3.6) // m/s -> kph
    }
  } as DayForecast;
}

const getters: GetterTree<WeatherState, RootState> = {
  dayForecast(state: WeatherState): DayForecast | undefined {
    if (!state.dayForecast) {
      return undefined;
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };
    const forecast = ToDayForecast(state.dayForecast);
    forecast.summary = `${forecast.date.toLocaleDateString(
      process.env.LANG,
      options
    )} • ${state.dayForecast.weather[0].description}`;
    return forecast;
  },
  weeklyForecast(state: WeatherState): WeeklyForecast | undefined {
    if (!state.weeklyForecast) {
      return undefined;
    }

    const dailyMap = new Map<string, Array<DayForecast>>();
    const list: Array<DayForecast> = [];

    for (const dayForecast of state.weeklyForecast.list) {
      const i = dayForecast.dt_txt.split(" ")[0];

      if (!dailyMap.has(i)) {
        dailyMap.set(i, []);
      }

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short"
      };
      const forecast = ToDayForecast(dayForecast);
      forecast.summary = forecast.date.toLocaleDateString(
        process.env.LANG,
        options
      );

      dailyMap.get(i)!.push(forecast);
    }
    console.log(dailyMap);
    for (const value of dailyMap.values()) {
      const fromDate: Date = new Date(value[0].dt);
      const toDate: Date = new Date(value[0].dt);

      fromDate.setHours(12);
      toDate.setHours(14);
      let dayForecast =
        value.filter(
          o =>
            o.date.getTime() >= fromDate.getTime() &&
            o.date.getTime() <= toDate.getTime()
        )[0] || value[value.length - 1];

      let dayTempMin: number = 0;
      let dayTempAvg: number = 0;
      for (const i of value) {
        if (!dayTempMin || i.temperature.temp_min < dayTempMin) {
          dayTempMin = i.temperature.temp_min;
        }
        dayTempAvg += i.temperature.temp;
      }

      dayForecast.temperature.temp_min = dayTempMin;
      dayForecast.temperature.temp = Math.round(dayTempAvg / value.length);

      list.push(dayForecast);
    }

    console.log(list);
    return {
      list
    } as WeeklyForecast;
  }
};

export default getters;
