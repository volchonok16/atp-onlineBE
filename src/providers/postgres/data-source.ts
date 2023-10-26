import { config } from "dotenv";
import { DataSource } from "typeorm";
import { dbSettings } from "./db.settings";
import { entities } from "./entities";

config();

export default new DataSource({
  type: "postgres",
  host: dbSettings.dbHost,
  port: dbSettings.pbPort,
  username: dbSettings.dbUser,
  password: dbSettings.dbPassword,
  database: dbSettings.dbName,
  entities: [...entities],
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  synchronize: true,
});
