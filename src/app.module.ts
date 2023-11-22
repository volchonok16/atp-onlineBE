import { Module } from "@nestjs/common";
import { DbModule } from "./providers/db.module";
import { OrderModule } from "./features/order/order.module";
import { AuthModule } from "./features/authorization/auth.module";
import { IsValidDateConstraint } from "./common/decorators/isValidDate.decorator";
import { AdministrationModule } from "./features/administration/administration.module";
import { ApiModule } from "./modules/api.module";
import { LoggerModule } from "./common/logger/logger.module";
import { SharedModule } from "./common/shared/shared.module";
import { ProvidersModule } from "./common/providers/providers.module";

@Module({
  imports: [
    DbModule,
    OrderModule,
    AuthModule,
    AdministrationModule,
    // new
    ProvidersModule,
    SharedModule,
    ApiModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [IsValidDateConstraint],
})
export class AppModule {}
