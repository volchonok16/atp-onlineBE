import { Connection } from 'odbc';
import { booleanToShortString } from '../booleanToShortStringTransform';
import { rawDbResponseTransform } from '../rawDbResponseTransform.helper';

/**
 * Creates or updates an entry in the database and returns the created/updated entry
 * @param firebird Firebird database connection odbc driver
 * @param tableName The name of the table in which the changes will be made
 * @param idFieldName Record ID field
 * @param dto Data to create or update a record
 */
export async function upsert<T>(
  firebird: Connection,
  tableName: string,
  idFieldName: string,
  dto: T,
) {
  const fieldNames = Object.keys(dto).join(', ');
  const fieldValues = Object.values(dto).map((value) => {
    if (typeof value === 'boolean') {
      return booleanToShortString(value);
    }
    return value;
  });
  const placeholders = fieldValues.map(() => '?').join(', ');

  const query = `
        UPDATE OR INSERT INTO ${tableName}(${fieldNames}) 
        VALUES(${placeholders})
        MATCHING(${idFieldName})
    `;

  let resultQuery = `SELECT * FROM ${tableName} ORDER BY ${idFieldName} DESC ROWS 1;`;
  if (dto[idFieldName]) {
    resultQuery = `SELECT * FROM ${tableName} WHERE ${idFieldName} = ${dto[idFieldName]};`;
  }

  try {
    // Insert or update
    await firebird.query(query, fieldValues);
    // Get new insert or update value
    const rawResult = await firebird.query(resultQuery);

    const [result] = rawDbResponseTransform(rawResult);
    return result;
  } catch (error) {
    throw error;
  }
}

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
  view: P,
): { query: string; parameters: string[] } {
  const fieldNames = Object.keys(dto).join(', ');
  const fieldValues = Object.values(dto).map((value) => {
    if (typeof value === 'boolean') {
      return booleanToShortString(value);
    }
    return value;
  });
  const viewField = Object.keys(view).join(', ');
  const placeholders = fieldValues.map(() => '?').join(', ');

  const query = `
        UPDATE OR INSERT INTO ${tableName}(${fieldNames}) 
        VALUES(${placeholders})
        MATCHING(${idFieldName})
        RETURNING ${viewField};
    `;

  return { query, parameters: fieldValues };
}
