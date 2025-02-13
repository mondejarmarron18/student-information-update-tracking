import { Router } from "express";
import UpdateRequestController from "../updateRequestController";
import authMiddleware from "../../../middlewares/authMiddleware";
import UpdateRequestMiddleware from "../updateRequestMiddleware";
import authIpAddress from "../../../middlewares/authIpAddress";

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
  [authMiddleware, updateRequestMiddleware.getUpdateRequestsPassedDays],
  updateRequestController.getUpdateRequestsPassedDays
);
updateRequestRoute.get(
  "/passed-months",
  [authMiddleware, updateRequestMiddleware.getUpdateRequestsPassedMonths],
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
  "/notify-stale-requests",
  [updateRequestMiddleware.notifyStaleUpdateRequests, authIpAddress],
  updateRequestController.notifyStaleUpdateRequests
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
