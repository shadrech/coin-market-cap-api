import * as express from "express";
const router = express.Router();

import { tickerController } from "./controllers";

router.get("/ticker", tickerController.getTickerData);
router.get("/ticker/:symbol", tickerController.getTickerSymbolData);

export default router;
