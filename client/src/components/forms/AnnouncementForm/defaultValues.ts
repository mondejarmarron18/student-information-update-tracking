import {
  ANNOUNCEMENT_STATUS,
  ANNOUNCEMENT_TYPE,
} from "@/constants/announcement";
import { AnnouncementFormProps } from "./schema";

const defaultValues: AnnouncementFormProps = {
  title: "",
  type: ANNOUNCEMENT_TYPE.GENERAL,
  description: "",
  details: "",
  status: ANNOUNCEMENT_STATUS.ACTIVE,
};

export default defaultValues;
