# API to return cryptocurrency data from [coinMarketCap](https://coinmarketcap.com/api/)

Goal is to create api with following endpoints:
- `/ticker`  
  This will return a list of N coins retrieved from [CMC](https://coinmarketcap.com/api/). This endpoint will accept few filtering/sorting arguments  
    • start: Number to represent then the item to start from on the list (e.g. 100, it will return elements starting from the 100th element). The default value in case not specified is 0.  
    • Elements: Int to represent the number of elements to return from the specified start index. (e.g. if we continue from the previous example of start: 100, amount: 50, it will return elements from 100 - 149). The default value will be 100, the maximum value will be 1000.  
    • SortBy: this will specify how the whole list needs to be sorted before selecting start-end points. The values to be sorted by are: MarketCap, Current USD Price, USD Volume Change in the last 24h, USD Price change last 24h. Is up to you to define how do you want to receive this information (format of the parameter). If nothing is specified, it will be sorted by Market Cap value.  
    • SortAsc: true/false property to specify the sort order of the previous property. The default value is ‘false’  
    • Filter: String argument that needs to be used to filter coins by name or Symbol. The string can be included on any part of the string, not necessarily from the beginning (e.g. Filter: ‘Chain’ will return things like ‘veChain’, ‘Chainlink’, ‘Chain’… and Filter: ‘BTC’ will return ‘BTC’, ‘BTCD’, ‘BTCP’…)  
- `/ticker/{symbol}`  
  This endpoint will return all the information from CMC for a specific coin. The second value on the URL is the Cryptocurrency Symbol, this information is standard and used across all platforms, so it will help in the future in case we need to change API. There is an endpoint available on CMC API to do a matching between Symbol-ID

### Prerequisites

You need to have Node, [yarn](https://yarnpkg.com/en/docs/install), [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) installed

### Commands

In root directory type
```bash
docker-compose up -d # run redis container as daemon
yarn
yarn start
```
The api will be running on localhost:8080

### Improvements

I implemented redis caching for the `ticker/{symbol}` by placing a small section of the coin data into the redis db. For the `/ticker` route more data is passed and needed from the client. So caching all 1000 blocks of data would not be so memory efficient. Maybe a consideration to make would be to only cache values which are used in filtering/sorting etc (e.g id, name, symbol, quotes.USD.price) then fetching data frm there then once we've filtered them down to user request and can fetch the rest of the data for each value using the id from the coinmarketcap api. Hopefully they would have an endpoint where you can fetch multiple coins using multiple ids in one request
