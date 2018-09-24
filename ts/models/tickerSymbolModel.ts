import fetch from "node-fetch";
import redis from "../redis";

const LISTING_URL: string = "https://api.coinmarketcap.com/v2/listings";
const TICKER_URL: string = "https://api.coinmarketcap.com/v2/ticker";
const LISTINGS_KEY: string = "LISTINGS";

async function fetchListings(): Promise<any[]> {
  const listings = await redis.getAsync(LISTINGS_KEY);
  if (listings)
    return JSON.parse(listings);
  
  const response = await fetch(LISTING_URL);
  const data = await response.json();
  const cacheData = data.data.map(d => ({
    id: d.id,
    symbol: d.symbol
  }));
  
  redis.set(LISTINGS_KEY, JSON.stringify(cacheData));
  return data.data;
}

async function tickerSymbolModel(symbol: string): Promise<any> {
  const listings: any[] = await fetchListings();
  const listing = listings.find(crypto => crypto.symbol === symbol);

  if (!listing)
    throw new Error(`${symbol} not valid cryptocurrency`);

  const response2 = await fetch(`${TICKER_URL}/${listing.id}`);
  const data2 = response2.json();
  return data2;
}

export default tickerSymbolModel;