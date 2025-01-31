import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const course: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.COURSE,
      localField: "courseId",
      foreignField: "_id",
      as: "course",
    },
  },
  {
    $unwind: {
      path: "$course",
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

export const studentsCount: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.ACAD_PROFILE,
      let: { specializationId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$specializationId", "$$specializationId"],
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
