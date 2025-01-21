import SpecializationModel, { ISpecialization } from "../specializationModel";

export default class SpecializationRepository {
  private specializationModel: typeof SpecializationModel;

  constructor() {
    this.specializationModel = SpecializationModel;
  }

  createSpecialization = (
    params: Pick<
      ISpecialization,
      "courseId" | "name" | "description" | "details"
    >
  ) => {
    return this.specializationModel.create({
      courseId: params.courseId,
      name: params.name,
      description: params.description,
      details: params.details,
    });
  };

  getSpecializations = async () => {
    return await this.specializationModel.find().lean();
  };

  getSpecializationsByCourseId = async (
    courseId: ISpecialization["courseId"]
  ) => {
    return await this.specializationModel.find({ courseId }).lean();
  };

  getSpecializationById = async (id: ISpecialization["_id"]) => {
    return await this.specializationModel.findById(id).lean();
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

  updateSpecialization = (
    id: ISpecialization["_id"],
    params: Pick<ISpecialization, "name" | "description" | "details">
  ) => {
    return this.specializationModel.updateOne(
      { _id: id },
      {
        $set: {
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
