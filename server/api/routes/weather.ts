import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import {
  OpenWeatherMapApi,
  OpenWeatherMapApiUnits,
  IByCityNameOptions
} from "node-ts-open-weather-map";
import consola from "consola";

const router: Router = Router();

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

router.get(
  "/forecast/daily",
  [
    check("name")
      .trim()
      .notEmpty(),
    check("countryCode")
      .trim()
      .notEmpty()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { name, countryCode } = req.query;
      const data = await openWeatherMapApi.byCityName({
        name,
        countryCode
      } as IByCityNameOptions);
      return res.status(200).json(data);
    } catch (error) {
      consola.error(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/forecast/weekly",
  [
    check("name")
      .trim()
      .notEmpty(),
    check("countryCode")
      .trim()
      .notEmpty()
  ],
  async (req: Request, res: Response) => {
    try {
      const { name, countryCode } = req.query;
      const data = await openWeatherMapApi.forecastByCityName({
        name,
        countryCode
      } as IByCityNameOptions);

      return res.json(data);
    } catch (error) {
      consola.error(error);
      return res.status(500).json(error);
    }
  }
);

export default router;
