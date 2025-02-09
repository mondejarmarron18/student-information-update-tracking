import { eachMonthOfInterval, format, getMonth, Month } from "date-fns";
import { enUS } from "date-fns/locale";

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

export const getMonthString = (
  date?: Date,
  width: "abbreviated" | "wide" = "wide"
) => {
  if (!date) return "";

  return enUS.localize.month(getMonth(date) as Month, { width }); // Returns full month name (e.g., January)
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

export const getMonthRange = (startDate: Date, endDate: Date) => {
  // Get the array of months in the interval between the two dates
  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  // Format the months to a readable format like "January 2024"
  return months.map((month) => toDateNumeric(month));
};
