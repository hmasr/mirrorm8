import { Router } from "express";

import weatherRoutes from "./routes/weather";
import calendarRoutes from "./routes/calendar";

const router = Router();

router.use("/weather", weatherRoutes);
router.use("/calendar", calendarRoutes);

export default router;
