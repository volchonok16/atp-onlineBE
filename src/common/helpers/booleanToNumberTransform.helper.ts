/**
 * Returns the number corresponding to a boolean value
 *
 * @param booleanValue The boolean value for which the corresponding number is needed.
 * @return The corresponding number.
 */
export const booleanToNumber = (value?: boolean): number => {
  if (!value) return 1;
  return value ? 1 : 0;
};
