import { Router } from "express";
import roleRoute from "./domains/role/roleRoute";
import userRoute from "./domains/user/userRoute";

const routes = Router();

routes.use("/roles", roleRoute);
routes.use("/users", userRoute);

export default routes;
