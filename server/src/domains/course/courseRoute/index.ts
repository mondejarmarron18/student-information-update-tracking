import { Router } from "express";
import CourseController from "../courseController";
import authMiddleware from "../../../middlewares/authMiddleware";
import CourseMiddlewarre from "../courseMiddleware";
import authRole from "../../../middlewares/authRole";

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
  [
    authMiddleware,
    courseMiddleware.createCourse,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  courseController.createCourse
);

courseRoute.put(
  "/:courseId",
  [
    authMiddleware,
    courseMiddleware.updateCourse,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  courseController.updateCourse
);

courseRoute.delete(
  "/:courseId",
  [
    authMiddleware,
    courseMiddleware.deleteCourseById,
    authRole().isSuperAdmin().isAdmin().apply,
  ],
  courseController.deleteCourseById
);

courseRoute.get(
  "/:courseId",
  [authMiddleware, courseMiddleware.getCourseById],
  courseController.getCourseById
);

export default courseRoute;
