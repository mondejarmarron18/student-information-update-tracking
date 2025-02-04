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

export const getMonthNumeric = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "MM"); // Returns numeric month (01-12)
};

export const getMonthString = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "MMMM"); // Returns full month name (e.g., January)
};

export const getDayNumeric = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "dd"); // Returns numeric day (01-31)
};

export const getDayString = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "do"); // Returns day with ordinal (e.g., 1st, 2nd)
};

export const getDayOfWeekNumeric = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "i"); // Returns numeric day of the week (1=Monday, 7=Sunday)
};

export const getDayOfWeekString = (date?: Date) => {
  if (!date) return "";

  return format(new Date(date), "EEEE"); // Returns full day of the week (e.g., Monday)
};
