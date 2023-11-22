import { Global, Module } from "@nestjs/common";
import { runDb } from "./db.firebird/db.connection";
import { dbConnect_const } from "../common/constants/global.constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./postgres/typeOrmConfig";

const dbProvider = {
  provide: dbConnect_const,
  useFactory: async () => {
    //return await runDb();
  },
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
  ],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
