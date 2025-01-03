import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import AcadProfileService from "../acadProfileService";
import CustomError from "../../../utils/CustomError";
import CustomResponse from "../../../utils/CustomResponse";
import customErrors from "../../../constants/customErrors";

export default class AcadProfileController {
  acadProfileService: AcadProfileService;

  constructor() {
    this.acadProfileService = new AcadProfileService();
  }

  createAcadProfile: IControllerFunction = async (req, res) => {
    const acadProfile = await x8tAsync(
      this.acadProfileService.createAcadProfile(req.body)
    );

    if (acadProfile.error) {
      return CustomResponse.sendError(res, acadProfile.error);
    }

    CustomResponse.sendSuccess(res, {
      status: 201,
      message: "Academic profile created successfully",
      data: acadProfile.result,
    });
  };
}
