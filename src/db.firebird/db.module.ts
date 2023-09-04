import { Global, Module } from "@nestjs/common";
import { runDb } from "./db.connection";
import { dbConnect_const } from "../common/constants/global.constants";

const dbProvider = {
  provide: dbConnect_const,
  useFactory: async () => {
    return await runDb();
  },
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
