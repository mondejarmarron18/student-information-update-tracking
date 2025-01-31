import Express from "express";
import config from "./utils/config";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { dbConnect } from "./utils/config/database";

const app = Express();
const port = config.port;

app.use(morgan("dev"));
app.use(Express.json());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(routes);

dbConnect(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
