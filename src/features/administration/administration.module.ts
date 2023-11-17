import { Module } from "@nestjs/common";
import { ErrorRepository } from "./error.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ErrorEntity } from "../../providers/postgres/entities";
import { AdministrationController } from "./administration.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ErrorEntity])],
  controllers: [AdministrationController],
  providers: [ErrorRepository],
})
export class AdministrationModule {}
