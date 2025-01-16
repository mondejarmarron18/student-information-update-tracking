import mongoose, { mongo, Types } from "mongoose";
import AcadProfileModel, { IAcadProfile } from "../acadProfileModel";

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

  getAcadProfileByUserId = (userId: IAcadProfile["userId"]) => {
    return this.acadProfileModel.findOne({
      userId,
      deletedAt: null,
    });
  };

  getAcadProfileById = (id: IAcadProfile["_id"]) => {
    return this.acadProfileModel.findById(id);
  };

  isAcadProfileIdExists = (id: IAcadProfile["_id"]) => {
    return this.acadProfileModel.exists({ _id: id });
  };

  isAcadProfileUserIdExists = (userId: IAcadProfile["userId"]) => {
    return this.acadProfileModel.exists({ userId });
  };

  isAcadProfileLrnExists = (lrn: IAcadProfile["learnerReferenceNumber"]) => {
    return this.acadProfileModel.exists({ learnerReferenceNumber: lrn });
  };

  updateAcadProfileByUserId = (
    params: Omit<IAcadProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel.findOneAndUpdate(
      {
        userId: params.userId,
        deletedAt: null,
      },
      {
        $set: {
          learnerReferenceNumber: params.learnerReferenceNumber,
          yearLevel: params.yearLevel,
          course: params.course,
          specialization: params.specialization,
          guardians: params.guardians,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      }
    );
  };

  updateAcadProfile = (
    params: Omit<IAcadProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel.findByIdAndUpdate(
      {
        _id: params._id,
        deletedAt: null,
      },
      {
        $set: {
          learnerReferenceNumber: params.learnerReferenceNumber,
          yearLevel: params.yearLevel,
          course: params.course,
          specialization: params.specialization,
          guardians: params.guardians,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
      }
    );
  };

  deleteAcadProfile = (id: IAcadProfile["_id"]) => {
    return this.acadProfileModel.findByIdAndUpdate(
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
    );
  };
}
