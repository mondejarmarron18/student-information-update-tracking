import yearLevelModel, { YearLevel } from "../yearLevelModel";
import {
  creatorProfile,
  studentsCount,
  updaterProfile,
} from "./yearLevelPipelines";

export default class YearLevelRepository {
  private yearLevelModel: typeof yearLevelModel;

  constructor() {
    this.yearLevelModel = yearLevelModel;
  }

  getYearLevels = () => {
    return this.yearLevelModel.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
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

  getYearLevelById = async (id: YearLevel["_id"]) => {
    const yearLevel = await this.yearLevelModel.aggregate([
      {
        $match: {
          _id: id,
          deletedAt: null,
        },
      },
      ...updaterProfile,
      ...creatorProfile,
      {
        $limit: 1,
      },
    ]);

    return yearLevel.length > 0 ? yearLevel[0] : null;
  };

  createYearLevel = (
    params: Pick<YearLevel, "name" | "description" | "creatorId">
  ) => {
    return this.yearLevelModel.create({
      creatorId: params.creatorId,
      updaterId: params.creatorId,
      name: params.name,
      description: params.description,
    });
  };

  updateYearLevel = (
    id: YearLevel["_id"],
    params: Pick<YearLevel, "name" | "description" | "updaterId">
  ) => {
    return this.yearLevelModel.findByIdAndUpdate(id, {
      $set: {
        updaterId: params.updaterId,
        name: params.name,
        description: params.description,
      },
    });
  };

  deleteYearLevelById = (id: YearLevel["_id"]) => {
    return this.yearLevelModel.findByIdAndDelete(id);
  };
}
