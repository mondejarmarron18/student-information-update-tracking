//Update Request Status
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

//Update Request Content Type
export const updateRequestContentType = {
  USER_PROFILE: "userProfileContent",
  ACAD_PROFILE: "acadProfileContent",
} as const;

export const updateRequestContentTypeValues = Object.values(
  updateRequestContentType
);
export const updateRequestContentTypeKeys = Object.keys(
  updateRequestContentType
);

export type UpdateRequestContentTypeKey = keyof typeof updateRequestContentType;
export type UpdateRequestContentTypeValue =
  (typeof updateRequestContentType)[UpdateRequestContentTypeKey];
