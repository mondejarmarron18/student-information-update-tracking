import { Request, Response } from "express";
import CustomResponse from "../../../utils/CustomResponse";
import YearLevelService from "../yearLevelService";
import { x8tAsync } from "x8t";
import { IYearLevel } from "../yearLevelModel";

export default class YearLevelController {
  yearLevelService: YearLevelService;

  constructor() {
    this.yearLevelService = new YearLevelService();
  }

  getYearLevels = async (req: Request, res: Response) => {
    const yearLevels = await x8tAsync(this.yearLevelService.getYearLevels());

    if (yearLevels.error)
      return CustomResponse.sendHandledError(res, yearLevels.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Year levels retrieved successfully",
      data: yearLevels.result,
    });
  };

  createYearLevel = async (req: Request, res: Response) => {
    const yearLevel = await x8tAsync(
      this.yearLevelService.createYearLevel(req.body)
    );

    if (yearLevel.error)
      return CustomResponse.sendHandledError(res, yearLevel.error);

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Year level created successfully",
      data: yearLevel,
    });
  };
}
