/**
 * Converts the time format stored in the database to the format that will be displayed
 * on the client side of the application
 *
 * @param timestamp in string format
 */
export const timeStampToTimeTransformHelper = (timestamp: string): string => {
  const [_, time] = timestamp.split(" ");
  return time.slice(0, -3);
};
