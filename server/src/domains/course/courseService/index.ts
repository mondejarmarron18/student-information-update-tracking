import { x8tAsync } from "x8t";
import CustomError from "../../../utils/CustomError";
import { ICourse } from "../courseModel";
import CourseRepository from "../courseRepository";
import UserService from "../../user/userService";

export default class CourseService {
  private courseRepository: CourseRepository;
  private userService: UserService;

  constructor() {
    this.courseRepository = new CourseRepository();
    this.userService = new UserService();
  }

  getCourses = async () => {
    return await this.courseRepository.getCourses();
  };

  getCourseById = async (id: ICourse["_id"]) => {
    return await this.courseRepository.getCourseById(id);
  };

  createCourse = async (
    params: Pick<ICourse, "creatorId" | "name" | "description" | "details">
  ) => {
    const isCreatorExist = await this.userService.isUserIdExists(
      params.creatorId
    );

    if (!isCreatorExist) {
      return CustomError.forbidden();
    }

    return this.courseRepository.createCourse({
      ...params,
      creatorId: params.creatorId,
    });
  };

  updateCourse = async (
    id: ICourse["_id"],
    params: Pick<ICourse, "updaterId" | "name" | "description" | "details">
  ) => {
    const isCourseExist = await this.isCourseIdExists(id);

    if (isCourseExist) {
      return CustomError.notFound({
        description: "Course not found",
      });
    }

    const isUpdaterExist = await this.userService.isUserIdExists(
      params.updaterId
    );

    if (!isUpdaterExist) {
      return CustomError.forbidden();
    }

    return this.courseRepository.updateCourse(id, {
      ...params,
      updaterId: params.updaterId,
    });
  };

  isCourseIdExists = async (id: ICourse["_id"]) => {
    const isCourseExist = await x8tAsync(
      this.courseRepository.isCourseIdExists(id)
    );

    if (isCourseExist.error) {
      return CustomError.internalServerError({
        details: isCourseExist.error,
      });
    }

    return !!isCourseExist.result;
  };
}
