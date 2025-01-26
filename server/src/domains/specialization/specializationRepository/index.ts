import SpecializationModel, { ISpecialization } from "../specializationModel";
import {
  course,
  creatorProfile,
  studentsCount,
  updaterProfile,
} from "./specializationPipelines";

export default class SpecializationRepository {
  private specializationModel: typeof SpecializationModel;

  constructor() {
    this.specializationModel = SpecializationModel;
  }

  createSpecialization = (
    params: Pick<
      ISpecialization,
      "creatorId" | "courseId" | "name" | "description" | "details"
    >
  ) => {
    return this.specializationModel.create({
      creatorId: params.creatorId,
      updaterId: params.creatorId,
      courseId: params.courseId,
      name: params.name,
      description: params.description,
      details: params.details,
    });
  };

  getSpecializations = async (filter: Partial<ISpecialization>) => {
    return await this.specializationModel.aggregate([
      {
        $match: {
          deletedAt: null,
          ...filter,
        },
      },
      ...course,
      ...creatorProfile,
      ...updaterProfile,
      ...studentsCount,
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]);
  };

  getSpecializationsByCourseId = async (
    courseId: ISpecialization["courseId"]
  ) => {
    return await this.specializationModel.find({ courseId }).lean();
  };

  getSpecializationById = async (id: ISpecialization["_id"]) => {
    const specialization = await this.specializationModel.aggregate([
      {
        $match: {
          _id: id,
          deletedAt: null,
        },
      },
      ...course,
      ...creatorProfile,
      ...updaterProfile,
      ...studentsCount,
      {
        $limit: 1,
      },
    ]);

    return specialization.length > 0 ? specialization[0] : null;
  };

  getSpecializationByName = async (name: ISpecialization["name"]) => {
    return await this.specializationModel.findOne({ name }).lean();
  };

  isSpecializationExists = async (id: ISpecialization["_id"]) => {
    return await this.specializationModel.exists({ _id: id });
  };

  isSpecializationNameExists = async (name: ISpecialization["name"]) => {
    return await this.specializationModel.exists({ name });
  };

  isSpecializationNameAndCourseIdExists = async (
    params: Pick<ISpecialization, "name" | "courseId">
  ) => {
    return await this.specializationModel.exists({
      courseId: params.courseId,
      name: params.name,
    });
  };

  updateSpecialization = (
    id: ISpecialization["_id"],
    params: Pick<
      ISpecialization,
      "updaterId" | "name" | "description" | "details" | "courseId"
    >
  ) => {
    return this.specializationModel.updateOne(
      { _id: id },
      {
        $set: {
          updaterId: params.updaterId,
          courseId: params.courseId,
          name: params.name,
          description: params.description,
          details: params.details,
          updatedAt: new Date(),
        },
      }
    );
  };

  deleteSpecialization = (id: ISpecialization["_id"]) => {
    return this.specializationModel.updateOne(
      { _id: id },
      {
        $set: {
          deletedAt: new Date(),
        },
      }
    );
  };

  delateHardSpecialization = (id: ISpecialization["_id"]) => {
    return this.specializationModel.deleteOne({ _id: id });
  };
}
