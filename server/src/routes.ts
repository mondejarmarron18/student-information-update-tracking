import { Router } from "express";
import roleRoute from "./domains/role/roleRoute";
import userRoute from "./domains/user/userRoute";
import { serve as swaggerServe } from "swagger-ui-express";
import { swaggerSetup } from "./utils/swagger/swagger";

const routes = Router();

routes.use("/roles", roleRoute);
routes.use("/users", userRoute);
routes.use("/docs", swaggerServe, swaggerSetup);

export default routes;
