import { Request, Response } from "express";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import customErrors from "../../../constants/customErrors";
import { ICourse } from "../courseModel";
import { x8tAsync, x8tSync } from "x8t";
import CourseService from "../courseService";

export default class CourseController {
  courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  getCourses = async (req: Request, res: Response) => {
    const courses = await x8tAsync(this.courseService.getCourses());

    if (courses.error)
      return CustomResponse.sendHandledError(res, courses.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Courses retrieved successfully",
      data: courses.result,
    });
  };

  getCourseSpecializations = (
    req: Request<{ courseId: string }>,
    res: Response
  ) => {
    const { courseId } = req.params;

    const id = convertToObjectId(courseId);

    if (!id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Course specializations retrieved successfully",
      data: null,
    });
  };

  createCourse = async (req: Request, res: Response) => {
    const creatorId = req.user?._id;

    if (!creatorId) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.unauthorized,
      });
    }

    const newCourse = await x8tAsync(
      this.courseService.createCourse({
        ...req.body,
        creatorId,
      })
    );

    if (newCourse.error)
      return CustomResponse.sendHandledError(res, newCourse.error);

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Course created successfully",
      data: null,
    });
  };

  updateCourse = async (req: Request, res: Response) => {
    const updaterId = req.user?._id;

    if (!updaterId) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.unauthorized,
      });
    }

    const { id, error: idError } = convertToObjectId(req.params.id);

    if (idError || !id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    const updatedCourse = await x8tAsync(
      this.courseService.updateCourse(id, {
        ...req.body,
        updaterId,
      })
    );

    if (updatedCourse.error)
      return CustomResponse.sendHandledError(res, updatedCourse.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Course updated successfully",
      data: updatedCourse.result,
    });
  };
}
