import CustomError from "../../../utils/CustomError";
import courseModel, { ICourse } from "../courseModel";
import {
  creatorProfile,
  specializationsCount,
  studentsCount,
  updaterProfile,
} from "./coursePipelines";

export default class CourseRepository {
  private courseModel: typeof courseModel;

  constructor() {
    this.courseModel = courseModel;
  }

  getCourses = () => {
    return this.courseModel.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      ...creatorProfile,
      ...updaterProfile,
      ...specializationsCount,
      ...studentsCount,
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]);
  };

  getCourseById = async (id: ICourse["_id"]) => {
    const course = await this.courseModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      ...updaterProfile,
      ...creatorProfile,
      ...specializationsCount,
      {
        $limit: 1,
      },
    ]);

    return course.length > 0 ? course[0] : CustomError.notFound();
  };

  createCourse = (
    params: Pick<ICourse, "creatorId" | "name" | "description" | "details">
  ) => {
    return this.courseModel.create({
      creatorId: params.creatorId,
      updaterId: params.creatorId,
      name: params.name,
      description: params.description,
      details: params.details,
    });
  };

  isCourseIdExists = (id: ICourse["_id"]) => {
    return this.courseModel.exists({ _id: id, deletedAt: null });
  };

  isCourseNameExists = (name: ICourse["name"]) => {
    return this.courseModel.exists({ name, deletedAt: null });
  };

  updateCourse = (
    id: ICourse["_id"],
    params: Pick<ICourse, "updaterId" | "name" | "description" | "details">
  ) => {
    return this.courseModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            name: params.name,
            description: params.description,
            details: params.details,
            updaterId: params.updaterId,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .lean();
  };

  deleteCourse = (id: ICourse["_id"]) => {
    return this.courseModel
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
