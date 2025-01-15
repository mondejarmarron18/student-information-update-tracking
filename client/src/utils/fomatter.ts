import { format } from "date-fns";

export const toDateNumeric = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "yyyy-MM-dd");
};

export const toDateString = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "PPP");
};

export const toDateTimeString = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "PPPpp");
};

export const toDateTimeNumeric = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "yyyy-MM-dd 'at' HH:mm a");
};
