import { Module } from "@nestjs/common";
import { DbModule } from "./providers/db.module";
import { OrderModule } from "./features/order/order.module";
import { AuthModule } from "./features/authorization/auth.module";
import { IsValidDateConstraint } from "./common/decorators/isValidDate.decorator";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { AdministrationModule } from "./features/administration/administration.module";
import { ApiModule } from "./modules/api.module";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "./common/logger/logger.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { apolloDriverConfig } from "./common/providers/graphql/apollo-driver.config";

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
  imports: [
    DbModule,
    OrderModule,
    AuthModule,
    // new
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
    ApiModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [IsValidDateConstraint],
})
export class AppModule {}
