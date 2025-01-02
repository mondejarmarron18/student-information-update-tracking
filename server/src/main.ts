import Express from "express";
import config from "./utils/config";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = Express();
const port = config.port;

app.use(morgan("dev"));
app.use(Express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(routes);

mongoose
  .connect(config.dbUrl as string)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
