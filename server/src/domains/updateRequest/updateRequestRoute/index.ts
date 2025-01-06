import { Router } from "express";
import UpdateRequestController from "../updateRequestController";
import authMiddleware from "../../../middlewares/authMiddleware";
import UpdateRequestMiddleware from "../updateRequestMiddleware";

const updateRequestRoute = Router();
const updateRequestController = new UpdateRequestController();

updateRequestRoute.get(
  "/",
  [authMiddleware],
  updateRequestController.getUpdateRequests
);
updateRequestRoute.get(
  "/:id",
  [authMiddleware],
  updateRequestController.getUpdateRequestById
);
updateRequestRoute.post(
  "/",
  [authMiddleware, UpdateRequestMiddleware.createUpdateRequest],
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
