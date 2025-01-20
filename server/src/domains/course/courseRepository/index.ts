import courseModel, { ICourse } from "../courseModel";

export default class CourseRepository {
  private courseModel: typeof courseModel;

  constructor() {
    this.courseModel = courseModel;
  }

  getCourses = async () => {
    return await this.courseModel.find();
  };

  getCourseById = async (id: ICourse["_id"]) => {
    return await this.courseModel.findById(id);
  };

  createCourse = async (
    params: Pick<ICourse, "name" | "description" | "specializationIds">
  ) => {
    return await this.courseModel.create({
      name: params.name,
      description: params.description,
      specializationIds: params.specializationIds,
    });
  };

  isCourseExists = async (id: ICourse["_id"]) => {
    return await this.courseModel.exists({ _id: id });
  };

  isCourseNameExists = async (name: ICourse["name"]) => {
    return await this.courseModel.exists({ name });
  };

  updateCourse = async (
    id: ICourse["_id"],
    params: Pick<ICourse, "name" | "description" | "specializationIds">
  ) => {
    return await this.courseModel.findByIdAndUpdate(id, {
      $set: {
        name: params.name,
        description: params.description,
        specializationIds: params.specializationIds,
        updatedAt: new Date(),
      },
    });
  };

  deleteCourse = async (id: ICourse["_id"]) => {
    return await this.courseModel.findByIdAndUpdate(id, {
      $set: {
        deletedAt: new Date(),
      },
    });
  };
}
