import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const requesterProfile: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER_PROFILE,
      localField: "requesterId",
      foreignField: "userId",
      as: "requesterProfile",
    },
  },
  {
    $unwind: {
      path: "$requesterProfile",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      requesterProfile: {
        firstName: "$requesterProfile.firstName",
        lastName: "$requesterProfile.lastName",
      },
    },
  },
];

export const reviewerProfile: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER_PROFILE,
      localField: "reviewerId",
      foreignField: "userId",
      as: "reviewerProfile",
    },
  },
  {
    $unwind: { path: "$reviewerProfile", preserveNullAndEmptyArrays: true },
  },

  {
    $addFields: {
      reviewerProfile: {
        firstName: "$reviewerProfile.firstName",
        lastName: "$reviewerProfile.lastName",
      },
    },
  },
];

export const replaceContentIdsWithData: PipelineStage[] = [
  ...requesterProfile,
  ...reviewerProfile,
  {
    $lookup: {
      from: schemaName.COURSE,
      localField: "content.previous.courseId",
      foreignField: "_id",
      as: "previousCourses",
    },
  },
  {
    $lookup: {
      from: schemaName.COURSE,
      localField: "content.current.courseId",
      foreignField: "_id",
      as: "currentCourses",
    },
  },
  {
    $lookup: {
      from: schemaName.SPECIALIZATION,
      localField: "content.previous.specializationId",
      foreignField: "_id",
      as: "previousSpecializations",
    },
  },
  {
    $lookup: {
      from: schemaName.SPECIALIZATION,
      localField: "content.current.specializationId",
      foreignField: "_id",
      as: "currentSpecializations",
    },
  },
  {
    $lookup: {
      from: schemaName.YEAR_LEVEL,
      localField: "content.previous.yearLevelId",
      foreignField: "_id",
      as: "previousYearLevels",
    },
  },
  {
    $lookup: {
      from: schemaName.YEAR_LEVEL,
      localField: "content.current.yearLevelId",
      foreignField: "_id",
      as: "currentYearLevels",
    },
  },
  {
    $addFields: {
      content: {
        previous: {
          yearLevel: {
            $arrayElemAt: ["$previousYearLevels.name", 0],
          },
          courseName: {
            $arrayElemAt: ["$previousCourses.name", 0],
          },
          specializationName: {
            $arrayElemAt: ["$previousSpecializations.name", 0],
          },
        },
        current: {
          yearLevel: {
            $arrayElemAt: ["$currentYearLevels.name", 0],
          },
          courseName: {
            $arrayElemAt: ["$currentCourses.name", 0],
          },
          specializationName: {
            $arrayElemAt: ["$currentSpecializations.name", 0],
          },
        },
      },
    },
  },
  {
    $project: {
      previousCourses: 0,
      currentCourses: 0,
      previousSpecializations: 0,
      currentSpecializations: 0,
      previousYearLevels: 0,
      currentYearLevels: 0,
      content: {
        previous: {
          courseId: 0,
          specializationId: 0,
          yearLevelId: 0,
        },
        current: {
          courseId: 0,
          specializationId: 0,
          yearLevelId: 0,
        },
      },
    },
  },
];
