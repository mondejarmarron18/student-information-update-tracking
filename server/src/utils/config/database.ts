import mongoose from "mongoose";
import config from ".";
import { x8tAsync } from "x8t";

export const dbConnect = async (cb: () => void) => {
  const { error } = await x8tAsync(mongoose.connect(config.dbUrl as string), {
    log: true,
  });

  if (error) return;

  console.log("Connected to MongoDB");
  cb();
};
