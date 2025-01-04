export const schemaName = {
  USER: "user",
  ROLE: "role",
  USER_PROFILE: "userProfile",
  ACAD_PROFILE: "acadProfile",
  VERIFICATION_CODE: "verificationCode",
  UPDATE_REQUEST: "updateRequest",
} as const;

export const schemaNameValues = Object.values(schemaName);
export const schemaNameKeys = Object.keys(schemaName);

export type SchemaNameKeys = (typeof schemaNameKeys)[number];
export type SchemaNameValues = (typeof schemaNameValues)[number];
