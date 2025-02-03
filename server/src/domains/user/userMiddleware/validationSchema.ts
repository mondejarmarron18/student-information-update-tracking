import { z } from "zod";
import {
  passwordMinLength,
  passwordSpecialCharacters,
} from "../../../utils/password";

export const validatePassword = z
  .string()
  .min(passwordMinLength, "Password must have at least 8 characters")
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
