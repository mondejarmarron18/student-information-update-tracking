import CustomError from "../../../utils/CustomError";
import AcadProfileRepository from "../../acadProfile/acadProfileRepository";
import { YearLevel } from "../yearLevelModel";
import YearLevelRepository from "../yearLevelRepository";

export default class YearLevelService {
  private yearLevelRepository: YearLevelRepository;
  private acadProfileRepository: AcadProfileRepository;

  constructor() {
    this.yearLevelRepository = new YearLevelRepository();
    this.acadProfileRepository = new AcadProfileRepository();
  }

  createYearLevel = (
    params: Pick<YearLevel, "name" | "description" | "creatorId">
  ) => {
    return this.yearLevelRepository.createYearLevel(params);
  };

  getYearLevels = () => {
    return this.yearLevelRepository.getYearLevels();
  };

  getYearLevelById = (id: YearLevel["_id"]) => {
    return this.yearLevelRepository.getYearLevelById(id);
  };

  updateYearLevel = (
    id: YearLevel["_id"],
    params: Pick<YearLevel, "name" | "description" | "updaterId">
  ) => {
    return this.yearLevelRepository.updateYearLevel(id, params);
  };

  deleteYearLevelById = async (id: YearLevel["_id"]) => {
    const hasStudents = await this.acadProfileRepository.isYearLevelIdsExists([
      id,
    ]);

    if (hasStudents) {
      return CustomError.forbidden({
        description:
          "Year level has students, assign them to another year level first",
      });
    }

    return this.yearLevelRepository.deleteYearLevelById(id);
  };
}
