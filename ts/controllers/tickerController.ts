import * as express from "express";
import { tickerModel } from "../models";

export async function getTickerData(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
  const { query } = req;

  try {
    const data = await tickerModel(query);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
