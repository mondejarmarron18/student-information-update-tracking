import courseModel, { ICourse } from "../courseModel";

export default class CourseRepository {
  private courseModel: typeof courseModel;

  constructor() {
    this.courseModel = courseModel;
  }

  getCourses = async () => {
    return await this.courseModel.find().lean();
  };

  getCourseById = async (id: ICourse["_id"]) => {
    return await this.courseModel.findById(id).lean();
  };

  createCourse = async (params: Pick<ICourse, "name" | "description">) => {
    return await this.courseModel.create({
      name: params.name,
      description: params.description,
    });
  };

  isCourseIdExists = async (id: ICourse["_id"]) => {
    return await this.courseModel.exists({ _id: id });
  };

  isCourseNameExists = async (name: ICourse["name"]) => {
    return await this.courseModel.exists({ name });
  };

  updateCourse = async (
    id: ICourse["_id"],
    params: Pick<ICourse, "name" | "description">
  ) => {
    return await this.courseModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            name: params.name,
            description: params.description,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .lean();
  };

  deleteCourse = async (id: ICourse["_id"]) => {
    return await this.courseModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            deletedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .lean();
  };
}
