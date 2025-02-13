import { Router } from "express";
import UpdateRequestController from "../updateRequestController";
import authMiddleware from "../../../middlewares/authMiddleware";
import UpdateRequestMiddleware from "../updateRequestMiddleware";

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
  "/:id/approve",
  [authMiddleware],
  updateRequestController.approveUpdateRequest
);
updateRequestRoute.post(
  "/:id/reject",
  [authMiddleware],
  updateRequestController.rejectUpdateRequest
);
updateRequestRoute.post(
  "/notify-stale-requests",
  updateRequestController.notifyStaleUpdateRequests
);

export default updateRequestRoute;
