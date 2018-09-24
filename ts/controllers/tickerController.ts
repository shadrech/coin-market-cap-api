import * as express from "express";
import { tickerModel, tickerSymbolModel } from "../models";

export async function getTickerData(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const { query } = req;

  try {
    const data = await tickerModel(query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getTickerSymbolData(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const { symbol } = req.params;

  try {
    const data = await tickerSymbolModel(symbol);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
