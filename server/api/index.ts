import express, { Router } from "express";
import url from "url";
import weatherRoutes from "./routes/weather";
import calendarRoutes from "./routes/calendar";

const router = Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.query = url.parse(req.url, true).query;
  req.res = res;
  res.req = req;
  next();
});

router.use("/weather", weatherRoutes);
router.use("/calendar", calendarRoutes);

export default router;
