import AcadProfileModel, { IAcadProfile } from "../acadProfileModel";

export default class AcadProfileRepository {
  acadProfileModel: typeof AcadProfileModel;

  constructor() {
    this.acadProfileModel = AcadProfileModel;
  }

  createAcadProfile = (
    params: Omit<IAcadProfile, "_id" | "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel.create(params);
  };

  getAcadProfiles = () => {
    return this.acadProfileModel.find({
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

  updateAcadProfile = (
    params: Omit<IAcadProfile, "createdAt" | "updatedAt" | "deletedAt">
  ) => {
    return this.acadProfileModel.findByIdAndUpdate(
      {
        _id: params._id,
      },
      {
        $set: params,
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
