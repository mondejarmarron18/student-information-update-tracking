import { YearLevel } from "../yearLevelModel";
import yearLevelRepository from "../yearLevelRepository";

export default class YearLevelService {
  private yearLevelRepository: yearLevelRepository;

  constructor() {
    this.yearLevelRepository = new yearLevelRepository();
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
}
