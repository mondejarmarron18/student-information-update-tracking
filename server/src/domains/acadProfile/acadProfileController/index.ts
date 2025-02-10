import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import AcadProfileService from "../acadProfileService";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import AuditLogService from "../../auditLog/auditLogService";
import { auditLogAction } from "../../../constants/auditLog";
import { schemaName } from "../../../constants/schemaName";

export default class AcadProfileController {
  private acadProfileService: AcadProfileService;
  private auditLogService: AuditLogService;

  constructor() {
    this.acadProfileService = new AcadProfileService();
    this.auditLogService = new AuditLogService();
  }

  createAcadProfile: IControllerFunction = async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const acadProfile = await x8tAsync(
      this.acadProfileService.createAcadProfile({ ...req.body, userId })
    );

    if (acadProfile.error) {
      return CustomResponse.sendHandledError(res, acadProfile.error);
    }

    await x8tAsync(
      this.auditLogService.createAuditLog({
        ...req.auditLog!,
        userId: req.user?._id,
        action: auditLogAction.CREATED,
        details: "Created an academic profile",
        entity: schemaName.ACAD_PROFILE,
      }),
      {
        log: true,
      }
    );

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Academic profile created successfully",
      data: acadProfile.result,
    });
  };

  getAcadProfiles: IControllerFunction = async (req, res) => {
    const acadProfiles = await x8tAsync(
      this.acadProfileService.getAcadProfiles()
    );

    if (acadProfiles.error) {
      return CustomResponse.sendHandledError(res, acadProfiles.error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Academic profiles retrieved successfully",
      data: acadProfiles.result,
    });
  };

  getOwnAcadProfile: IControllerFunction = async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    const acadProfile = await x8tAsync(
      this.acadProfileService.getAcadProfileByUserId(userId)
    );

    if (acadProfile.error) {
      return CustomResponse.sendHandledError(res, acadProfile.error);
    }

    CustomResponse.sendSuccess(res, {
      status: 200,
      message: "Academic profile retrieved successfully",
      data: acadProfile.result,
    });
  };
}
