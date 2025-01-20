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
    params: Pick<ICourse, "name" | "description" | "specializationIds">
  ) => {
    const isCourseNameExist = await this.courseRepository.isCourseNameExists(
      params.name
    );

    if (isCourseNameExist) {
      return CustomError.badRequest({
        description: "Course name already exists",
      });
    }

    // TODO: Validate the specialization ids if they are valid

    return await this.courseRepository.createCourse(params);
  };
}
