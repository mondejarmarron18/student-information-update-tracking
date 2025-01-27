import { PipelineStage } from "mongoose";

export const yearLevel: PipelineStage[] = [
  {
    $lookup: {
      from: "yearlevels",
      localField: "yearLevelId",
      foreignField: "_id",
      as: "yearLevel",
    },
  },
  {
    $unwind: {
      path: "$yearLevel",
      preserveNullAndEmptyArrays: true,
    },
  },
];

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

export const specialization: PipelineStage[] = [
  {
    $lookup: {
      from: "specializations",
      localField: "specializationId",
      foreignField: "_id",
      as: "specialization",
    },
  },
  {
    $unwind: {
      path: "$specialization",
      preserveNullAndEmptyArrays: true,
    },
  },
];
