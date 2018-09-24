import fetch from "node-fetch";
const sort = require("fast-sort");

const BASE_URL: string = "https://api.coinmarketcap.com/v2/ticker/";

interface TickerQuery {
  start: number;
  elements: number;
  sortBy: "marketCap" | "currentPriceUSD" | "volumeChangeInLast24hUSD" | "priceChangeLast24hUSD";
  sortAsc: boolean;
  filter?: string;
}
const DEFAULT_QUERY: TickerQuery = {
  start: 0,
  elements: 100,
  sortBy: "marketCap",
  sortAsc: false,
};

async function tickerModel(query: TickerQuery = DEFAULT_QUERY): Promise<any> {
  const coins = await fetchCoins();
  const updatedQuery: TickerQuery = {...DEFAULT_QUERY, ...query};

  const { start, elements, sortBy, sortAsc, filter } = updatedQuery;
  const sort = sortAsc ? "asc" : "desc";
  const sorted: any[] = sortCoins(coins, sortBy, sort);
  let data: any[] = sorted.slice(start, elements);

  if (filter) {
    const regex = RegExp(filter);
    data = data.filter(coin => regex.test(coin.name) || regex.test(coin.symbol));
  }

  return data;
}

async function fetchCoins(): Promise<any> {
  const promises = [];
  for (let i = 0; i < 1000; i += 100) {
    const url = `${BASE_URL}?start=${i}&limit=100&structure=array`;
    promises.push(fetch(url).then(data => data.json()));
  }
  const responses = await Promise.all(promises);
  return responses.reduce((acc, resp) => acc.concat(resp.data), []);
}

const sortCoins = (coins, sortBy: "marketCap" | "currentPriceUSD" | "volumeChangeInLast24hUSD" | "priceChangeLast24hUSD", sortAsc: "asc" | "desc"): any[] => {
  switch (sortBy) {
    case "currentPriceUSD":
      return sort(coins)[sortAsc](c => c.quotes.USD.price);
    case "volumeChangeInLast24hUSD":
      return sort(coins)[sortAsc](c => c.quotes.USD.volume_24h);
    case "priceChangeLast24hUSD":
      return sort(coins)[sortAsc](c => c.quotes.USD.percent_change_24h);
    default:
      return sort(coins)[sortAsc](c => c.quotes.USD.market_cap);
  }
}

export default tickerModel;
