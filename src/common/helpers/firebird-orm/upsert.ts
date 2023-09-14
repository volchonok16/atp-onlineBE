import { booleanToShortString } from "../booleanToShortStringTransform";
import { val } from "cheerio/lib/api/attributes";

/**
 * Creates or updates an entry in the database and returns the created/updated entry
 * @param tableName The name of the table in which the changes will be made
 * @param idFieldName Record ID field
 * @param dto Data to create or update a record
 * @param view Fields that the query should return
 */
export function upsertQuery<T, P>(
  tableName: string,
  idFieldName: string,
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
  const viewField = Object.keys(view).join(", ");
  const placeholders = fieldValues.map(() => "?").join(", ");

  const query = `
        UPDATE OR INSERT INTO ${tableName}(${fieldNames}) 
        VALUES(${placeholders})
        MATCHING(${idFieldName})
        RETURNING ${viewField};
    `;

  return { query, parameters: fieldValues };
}
