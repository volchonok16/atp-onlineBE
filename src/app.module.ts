import { Module } from "@nestjs/common";
import { DbModule } from "./db.firebird/db.module";
import { OrderModule } from "./features/order/order.module";
import { AuthModule } from "./features/authorization/auth.module";
import { IsValidDateConstraint } from "./common/decorators/isValidDate.decorator";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DbModule,
    OrderModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
  ],
  controllers: [],
  providers: [IsValidDateConstraint],
})
export class AppModule {}
