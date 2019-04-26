export const enum OpenWeatherMapIcon {
  CLEAR_SKY_DAY = "01d",
  CLEAR_SKY_NIGHT = "01n",

  LIGHT_CLOUDS_DAY = "02d",
  LIGHT_CLOUDS_NIGHT = "02n",

  CLOUDY_DAY = "03d",
  CLOUDY_NIGHT = "03d",

  BROKEN_CLOUDS_DAY = "04d",
  BROKEN_CLOUDS_NIGHT = "04n",

  SHOWER_RAIN_DAY = "09d",
  SHOWER_RAIN_NIGHT = "09n",

  RAIN_DAY = "10d",
  RAIN_NIGHT = "10d",

  THUNDERSTORM_DAY = "11d",
  THUNDERSTORM_NIGHT = "11n",

  SNOW_DAY = "13d",
  SNOW_NIGHT = "13n",

  FOG_DAY = "50d",
  FOG_NIGHT = "50n"
}

const map = new Map<OpenWeatherMapIcon, string>();

/* Clear Sky */
map.set(OpenWeatherMapIcon.CLEAR_SKY_DAY, "meteo-sun");
map.set(OpenWeatherMapIcon.CLEAR_SKY_NIGHT, "meteo-moon");

/* Light clouds */
map.set(OpenWeatherMapIcon.LIGHT_CLOUDS_DAY, "meteo-cloud-sun");
map.set(OpenWeatherMapIcon.LIGHT_CLOUDS_NIGHT, "meteo-cloud-sun");

/* Cloudy */
map.set(OpenWeatherMapIcon.CLOUDY_DAY, "meteo-cloud");
map.set(OpenWeatherMapIcon.CLOUDY_NIGHT, "meteo-cloud");

/* Broken Clouds */
map.set(OpenWeatherMapIcon.BROKEN_CLOUDS_DAY, "meteo-clouds");
map.set(OpenWeatherMapIcon.BROKEN_CLOUDS_NIGHT, "meteo-clouds");

/* Shower Rain */
map.set(OpenWeatherMapIcon.SHOWER_RAIN_DAY, "meteo-windy-rain");
map.set(OpenWeatherMapIcon.SHOWER_RAIN_NIGHT, "meteo-windy-rain");

/* Rainy */
map.set(OpenWeatherMapIcon.RAIN_DAY, "meteo-rain");
map.set(OpenWeatherMapIcon.RAIN_NIGHT, "meteo-rain");

/* Thunderstorm */
map.set(OpenWeatherMapIcon.THUNDERSTORM_DAY, "meteo-clouds-flash");
map.set(OpenWeatherMapIcon.THUNDERSTORM_NIGHT, "meteo-clouds-flash");

/* Snow */
map.set(OpenWeatherMapIcon.SNOW_DAY, "meteo-snow-heavy");
map.set(OpenWeatherMapIcon.SNOW_NIGHT, "meteo-snow-heavy");

/* Fog */
map.set(OpenWeatherMapIcon.FOG_DAY, "meteo-fog-sun");
map.set(OpenWeatherMapIcon.FOG_NIGHT, "meteo-fog-moon");

function getIcon(icon: OpenWeatherMapIcon): string {
  if (!map.has(icon)) return "meteo-na";
  return map.get(icon)!;
}

export { map, getIcon };
