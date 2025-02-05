import {
  announcementStatuses,
  announcementTypes,
} from "@/constants/announcement";
import { z } from "zod";

type Enum = [string, ...string[]];

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  type: z.enum(announcementTypes as Enum),
  description: z.string().nonempty("Description is required"),
  details: z.string().optional(),
  status: z.enum(announcementStatuses as Enum),
});

export type AnnouncementFormProps = z.infer<typeof schema>;

export default schema;
