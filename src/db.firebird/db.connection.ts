import { Logger } from "@nestjs/common";
import { nodeFirebirdOptions } from "../../firebird.config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Firebird = require("node-firebird");

export const runDb = async () => {
  const logger = new Logger("runDb");
  try {
    Firebird.attach(nodeFirebirdOptions, async (err, db) => {
      if (err) console.log(err);

      try {
        await db.query("SELECT * FROM OD", (err, result) => {
          logger.log("Connection success.");
          return result;
          db.detach();
        });
      } catch (error) {
        logger.error("Error:", error);
      }
    });
  } catch (e) {
    const errorText = "DB connection error:" + e;
    logger.error(errorText);
    throw new Error(errorText);
  }
};
