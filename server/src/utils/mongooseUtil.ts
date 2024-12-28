import { isValidObjectId, Schema, Types } from "mongoose";
import { x8tSync } from "x8t";

export type TConvertToObjectId = (id: string) =>
  | {
      id: Types.ObjectId;
      error: null;
    }
  | {
      id: null;
      error: string;
    };

export const convertToObjectId: TConvertToObjectId = (id: string) => {
  const defaultValue = {
    id: null,
    error: "Invalid id",
  };

  if (!isValidObjectId(id)) {
    return defaultValue;
  }

  const { result, error } = x8tSync(() => new Types.ObjectId(id));

  if (error !== null || result === null) {
    return defaultValue;
  }

  return {
    id: result,
    error: null,
  };
};
