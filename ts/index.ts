import * as express from "express";

import routes from "./routes";
import { setResponseHeaders, errorHandler } from "./middleware";

const app: express.Express = express();
app.use(setResponseHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

// error handling
app.use(errorHandler);

app.listen(8080, () => {
  console.log("App running on port 8080");
});
