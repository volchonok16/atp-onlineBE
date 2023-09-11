import { booleanToShortString } from "../booleanToShortStringTransform";
import { vi } from "date-fns/locale";

/**
 * Creates or updates an entry in the database and returns the created/updated entry
 * @param tableName The name of the table in which the changes will be made
 * @param dto Data to create or update a record
 * @param view Fields that the query should return
 */
export function createQuery<T, P>(
  tableName: string,
  dto: T,
  view: P
): { query: string; parameters: string[] } {
  const fieldNames = Object.keys(dto).join(", ");

  const fieldValues = Object.values(dto).map((value) => {
    if (typeof value === "boolean") {
      return booleanToShortString(value);
    }
    return value;
  });

  let viewField;
  if (typeof view === "string") {
    viewField = view;
  } else {
    viewField = Object.keys(view).join(", ");
  }
  const placeholders = fieldValues.map(() => "?").join(", ");

  const query = `
        INSERT INTO ${tableName}(${fieldNames}) 
        VALUES(${placeholders})
        RETURNING ${viewField};
    `;

  return { query, parameters: fieldValues };
}
