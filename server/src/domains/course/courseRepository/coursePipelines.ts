import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const specializationsCount: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.SPECIALIZATION,
      let: { courseId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$courseId", "$$courseId"],
            },
          },
        },
        {
          $count: "count",
        },
      ],
      as: "specializationsCount",
    },
  },
  {
    $addFields: {
      specializationsCount: {
        $ifNull: [{ $arrayElemAt: ["$specializationsCount.count", 0] }, 0],
      },
    },
  },
];

export const updaterProfile: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER_PROFILE,
      localField: "creatorId",
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
      let: { courseId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$courseId", "$$courseId"],
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
