import courseModel, { ICourse } from "../courseModel";

export default class CourseRepository {
  private courseModel: typeof courseModel;

  constructor() {
    this.courseModel = courseModel;
  }

  getCourses = () => {
    return this.courseModel.aggregate([
      {
        $lookup: {
          from: "userprofiles",
          localField: "creatorId",
          foreignField: "userId",
          as: "creator",
        },
      },
      {
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "userprofiles",
          localField: "updaterId",
          foreignField: "userId",
          as: "updater",
        },
      },
      {
        $unwind: {
          path: "$creator",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  };

  getCourseById = (id: ICourse["_id"]) => {
    return this.courseModel
      .findById({ _id: id })
      .populate("creatorId", "userId")
      .populate("updaterId", "userId");
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
    return this.courseModel.exists({ _id: id });
  };

  isCourseNameExists = (name: ICourse["name"]) => {
    return this.courseModel.exists({ name });
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
            updatedById: params.updaterId,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .populate("creatorId")
      .populate("updaterId")
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
