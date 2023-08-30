import { Injectable } from '@nestjs/common';
import { nodeFirebirdOptions } from '../../../../firebird.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Firebird = require('node-firebird');

@Injectable()
export class FirebirdService {
  db;

  async query<T>(query: string, parameters: any[] = []): Promise<any> {
    try {
      const db = await new Promise<any>((resolve, reject) => {
        Firebird.attach(nodeFirebirdOptions, (err, db) => {
          if (err) {
            console.error('Error attaching to database:', err);
            reject(err);
          } else {
            resolve(db);
          }
        });
      });

      try {
        const result = await new Promise<any>((resolve, reject) => {
          db.query(query, parameters, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        db.detach();
        return result;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async runInTransaction(query) {
    const isolationLevel = Firebird.ISOLATION_READ_COMMITTED;
    try {
      const db = await this.startTransaction();

      db.transaction(isolationLevel, async (err, transaction) => {
        if (err) {
          console.error(err);
          return;
        }

        try {
          await query(transaction);
          transaction.commit(async (err) => {
            if (err) {
              await this.rollbackTransaction(transaction);
            }
            this.db.detach();
          });
        } catch (error) {
          await this.rollbackTransaction(transaction);
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async executeQuery(
    transaction,
    query: string,
    parameters: any[] = [],
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      transaction.query(query, parameters, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  //firebird.runInTransaction(async (transaction) => {
  //     try {
  //         await firebird.executeQuery(transaction, query1, [param1]);
  //         await firebird.executeQuery(transaction, query2, [param2]);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // });

  private async startTransaction() {
    try {
      this.db = await new Promise((resolve, reject) => {
        Firebird.attach(nodeFirebirdOptions, (err, db) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(db);
        });
      });

      return this.db;
    } catch (error) {
      throw error;
    }
  }

  private async rollbackTransaction(transaction) {
    try {
      transaction.rollback((err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
