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

export const updateRequestsPassedDays = (days: number): PipelineStage[] => {
  return [
    {
      $set: {
        startDate: {
          $dateSubtract: {
            startDate: "$$NOW",
            unit: "day",
            amount: days,
          },
        },
        endDate: "$$NOW", // Current date and time
      },
    },
    {
      $match: {
        $expr: {
          $or: [
            {
              $and: [
                { $gte: ["$requestedAt", "$startDate"] },
                { $lt: ["$requestedAt", "$endDate"] },
              ],
            },
            {
              $and: [
                { $gte: ["$reviewedAt", "$startDate"] },
                { $lt: ["$reviewedAt", "$endDate"] },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        reviewStatus: 1, // Include only the reviewStatus field
      },
    },
    {
      $group: {
        _id: null, // Group everything together
        reviews: { $push: "$reviewStatus" }, // Gather all reviewStatus values
        totalReviews: { $sum: 1 }, // Count total documents
      },
    },
    {
      $project: {
        _id: 0, // Remove the _id field
        totalReviews: 1, // Include the totalReviews count
        reviews: {
          $map: {
            input: [1, 2, 3], // Specify all possible statuses
            as: "status",
            in: {
              status: "$$status", // Each possible status (1, 2, 3)
              count: {
                $size: {
                  $filter: {
                    input: "$reviews", // Count occurrences of each status
                    as: "item",
                    cond: { $eq: ["$$item", "$$status"] },
                  },
                },
              },
            },
          },
        },
      },
    },
  ];
};

export const updateRequestsPassedMonths = (months: number): PipelineStage[] => {
  return [
    {
      $set: {
        startDate: {
          $dateSubtract: {
            startDate: "$$NOW",
            unit: "month",
            amount: months,
          },
        },
        endDate: "$$NOW",
      },
    },
    {
      $match: {
        $expr: {
          $or: [
            {
              $and: [
                { $gte: ["$requestedAt", "$startDate"] },
                { $lt: ["$requestedAt", "$endDate"] },
              ],
            },
            {
              $and: [
                { $gte: ["$reviewedAt", "$startDate"] },
                { $lt: ["$reviewedAt", "$endDate"] },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        requestedAt: 1,
        reviewedAt: 1,
        reviewStatus: 1,
        month: {
          $month: {
            $ifNull: ["$requestedAt", "$reviewedAt"],
          },
        },
        year: {
          $year: {
            $ifNull: ["$requestedAt", "$reviewedAt"],
          },
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
          year: "$year",
        },
        totalReviews: {
          $sum: 1,
        },
        reviewStatuses: {
          $push: "$reviewStatus",
        },
      },
    },
    {
      $project: {
        month: "$_id.month",
        year: "$_id.year",
        totalReviews: 1,
        reviews: {
          $map: {
            input: [1, 2, 3], // All possible review statuses
            as: "status",
            in: {
              status: "$$status",
              count: {
                $size: {
                  $filter: {
                    input: "$reviewStatuses",
                    as: "item",
                    cond: { $eq: ["$$item", "$$status"] },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ];
};
