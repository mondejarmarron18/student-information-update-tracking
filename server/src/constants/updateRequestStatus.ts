export const updateRequestStatus = {
  pending: 1,
  approved: 2,
  rejected: 3,
} as const;

export const updateRequestStatusValues = Object.values(updateRequestStatus);
export const updateRequestStatusKeys = Object.keys(updateRequestStatus);

export type UpdateRequestStatusKey = keyof typeof updateRequestStatus;
export type UpdateRequestStatusValue =
  (typeof updateRequestStatus)[UpdateRequestStatusKey];
