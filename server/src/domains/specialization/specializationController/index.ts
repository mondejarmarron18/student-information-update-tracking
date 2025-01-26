import { x8tAsync } from "x8t";
import { IControllerFunction } from "../../../types/controller";
import SpecializationService from "../specializationService";
import CustomResponse from "../../../utils/CustomResponse";
import { convertToObjectId } from "../../../utils/mongooseUtil";
import customErrors from "../../../constants/customErrors";
import { ISpecialization } from "../specializationModel";

export default class SpecializationController {
  private specializationService: SpecializationService;

  constructor() {
    this.specializationService = new SpecializationService();
  }

  createSpecialization: IControllerFunction = async (req, res) => {
    const { id: courseId } = convertToObjectId(req.body.courseId);
    const userId = req.user?._id;

    if (!userId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    if (!courseId) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    const { result, error } = await x8tAsync(
      this.specializationService.createSpecialization({
        ...req.body,
        courseId,
        creatorId: userId,
      }),
      {
        log: true,
      }
    );

    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      status: 201,
      data: result,
      message: "Specialization created successfully",
    });
  };

  getSpecializations: IControllerFunction = async (req, res) => {
    const filter: Partial<ISpecialization> = req.query;

    if (filter.courseId) {
      const { id } = convertToObjectId(`${filter.courseId}`);

      filter.courseId = id || undefined;
    }

    const { result, error } = await x8tAsync(
      this.specializationService.getSpecializations(filter)
    );

    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      data: result,
      message: "Specializations retrieved successfully",
    });
  };

  getSpecializationsByCourseId: IControllerFunction = async (req, res) => {
    const { id, error: idError } = convertToObjectId(
      req.params.specializationId
    );

    if (idError || !id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid course ID",
      });
    }

    const { result, error } = await x8tAsync(
      this.specializationService.getSpecializationsByCourseId(id)
    );
    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      data: result,
      message: "Specializations retrieved successfully",
    });
  };

  getSpecializationById: IControllerFunction = async (req, res) => {
    const { id, error: idError } = convertToObjectId(
      req.params.specializationId
    );

    if (idError || !id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid specialization ID",
      });
    }

    const { result, error } = await x8tAsync(
      this.specializationService.getSpecializationById(id),
      {
        log: true,
      }
    );

    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      data: result,
      message: "Specialization retrieved successfully",
    });
  };

  updateSpecialization: IControllerFunction = async (req, res) => {
    const { id, error: idError } = convertToObjectId(req.params.id);
    const userId = req.user?._id;

    if (!userId) {
      return CustomResponse.sendHandledError(res, customErrors.unauthorized);
    }

    if (idError || !id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid specialization ID",
      });
    }

    const { result, error } = await x8tAsync(
      this.specializationService.updateSpecialization(id, {
        ...req.body,
        updaterId: userId,
      }),
      {
        log: true,
      }
    );

    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res, {
      status: 200,
      data: result,
      message: "Specialization updated successfully",
    });
  };

  deleteSpecialization: IControllerFunction = async (req, res) => {
    const { id, error: idError } = convertToObjectId(req.params.id);

    if (idError || !id) {
      return CustomResponse.sendHandledError(res, {
        ...customErrors.badRequest,
        description: "Invalid specialization ID",
      });
    }

    const { result, error } = await x8tAsync(
      this.specializationService.deleteSpecialization(id)
    );

    if (error || !result) return CustomResponse.sendHandledError(res, error);

    CustomResponse.sendSuccess(res);
  };
}
