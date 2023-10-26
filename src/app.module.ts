import { Module } from "@nestjs/common";
import { DbModule } from "./providers/db.module";
import { OrderModule } from "./features/order/order.module";
import { AuthModule } from "./features/authorization/auth.module";
import { IsValidDateConstraint } from "./common/decorators/isValidDate.decorator";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { AdministrationModule } from "./features/administration/administration.module";

@Module({
  imports: [
    DbModule,
    OrderModule,
    AuthModule,
    AdministrationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
  ],
  controllers: [],
  providers: [IsValidDateConstraint],
})
export class AppModule {}
