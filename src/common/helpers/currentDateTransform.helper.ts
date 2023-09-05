import { format } from "date-fns";

export const currentDateTransform = (date: Date = new Date()) => {
  return format(date, "yyyy-MM-dd");
};
