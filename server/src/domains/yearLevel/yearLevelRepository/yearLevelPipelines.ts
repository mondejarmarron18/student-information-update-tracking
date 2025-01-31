import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const updaterProfile: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER_PROFILE,
      localField: "updaterId",
      foreignField: "userId",
      as: "updaterProfile",
    },
  },
  {
    $unwind: {
      path: "$updaterProfile",
      preserveNullAndEmptyArrays: true,
    },
  },
];

export const creatorProfile: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER_PROFILE,
      localField: "creatorId",
      foreignField: "userId",
      as: "creatorProfile",
    },
  },
  {
    $unwind: {
      path: "$creatorProfile",
      preserveNullAndEmptyArrays: true,
    },
  },
];

export const studentsCount: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.ACAD_PROFILE,
      let: { yearLevelId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$yearLevelId", "$$yearLevelId"],
            },
          },
        },
        {
          $count: "count",
        },
      ],
      as: "studentsCount",
    },
  },
  {
    $addFields: {
      studentsCount: {
        $ifNull: [{ $arrayElemAt: ["$studentsCount.count", 0] }, 0],
      },
    },
  },
];
