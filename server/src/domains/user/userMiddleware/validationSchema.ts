import { z } from "zod";

const passwordSpecialCharacters = "@#$&_";

export const validatePassword = z
  .string()
  .min(8, "Password must have at least 8 characters")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must have at least one uppercase character",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must have at least one lowercase character",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must have at least one number",
  })
  .refine((val) => new RegExp(`[${passwordSpecialCharacters}]`).test(val), {
    message:
      "Password must have at least one special character: " +
      passwordSpecialCharacters.split("").join(", "),
  });
