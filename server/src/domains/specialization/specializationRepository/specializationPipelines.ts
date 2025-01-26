import { PipelineStage } from "mongoose";

export const course: PipelineStage[] = [
  {
    $lookup: {
      from: "courses",
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
      from: "userprofiles",
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
      from: "userprofiles",
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
      from: "acadprofiles",
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
