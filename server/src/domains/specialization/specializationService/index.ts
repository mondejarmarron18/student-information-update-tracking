import { x8tAsync } from "x8t";
import CustomError from "../../../utils/CustomError";
import CourseService from "../../course/courseService";
import { ISpecialization } from "../specializationModel";
import SpecializationRepository from "../specializationRepository";
import { convertToObjectId } from "../../../utils/mongooseUtil";

export default class SpecializationService {
  private specializationRepository: SpecializationRepository;
  private courseService: CourseService;

  constructor() {
    this.specializationRepository = new SpecializationRepository();
    this.courseService = new CourseService();
  }

  createSpecialization = async (
    params: Pick<
      ISpecialization,
      "creatorId" | "courseId" | "name" | "description" | "details"
    >
  ) => {
    const isCourseIdExists = await this.courseService.isCourseIdExists(
      params.courseId
    );

    if (!isCourseIdExists) {
      return CustomError.badRequest({
        description: "Invalid course",
      });
    }

    const isSpecializationExists =
      await this.specializationRepository.isSpecializationNameAndCourseIdExists(
        {
          name: params.name,
          courseId: params.courseId,
        }
      );

    if (isSpecializationExists) {
      return CustomError.alreadyExists({
        description: "Specialization name under this course already exists",
      });
    }

    return this.specializationRepository.createSpecialization(params);
  };

  getSpecializations = async (filter: Partial<ISpecialization>) => {
    return await this.specializationRepository.getSpecializations(filter);
  };

  getSpecializationsByCourseId = async (
    courseId: ISpecialization["courseId"]
  ) => {
    const specializations = await x8tAsync(
      this.specializationRepository.getSpecializationsByCourseId(courseId)
    );

    if (specializations.error) {
      return CustomError.internalServerError({
        description: "Failed to get specializations",
      });
    }

    return specializations.result;
  };

  getSpecializationById = (id: ISpecialization["_id"]) => {
    return this.specializationRepository.getSpecializationById(id);
  };

  getSpecializationByName = (name: ISpecialization["name"]) => {
    return this.specializationRepository.getSpecializationByName(name);
  };

  isSpecializationExists = (id: ISpecialization["_id"]) => {
    return this.specializationRepository.isSpecializationExists(id);
  };

  updateSpecialization = async (
    id: ISpecialization["_id"],
    params: Pick<
      ISpecialization,
      "updaterId" | "name" | "description" | "details" | "courseId"
    >
  ) => {
    const specialization =
      await this.specializationRepository.updateSpecialization(id, params);

    if (!specialization) {
      return CustomError.notFound({
        description: "Specialization not found",
      });
    }

    return specialization;
  };

  deleteSpecialization = (id: ISpecialization["_id"]) => {
    return this.specializationRepository.deleteSpecialization(id);
  };

  deleteHardSpecialization = (id: ISpecialization["_id"]) => {
    return this.specializationRepository.deleteSpecialization(id);
  };
}
