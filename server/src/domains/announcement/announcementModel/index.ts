import { model, Schema, Types } from "mongoose";
import { schemaName } from "../../../constants/schemaName";

type Announcement = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  details: string;
  type: "event" | "news";
  createdAt: Date;
  updatedAt: Date;
};

const announcementSchema = new Schema<Announcement>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  type: {
    type: String,
    enum: ["event", "news"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const AnnouncementModel = model<Announcement>(
  schemaName.ANNOUNCEMENT,
  announcementSchema,
  schemaName.ANNOUNCEMENT
);

export default AnnouncementModel;
