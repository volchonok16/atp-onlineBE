/**
 * Converts a number stored in the database to its corresponding boolean value
 * @param string 0 | 1
 * @return boolean
 */
export const numberToBoolean = (number: 0 | 1): boolean => {
  return number === 1;
};
