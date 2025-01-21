import { Router } from "express";
import roleRoute from "./domains/role/roleRoute";
import userRoute from "./domains/user/userRoute";
import { serve as swaggerServe } from "swagger-ui-express";
import { swaggerSetup } from "./utils/swagger/swagger";
import userProfileRoute from "./domains/userProfile/userProfileRoute";
import acadProfileRoute from "./domains/acadProfile/acadProfileRoute";
import updateRequestRoute from "./domains/updateRequest/updateRequestRoute";
import auditLogRoute from "./domains/auditLog/auditLogRoute";
import courseRoute from "./domains/course/courseRoute";
import yearLevelRoute from "./domains/yearLevel/yearLevelRoute";
import specializationRoute from "./domains/specialization/specializationRoute";

const routes = Router();

// Routes
routes.use("/roles", roleRoute);
routes.use("/users", userRoute);
routes.use("/user-profiles", userProfileRoute);
routes.use("/academic-profiles", acadProfileRoute);
routes.use("/update-requests", updateRequestRoute);
routes.use("/audit-logs", auditLogRoute);
routes.use("/courses", courseRoute);
routes.use("/specializations", specializationRoute);
routes.use("/year-levels", yearLevelRoute);

// Documentation route
routes.use("/docs", swaggerServe, swaggerSetup);

export default routes;
