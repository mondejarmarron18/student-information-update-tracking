import mongoose, { mongo, Types } from "mongoose";
import AcadProfileModel, { IAcadProfile } from "../acadProfileModel";
import { course, specialization, yearLevel } from "./acadProfilePipelines";

export default class AcadProfileRepository {
  acadProfileModel: typeof AcadProfileModel;

  constructor() {
    this.acadProfileModel = AcadProfileModel;
  }

  createAcadProfile = (
    params: Omit<IAcadProfile, "_id" | "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel.create({
      ...params,
      updatedAt: new Date(),
    });
  };

  getAcadProfiles = () => {
    return this.acadProfileModel.find({
      deletedAt: null,
    });
  };

  getAcadProfileByUserId = async (userId: IAcadProfile["userId"]) => {
    const acadProfiles = await this.acadProfileModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          deletedAt: null,
        },
      },
      ...specialization,
      ...course,
      ...yearLevel,
      {
        $limit: 1,
      },
    ]);

    return acadProfiles.length > 0 ? acadProfiles[0] : null;
  };

  getAcadProfileById = (id: IAcadProfile["_id"]) => {
    return this.acadProfileModel.findById(id).lean();
  };

  isAcadProfileIdExists = (id: IAcadProfile["_id"]) => {
    return this.acadProfileModel.exists({ _id: id }).lean();
  };

  isAcadProfileUserIdExists = (userId: IAcadProfile["userId"]) => {
    return this.acadProfileModel.exists({ userId }).lean();
  };

  isAcadProfileLrnExists = (lrn: IAcadProfile["learnerReferenceNumber"]) => {
    return this.acadProfileModel.exists({ learnerReferenceNumber: lrn }).lean();
  };

  updateAcadProfileByUserId = (
    params: Omit<IAcadProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel
      .findOneAndUpdate(
        {
          userId: params.userId,
          deletedAt: null,
        },
        {
          $set: {
            learnerReferenceNumber: params.learnerReferenceNumber,
            yearLevelId: params.yearLevelId,
            courseId: params.courseId,
            specializationId: params.specializationId,
            guardians: params.guardians,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .lean();
  };

  updateAcadProfile = (
    params: Omit<IAcadProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel
      .findByIdAndUpdate(
        {
          _id: params._id,
          deletedAt: null,
        },
        {
          $set: {
            learnerReferenceNumber: params.learnerReferenceNumber,
            yearLevelId: params.yearLevelId,
            courseId: params.courseId,
            specializationId: params.specializationId,
            guardians: params.guardians,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .lean();
  };

  deleteAcadProfile = (id: IAcadProfile["_id"]) => {
    return this.acadProfileModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            deletedAt: new Date(),
          },
        },
        {
          new: true,
        }
      )
      .lean();
  };

  isCourseIdsExists = (courseIds: IAcadProfile["courseId"][]) => {
    return this.acadProfileModel
      .exists({ courseId: { $in: courseIds } })
      .lean();
  };

  isSpecializationIdsExists = (
    specializationIds: IAcadProfile["specializationId"][]
  ) => {
    return this.acadProfileModel
      .exists({ specializationId: { $in: specializationIds } })
      .lean();
  };

  isYearLevelIdsExists = (yearLevelIds: IAcadProfile["yearLevelId"][]) => {
    return this.acadProfileModel
      .exists({ yearLevelId: { $in: yearLevelIds } })
      .lean();
  };
}
