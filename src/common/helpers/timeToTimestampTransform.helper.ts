import { format } from 'date-fns';

/**
 * Returns a string that matches the types of data stored in the database
 * @param time in string format. Example: "11:11"
 */
export const timeToTimestampTransformHelper = (time: string): string => {
  const currentDate = new Date();

  const [hours, minutes] = time.split(':');

  const combinedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    Number(hours),
    Number(minutes),
    0,
  );

  return format(combinedDate, 'yyyy-MM-dd HH:mm:ss');
};
