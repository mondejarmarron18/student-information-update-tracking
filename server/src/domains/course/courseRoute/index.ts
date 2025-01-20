import { Router } from "express";
import CourseController from "../courseController";
import authMiddleware from "../../../middlewares/authMiddleware";

const courseRoute = Router();
const courseController = new CourseController();

courseRoute.get("/", [authMiddleware], courseController.getCourses);
courseRoute.get(
  "/:courseId/specializations",
  [authMiddleware],
  courseController.getCourseSpecializations
);

export default courseRoute;
