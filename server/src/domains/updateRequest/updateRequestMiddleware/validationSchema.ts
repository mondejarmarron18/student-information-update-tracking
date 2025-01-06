import { z } from "zod";
import {
  updateRequestContentType,
  updateRequestContentTypeValues,
} from "../../../constants/updateRequest";
import { validateAcadProfile } from "../../acadProfile/acadProfileMiddleware/validationSchema";
import { validateUserProfile } from "../../userProfile/userProfileMiddleware/validationSchema";

export const validateCreateUpdateRequest = z
  .object({
    contentType: z.enum(
      updateRequestContentTypeValues as [string, ...string[]]
    ),
    content: z.union([validateAcadProfile, validateUserProfile]),
  })
  .superRefine((data, ctx) => {
    if (data.contentType === updateRequestContentType.ACAD_PROFILE) {
      const parseResult = validateAcadProfile.safeParse(data.content);
      if (!parseResult.success) {
        // Include all errors from validateAcadProfile
        parseResult.error.issues.forEach((issue) => {
          ctx.addIssue(issue);
        });
      }
    } else if (data.contentType === updateRequestContentType.USER_PROFILE) {
      const parseResult = validateUserProfile.safeParse(data.content);
      if (!parseResult.success) {
        // Include all errors from validateUserProfile
        parseResult.error.issues.forEach((issue) => {
          ctx.addIssue(issue);
        });
      }
    }
  });
