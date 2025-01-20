import { x8tAsync } from "x8t";
import YearLevelRepository from "../yearLevelRepository";
import CustomError from "../../../utils/CustomError";
import { IYearLevel } from "../yearLevelModel";

export default class YearLevelService {
  yearLevelRepository: YearLevelRepository;

  constructor() {
    this.yearLevelRepository = new YearLevelRepository();
  }

  getYearLevels = async () => {
    const { error, result } = await x8tAsync(
      this.yearLevelRepository.getYearLevels()
    );

    if (error) CustomError.internalServerError({ details: error });

    return result;
  };

  createYearLevel = async (
    params: Pick<IYearLevel, "name" | "description">
  ) => {
    const { error, result } = await x8tAsync(
      this.yearLevelRepository.createYearLevel(params)
    );

    if (error || !result)
      CustomError.internalServerError({
        description: "Error creating year level",
        details: error,
      });

    return result;
  };
}
