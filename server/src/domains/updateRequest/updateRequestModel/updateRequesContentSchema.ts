import { Schema } from "mongoose";

const updateRequestContentSchema = (schema: Schema) => {
  return new Schema({
    content: {
      previous: {
        type: schema,
        required: true,
      },
      current: {
        type: schema,
        required: true,
      },
    },
  });
};

export default updateRequestContentSchema;
