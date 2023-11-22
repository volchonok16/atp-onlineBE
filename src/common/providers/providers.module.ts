import { Module } from "@nestjs/common";
import { TypeormModule } from "./postgres/typeorm.module";

@Module({
  imports: [TypeormModule],
})
export class ProvidersModule {}
