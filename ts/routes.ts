import * as express from "express";
const router = express.Router();

import { tickerController } from "./controllers";

router.get("/ticker", tickerController.getTickerData);

export default router;
