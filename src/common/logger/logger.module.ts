import { Module } from "@nestjs/common";
import { CustomLogger } from "./customLogger";
import LogsService from "./application/logs.service";
import { DatabaseModule } from "../providers/postgres/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogEntity } from "../providers/postgres/entities";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([LogEntity])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class LoggerModule {}
