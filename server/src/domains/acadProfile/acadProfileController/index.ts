import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import AcadProfileService from "../acadProfileService";
import CustomResponse from "../../../utils/CustomResponse";

export default class AcadProfileController {
  private acadProfileService: AcadProfileService;

  constructor() {
    this.acadProfileService = new AcadProfileService();
  }

  createAcadProfile: IControllerFunction = async (req, res) => {
    const acadProfile = await x8tAsync(
      this.acadProfileService.createAcadProfile(req.body)
    );

    if (acadProfile.error) {
      return CustomResponse.sendHandledError(res, acadProfile.error);
    }

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
}
