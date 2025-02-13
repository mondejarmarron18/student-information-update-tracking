import { PipelineStage } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

export const requesterAccount: PipelineStage[] = [
  {
    $lookup: {
      from: "user",
      localField: "requesterId",
      foreignField: "_id",
      as: "requesterAccount",
    },
  },
  {
    $unwind: {
      path: "$requesterAccount",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      "requesterAccount.password": 0,
    },
  },
];

export const reviewerAccount: PipelineStage[] = [
  {
    $lookup: {
      from: schemaName.USER,
      localField: "reviewerId",
      foreignField: "_id",
      as: "reviewerAccount",
    },
  },
  {
    $unwind: {
      path: "$reviewerAccount",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      "reviewerAccount.password": 0,
    },
  },
];

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
    // Step 1: Calculate the start and end dates dynamically
    {
      $addFields: {
        startDate: {
          $dateTrunc: {
            date: {
              $dateSubtract: {
                startDate: "$$NOW",
                unit: "month",
                amount: months,
              },
            },
            unit: "month",
          },
        },
        endDate: "$$NOW",
      },
    },
    // Step 2: Filter documents based on the date range (12 months back to current month)
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
    // Step 3: Duplicate the document for requestedAt and reviewedAt
    {
      $facet: {
        requested: [
          {
            $match: {
              requestedAt: {
                $exists: true,
              },
            },
          },
          {
            $project: {
              year: {
                $year: "$requestedAt",
              },
              month: {
                $month: "$requestedAt",
              },
              status: {
                $ifNull: ["$status", 1],
              }, // Default status for requestedAt
            },
          },
        ],
        reviewed: [
          {
            $match: {
              reviewedAt: {
                $exists: true,
              },
            },
          },
          {
            $project: {
              year: {
                $year: "$reviewedAt",
              },
              month: {
                $month: "$reviewedAt",
              },
              status: {
                $ifNull: ["$reviewStatus", 1],
              }, // Status for reviewedAt, default to 1 if missing
            },
          },
        ],
      },
    },
    // Step 4: Merge the two arrays (requested and reviewed)
    {
      $project: {
        allDates: {
          $concatArrays: ["$requested", "$reviewed"],
        },
      },
    },
    {
      $unwind: "$allDates",
    },
    {
      $replaceRoot: {
        newRoot: "$allDates",
      },
    },
    // Step 5: Group by year and month, then by status
    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
        },
        reviews: {
          $push: {
            status: "$status",
          },
        },
      },
    },
    // Step 6: Format the output and calculate counts
    {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        reviews: {
          $reduce: {
            input: "$reviews",
            initialValue: [],
            in: {
              $let: {
                vars: {
                  existingStatus: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$$value",
                          as: "v",
                          cond: {
                            $eq: ["$$v.status", "$$this.status"],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: {
                  $cond: [
                    {
                      $not: ["$$existingStatus"],
                    },
                    {
                      $concatArrays: [
                        "$$value",
                        [
                          {
                            status: "$$this.status",
                            count: 1,
                          },
                        ],
                      ],
                    },
                    {
                      $concatArrays: [
                        {
                          $filter: {
                            input: "$$value",
                            as: "v",
                            cond: {
                              $ne: ["$$v.status", "$$this.status"],
                            },
                          },
                        },
                        [
                          {
                            status: "$$existingStatus.status",
                            count: {
                              $add: ["$$existingStatus.count", 1],
                            },
                          },
                        ],
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    // Step 7: Add totalReviews field
    {
      $addFields: {
        totalReviews: {
          $sum: "$reviews.count",
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
