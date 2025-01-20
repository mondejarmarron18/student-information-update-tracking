import YearLevelModel, { IYearLevel } from "../yearLevelModel";

export default class YearLevelRepository {
  yearLevelModel: typeof YearLevelModel;

  constructor() {
    this.yearLevelModel = YearLevelModel;
  }

  getYearLevels = () => {
    return this.yearLevelModel.find().lean();
  };

  createYearLevel = (params: Pick<IYearLevel, "name" | "description">) => {
    return this.yearLevelModel.create({
      name: params.name,
      description: params.description,
    });
  };

  deleteYearLevel = (id: IYearLevel["_id"]) => {
    return this.yearLevelModel.findByIdAndUpdate(id, {
      $set: {
        deletedAt: new Date(),
      },
    });
  };

  updateYearLevel = (
    id: IYearLevel["_id"],
    params: Pick<IYearLevel, "name" | "description">
  ) => {
    return this.yearLevelModel.findByIdAndUpdate(id, {
      $set: {
        name: params.name,
        description: params.description,
        updatedAt: new Date(),
      },
    });
  };
}
