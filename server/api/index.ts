import { Router } from "express";

import weatherRoutes from "./routes/weather";

const router = Router();

router.use("/weather", weatherRoutes);

export default router;
