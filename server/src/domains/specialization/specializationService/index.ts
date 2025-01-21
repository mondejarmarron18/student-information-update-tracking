import { x8tAsync } from "x8t";
import CustomError from "../../../utils/CustomError";
import CourseService from "../../course/courseService";
import { ISpecialization } from "../specializationModel";
import SpecializationRepository from "../specializationRepository";

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
      "courseId" | "name" | "description" | "details"
    >
  ) => {
    const isCourseIdExists = await this.courseService.isCourseIdExists(
      params.courseId
    );

    if (!isCourseIdExists) {
      return CustomError.notFound({
        description: "Course not found",
      });
    }

    return this.specializationRepository.createSpecialization(params);
  };

  getSpecializations = async () => {
    return await this.specializationRepository.getSpecializations();
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
    params: Pick<ISpecialization, "name" | "description" | "details">
  ) => {
    const isSpecializationExist =
      await this.specializationRepository.isSpecializationExists(id);

    if (!isSpecializationExist) {
      return CustomError.notFound({
        description: "Specialization not found",
      });
    }

    return this.specializationRepository.updateSpecialization(id, params);
  };

  deleteSpecialization = (id: ISpecialization["_id"]) => {
    return this.specializationRepository.deleteSpecialization(id);
  };

  deleteHardSpecialization = (id: ISpecialization["_id"]) => {
    return this.specializationRepository.deleteSpecialization(id);
  };
}
