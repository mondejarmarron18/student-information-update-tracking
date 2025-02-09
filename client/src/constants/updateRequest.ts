export const updateRequestStatus = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const;

export const updateRequestStatusString = {
  1: "Pending",
  2: "Approved",
  3: "Rejected",
} as const;
