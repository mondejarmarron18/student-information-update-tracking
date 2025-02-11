import { x8tAsync } from "x8t";
import CustomError from "../../../utils/CustomError";
import { ICourse } from "../courseModel";
import CourseRepository from "../courseRepository";
import UserService from "../../user/userService";
import AcadProfileRepository from "../../acadProfile/acadProfileRepository";
import SpecializationRepository from "../../specialization/specializationRepository";

export default class CourseService {
  private courseRepository: CourseRepository;
  private userService: UserService;
  private acadProfileRepository: AcadProfileRepository;
  private specializationRepository: SpecializationRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
    this.userService = new UserService();
    this.acadProfileRepository = new AcadProfileRepository();
    this.specializationRepository = new SpecializationRepository();
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

    if (!isCourseExist) {
      return CustomError.notFound({
        description: "Course not found",
      });
    }

    return this.courseRepository.updateCourse(id, {
      ...params,
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

  isCourseNameExists = async (name: ICourse["name"]) => {
    const isCourseExist = await x8tAsync(
      this.courseRepository.isCourseNameExists(name)
    );

    if (isCourseExist.error) {
      return CustomError.internalServerError({
        details: isCourseExist.error,
      });
    }

    return !!isCourseExist.result;
  };

  deleteCourseById = async (id: ICourse["_id"]) => {
    const hasStudents = await this.acadProfileRepository.isCourseIdsExists([
      id,
    ]);

    if (hasStudents) {
      return CustomError.forbidden({
        description: "Course has students, assign them to another course",
      });
    }

    const hasSpecializations =
      await this.specializationRepository.isCourseIdsExists([id]);

    if (hasSpecializations) {
      return CustomError.forbidden({
        description: "Course has specializations, delete specializations first",
      });
    }

    return await this.courseRepository.deleteCourseById(id);
  };
}
