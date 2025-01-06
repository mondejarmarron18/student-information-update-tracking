import { Router } from "express";
import roleRoute from "./domains/role/roleRoute";
import userRoute from "./domains/user/userRoute";
import { serve as swaggerServe } from "swagger-ui-express";
import { swaggerSetup } from "./utils/swagger/swagger";
import userProfileRoute from "./domains/userProfile/userProfileRoute";
import acadProfileRoute from "./domains/acadProfile/acadProfileRoute";
import updateRequestRoute from "./domains/updateRequest/updateRequestRoute";

const routes = Router();

// Routes
routes.use("/roles", roleRoute);
routes.use("/users", userRoute);
routes.use("/user-profiles", userProfileRoute);
routes.use("/academic-profiles", acadProfileRoute);
routes.use("/update-requests", updateRequestRoute);

// Documentation route
routes.use("/docs", swaggerServe, swaggerSetup);

export default routes;
