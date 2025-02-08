import { Router } from "express";
import UpdateRequestController from "../updateRequestController";
import authMiddleware from "../../../middlewares/authMiddleware";
import UpdateRequestMiddleware from "../updateRequestMiddleware";
import isRole from "../../../utils/isRole";
import authRole from "../../../middlewares/authRole";

const updateRequestRoute = Router();
const updateRequestController = new UpdateRequestController();
const updateRequestMiddleware = new UpdateRequestMiddleware();

updateRequestRoute.get(
  "/",
  [authMiddleware],
  updateRequestController.getUpdateRequests
);
updateRequestRoute.get(
  "/passed-days",
  [
    authMiddleware,
    authRole().isStaff().isAdmin().isSuperAdmin().apply,
    updateRequestMiddleware.getUpdateRequestsPassedDays,
  ],
  updateRequestController.getUpdateRequestsPassedDays
);
updateRequestRoute.get(
  "/passed-months",
  [
    authMiddleware,
    authRole().isStaff().isAdmin().isSuperAdmin().apply,
    updateRequestMiddleware.getUpdateRequestsPassedMonths,
  ],
  updateRequestController.getUpdateRequestsPassedMonths
);

updateRequestRoute.get(
  "/:id",
  [authMiddleware],
  updateRequestController.getUpdateRequestById
);
updateRequestRoute.post(
  "/",
  [authMiddleware, updateRequestMiddleware.createUpdateRequest],
  updateRequestController.createUpdateRequest
);
updateRequestRoute.post(
  "/:id/approve",
  [authMiddleware],
  updateRequestController.approveUpdateRequest
);
updateRequestRoute.post(
  "/:id/reject",
  [authMiddleware],
  updateRequestController.rejectUpdateRequest
);

export default updateRequestRoute;
