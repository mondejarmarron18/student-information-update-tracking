import { x8tAsync } from "x8t";
import CustomError from "../../../utils/CustomError";
import { ICourse } from "../courseModel";
import CourseRepository from "../courseRepository";

export default class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  getCourses = async () => {
    return await this.courseRepository.getCourses();
  };

  getCourseById = async (id: ICourse["_id"]) => {
    return await this.courseRepository.getCourseById(id);
  };

  createCourse = async (
    params: Pick<ICourse, "name" | "description" | "details">
  ) => {
    return this.courseRepository.createCourse(params);
  };

  updateCourse = async (
    id: ICourse["_id"],
    params: Pick<ICourse, "name" | "description" | "details">
  ) => {
    const isCourseExist = await this.isCourseIdExists(id);

    if (isCourseExist) {
      return CustomError.notFound({
        description: "Course not found",
      });
    }

    return this.courseRepository.updateCourse(id, params);
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
