import { Module } from "@nestjs/common";
import { DbModule } from "./db.firebird/db.module";
import { OrderModule } from "./features/order/order.module";
import { AuthModule } from "./features/authorization/auth.module";
import { IsValidDateConstraint } from "./common/decorators/isValidDate.decorator";

@Module({
  imports: [DbModule, OrderModule, AuthModule],
  controllers: [],
  providers: [IsValidDateConstraint],
})
export class AppModule {}
