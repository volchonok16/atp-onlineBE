import {format} from "date-fns";

/**
 * Converts the time format stored in the database to the format that will be displayed
 * on the client side of the application
 *
 * @param timestamp in string format
 */
export const timeStampToTimeTransform = (timestamp: any): string => {

  return timestamp ? format(timestamp, "yyyy-MM-dd") : null
};
