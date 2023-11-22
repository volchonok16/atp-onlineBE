import { Module } from "@nestjs/common";
import { CustomLogger } from "./customLogger";
import LogsService from "./application/logs.service";
import { TypeormModule } from "../providers/postgres/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogEntity } from "../providers/postgres/entities";

@Module({
  imports: [TypeormModule, TypeOrmModule.forFeature([LogEntity])],
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class LoggerModule {}
