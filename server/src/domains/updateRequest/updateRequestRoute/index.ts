import { Router } from "express";
import UpdateRequestController from "../updateRequestController";
import authMiddleware from "../../../middlewares/authMiddleware";

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
  [authMiddleware],
  updateRequestController.createUpdateRequest
);
updateRequestRoute.put(
  "/:id/approve",
  [authMiddleware],
  updateRequestController.approveUpdateRequest
);
updateRequestRoute.put(
  "/:id/reject",
  [authMiddleware],
  updateRequestController.rejectUpdateRequest
);

export default updateRequestRoute;
