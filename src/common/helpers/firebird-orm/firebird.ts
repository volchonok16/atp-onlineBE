import { Injectable } from "@nestjs/common";
import { nodeFirebirdOptions } from "../../../../firebird.config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Firebird = require("node-firebird");

@Injectable()
export class FirebirdService {
  db;
  transaction;

  async query<T>(query: string, parameters: any[] = []): Promise<any> {
    await this.connect();

    try {
      const result = await new Promise<any>((resolve, reject) => {
        this.db.query(query, parameters, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      this.db.detach();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async executeInTransaction(callback) {
    this.transaction = await this.beginTransaction();
    try {
      const result = await callback(this.transaction);
      await this.commitTransaction(this.transaction);
      delete result.query;
      delete result.parameters;

      return result;
    } catch (err) {
      console.log(`Transaction failed: ${err}`);
    } finally {
      this.db.detach();
    }
  }

  async transactionQuery<T>(sql, parameters: any[] = []): Promise<T | any> {
    return new Promise((resolve, reject) => {
      this.transaction.query(sql, parameters, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  private async connect() {
    return new Promise((resolve, reject) => {
      Firebird.attach(nodeFirebirdOptions, (err, db) => {
        if (err) {
          reject(err);
        } else {
          this.db = db;
          resolve(db);
        }
      });
    });
  }

  private async beginTransaction() {
    const isolationLevel = Firebird.ISOLATION_READ_COMMITTED;
    if (!this.db) {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      this.db.transaction(isolationLevel, (err, transaction) => {
        if (err) {
          reject(err);
        } else {
          resolve(transaction);
        }
      });
    });
  }

  private async commitTransaction(transaction) {
    return new Promise((resolve, reject) => {
      transaction.commit((err) => {
        if (err) {
          transaction.rollback(() => {
            reject(err);
          });
        } else {
          resolve(err);
        }
      });
    });
  }
}
