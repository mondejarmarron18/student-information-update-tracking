import { Request, Response } from "express";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";

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

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Course specializations retrieved successfully",
      data: null,
    });
  };
}
