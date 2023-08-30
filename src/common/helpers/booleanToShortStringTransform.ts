/**
 * Returns the number corresponding to a boolean value
 *
 * @param booleanValue The boolean value for which the corresponding number is needed.
 * @return The corresponding short string 'T'/'F'.
 */
export const booleanToShortString = (value: boolean): 'T' | 'F' => {
  return value ? 'T' : 'F';
};
