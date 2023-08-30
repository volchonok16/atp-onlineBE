import { Logger } from '@nestjs/common';
import * as odbc from 'odbc';
import {
  connectionStringForODBC,
  nodeFirebirdOptions,
} from '../../firebird.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Firebird = require('node-firebird');

export const runDb = async () => {
  const logger = new Logger('runDb');
  try {
    Firebird.attach(nodeFirebirdOptions, async (err, db) => {
      if (err) console.log(err);

      try {
        await db.query('SELECT * FROM OD', (err, result) => {
          console.log('node-firebird is ok', result.length);
          return result;
          db.detach();
        });
      } catch (error) {
        console.error('Error:', error);
      }
    });
  } catch (e) {
    const errorText = 'DB connection error:' + e;
    logger.error(errorText);
    throw new Error(errorText);
  }

  try {
    const connect = await odbc.connect({
      connectionString: connectionStringForODBC,
    });
    logger.log('Successful db connection');
    return connect;
  } catch (e) {
    const errorText = 'DB connection error:' + e;
    logger.error(errorText);
    throw new Error(errorText);
  }
};
