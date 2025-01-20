import { Request, Response } from "express";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import customErrors from "../../../constants/customErrors";

export default class CourseController {
  constructor() {}

  getCourses = (req: Request, res: Response) => {
    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Courses retrieved successfully",
      data: [],
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
}
