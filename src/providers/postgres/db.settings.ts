import * as dotenv from "dotenv";
import { EnvironmentEnum } from "../../common/enums/environment.enum";

dotenv.config();

export const dbSettings = {
  dbHost:
    process.env.NODE_ENV === EnvironmentEnum.Production
      ? process.env.DB_HOST
      : process.env.TEST_DB_HOST,
  pbPort: Number(process.env.DB_PORT) || 5432,
  dbUser:
    process.env.NODE_ENV === EnvironmentEnum.Production
      ? process.env.DB_USER
      : process.env.TEST_DB_USER,
  dbPassword:
    process.env.NODE_ENV === EnvironmentEnum.Production
      ? process.env.DB_PASSWORD
      : process.env.TEST_DB_PASSWORD,
  dbName:
    process.env.NODE_ENV === EnvironmentEnum.Production
      ? process.env.DB_NAME
      : process.env.TEST_DB_NAME,
};
