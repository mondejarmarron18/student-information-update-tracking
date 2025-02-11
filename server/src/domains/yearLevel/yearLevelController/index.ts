import { x8tAsync } from "x8t";
import customErrors from "../../../constants/customErrors";
import { IControllerFunction } from "../../../types/controller";
import CustomResponse from "../../../utils/CustomResponse";
import YearLevelService from "../yearLevelService";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import AuditLogService from "../../auditLog/auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { schemaName } from "../../../constants/schemaName";

export default class YearLevelController {
  private yearLevelService: YearLevelService;
  private auditLogService: AuditLogService;

  constructor() {
    this.yearLevelService = new YearLevelService();
    this.auditLogService = new AuditLogService();
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

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.CREATED,
        details: "Created a new year level",
        entity: schemaName.YEAR_LEVEL,
      }),
      {
        log: true,
      }
    );

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

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.UPDATED,
        details: "Updated a year level",
        entity: schemaName.YEAR_LEVEL,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Year level updated successfully",
      data: yearLevel.result,
    });
  };

  deleteYearLevelById: IControllerFunction = async (req, res) => {
    const { yearLevelId } = req.params;
    const deleterId = req.user?._id;

    if (!deleterId) {
      return CustomResponse.sendError(res, customErrors.unauthorized);
    }

    const { id } = convertToObjectId(yearLevelId);

    if (!id) {
      return CustomResponse.sendError(res, {
        ...customErrors.badRequest,
        description: "Invalid year level ID",
      });
    }

    const yearLevel = await x8tAsync(
      this.yearLevelService.deleteYearLevelById(id)
    );

    if (yearLevel.error)
      return CustomResponse.sendHandledError(res, yearLevel.error);

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.DELETED,
        details: "Deleted a year level",
        entity: schemaName.YEAR_LEVEL,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Year level deleted successfully",
      data: yearLevel.result,
    });
  };
}
