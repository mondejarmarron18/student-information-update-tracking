import Express from "express";
import config from "./utils/config";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { dbConnect } from "./utils/config/database";
import auditLog from "./middlewares/auditLog";
import helmet from "helmet";

const app = Express();
const port = config.port;

app.use(morgan("dev"));
app.use(Express.json());
app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(auditLog);
app.use(routes);

dbConnect(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
