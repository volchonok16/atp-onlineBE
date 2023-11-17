import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { dbSettings } from "./db.settings";
import { entities } from "./entities";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: "postgres",
      host: dbSettings.dbHost,
      port: dbSettings.pbPort,
      username: dbSettings.dbUser,
      password: dbSettings.dbPassword,
      database: dbSettings.dbName,
      entities: [...entities],
      synchronize: true,
    };
  }
}
