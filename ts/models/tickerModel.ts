import * as merge from "deepmerge";
import fetch from "node-fetch";

const BASE_URL: string = "https://api.coinmarketcap.com/v2/ticker/";

interface TickerQuery {
  start: number;
  limit: number;
  sort: "id" | "rank" | "volume_24h" | "percent_change_24h";
  structure: "dictionary" | "array";
  convert?: "AUD" | "BRL" | "CAD" | "CHF" | "CLP" | "CNY" | "CZK" | "DKK" | "EUR" | "GBP" | "HKD" | "HUF" | "IDR" | "ILS" | "INR" | "JPY" | "KRW" | "MXN" | "MYR" | "NOK" | "NZD" | "PHP" | "PKR" | "PLN" | "RUB" | "SEK" | "SGD" | "THB" | "TRY" | "TWD" | "ZAR" | "BTC" | "ETH" | "XRP" | "LTC" | "BCH";
}
const DEFAULT_QUERY: TickerQuery = {
  start: 1,
  limit: 100,
  sort: "rank",
  structure: "dictionary",
};

async function tickerModel(query: TickerQuery = DEFAULT_QUERY): Promise<any> {
  const updatedQuery: TickerQuery = merge(DEFAULT_QUERY, query);
  const url: string = constructUrl(updatedQuery);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function constructUrl(query: TickerQuery): string {
  let urlizedQuery: string = Object.keys(query).reduce((acc, key) => `${acc}&${key}=${query[key]}`, "");
  return `${BASE_URL}?${urlizedQuery}`;
}

export default tickerModel;
