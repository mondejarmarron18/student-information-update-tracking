import { Router } from "express";
import CourseController from "../courseController";
import authMiddleware from "../../../middlewares/authMiddleware";
import CourseMiddlewarre from "../courseMiddleware";

const courseRoute = Router();
const courseController = new CourseController();
const courseMiddleware = new CourseMiddlewarre();

courseRoute.get("/", [authMiddleware], courseController.getCourses);

courseRoute.get(
  "/:courseId/specializations",
  [authMiddleware, courseMiddleware.getCourseSpecializations],
  courseController.getCourseSpecializations
);

courseRoute.post(
  "/",
  [authMiddleware, courseMiddleware.createCourse],
  courseController.createCourse
);

courseRoute.put("/:courseId", [authMiddleware], courseController.updateCourse);

export default courseRoute;
