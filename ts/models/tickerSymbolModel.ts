import fetch from "node-fetch";

const LISTING_URL: string = "https://api.coinmarketcap.com/v2/listings";
const TICKER_URL: string = "https://api.coinmarketcap.com/v2/ticker";

async function tickerSymbolModel(symbol: string): Promise<any> {
  const response = await fetch(LISTING_URL);
  const data = await response.json();
  const listing = data.data.find(crypto => crypto.symbol === symbol);

  if (!listing)
    throw new Error(`${symbol} not valid cryptocurrency`);

  const response2 = await fetch(`${TICKER_URL}/${listing.id}`);
  const data2 = response2.json();
  return data2;
}

export default tickerSymbolModel;