import { Request, Response } from "express";
import CustomResponse from "../../../utils/CustomResponse";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import customErrors from "../../../constants/customErrors";
import { x8tAsync } from "x8t";
import CourseService from "../courseService";
import AuditLogService from "../../auditLog/auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { schemaName } from "../../../constants/schemaName";

export default class CourseController {
  private courseService: CourseService;
  private auditLogService: AuditLogService;

  constructor() {
    this.courseService = new CourseService();
    this.auditLogService = new AuditLogService();
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

  getCourseById = async (req: Request<{ courseId: string }>, res: Response) => {
    const { courseId } = req.params;

    const { id } = convertToObjectId(courseId);

    if (!id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    const course = await x8tAsync(this.courseService.getCourseById(id));

    if (course.error) return CustomResponse.sendHandledError(res, course.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Course retrieved successfully",
      data: course.result,
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

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.CREATED,
        details: "Created a new course",
        entity: schemaName.COURSE,
      }),
      {
        log: true,
      }
    );

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

    const { id: courseId } = convertToObjectId(req.params.courseId);

    if (!courseId) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    const updatedCourse = await x8tAsync(
      this.courseService.updateCourse(courseId, {
        ...req.body,
        updaterId,
      })
    );

    if (updatedCourse.error)
      return CustomResponse.sendHandledError(res, updatedCourse.error);

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.UPDATED,
        details: "Updated a course",
        entity: schemaName.COURSE,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Course updated successfully",
      data: updatedCourse.result,
    });
  };

  deleteCourseById = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { id } = convertToObjectId(courseId);

    if (!id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    const deletedCourse = await x8tAsync(
      this.courseService.deleteCourseById(id)
    );

    if (deletedCourse.error)
      return CustomResponse.sendHandledError(res, deletedCourse.error);

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.DELETED,
        details: "Deleted a course",
        entity: schemaName.COURSE,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Course deleted successfully",
      data: deletedCourse.result,
    });
  };
}
