import { x8tAsync } from "x8t";
import customErrors from "../../../constants/customErrors";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";
import YearLevelService from "../yearLevelService";
import { convertToObjectId } from "../../../utils/mongooseUtil";

export default class YearLevelController {
  private yearLevelService: YearLevelService;
  constructor() {
    this.yearLevelService = new YearLevelService();
  }

  createYearLevel: IControllerFunction = async (req, res) => {
    const creatorId = req.user?._id;

    if (!creatorId) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const { name, description } = req.body;

    const yearLevel = await x8tAsync(
      this.yearLevelService.createYearLevel({
        name,
        description,
        creatorId,
      })
    );

    if (yearLevel.error)
      return CustomResponse.sendHandledError(res, yearLevel.error);

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Year level created successfully",
      data: yearLevel.result,
    });
  };

  getYearLevels: IControllerFunction = async (req, res) => {
    const yearLevels = await x8tAsync(this.yearLevelService.getYearLevels());

    if (yearLevels.error)
      return CustomResponse.sendHandledError(res, yearLevels.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Year levels retrieved successfully",
      data: yearLevels.result,
    });
  };

  getYearLevelById: IControllerFunction = async (req, res) => {
    const { yearLevelId } = req.params;

    const { id } = convertToObjectId(yearLevelId);

    if (!id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        description: "Invalid year level ID",
      });
    }

    const yearLevel = await x8tAsync(
      this.yearLevelService.getYearLevelById(id)
    );

    if (yearLevel.error)
      return CustomResponse.sendHandledError(res, yearLevel.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Year level retrieved successfully",
      data: yearLevel.result,
    });
  };

  updateYearLevel: IControllerFunction = async (req, res) => {
    const { yearLevelId } = req.params;
    const updaterId = req.user?._id;

    if (!updaterId) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const { id } = convertToObjectId(yearLevelId);

    if (!id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        description: "Invalid year level ID",
      });
    }

    const { name, description } = req.body;

    const yearLevel = await x8tAsync(
      this.yearLevelService.updateYearLevel(id, {
        name,
        description,
        updaterId,
      })
    );

    if (yearLevel.error)
      return CustomResponse.sendHandledError(res, yearLevel.error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Year level updated successfully",
      data: yearLevel.result,
    });
  };
}
