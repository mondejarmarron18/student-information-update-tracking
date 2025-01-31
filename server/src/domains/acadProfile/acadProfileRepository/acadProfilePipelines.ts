import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const yearLevel: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.YEAR_LEVEL,
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

export const specialization: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.SPECIALIZATION,
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
