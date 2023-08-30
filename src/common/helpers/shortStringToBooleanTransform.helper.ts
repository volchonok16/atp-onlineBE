/**
 * Converts a text string stored in the database to its corresponding boolean value
 * @param string 'T' | 'F'
 * @return boolean
 */
export const shortStringToBoolean = (string: string): boolean => {
  return string === 'T';
};
