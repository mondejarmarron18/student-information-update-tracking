import { FormField } from "@/types/form.type";
import { AnnouncementFormProps } from "./schema";
import {
  announcementStatuses,
  announcementTypes,
} from "@/constants/announcement";
import _ from "lodash";

const formFields: (FormField & { name: keyof AnnouncementFormProps })[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Announcement title...",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    placeholder: "Select announcement type",
    options: announcementTypes.map((type) => ({
      label: _.startCase(_.toLower(type)),
      value: type,
    })),
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Announcement description...",
  },
  {
    name: "details",
    label: "Details",
    type: "richtext",
    placeholder: "Announcement details...",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select announcement status",
    options: announcementStatuses.map((status) => ({
      label: _.startCase(_.toLower(status)),
      value: status,
    })),
  },
];

export default formFields;
