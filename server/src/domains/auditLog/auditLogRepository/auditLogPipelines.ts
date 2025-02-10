import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const userAccount: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER,
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $unwind: {
      path: "$user",
      preserveNullAndEmptyArrays: true,
    },
  },
];
