import * as express from "express";

export function setResponseHeaders( _req: express.Request, res: express.Response, next: express.NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 
  next();
}
