import { Module } from "@nestjs/common";
import { AUTH_COMMANDS_HANDLERS } from "./commands";
import { AuthResolver } from "./auth.resolver";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_MICROSERVICE } from "../../common/constants/microservise-name.constant";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { apolloDriverConfig } from "../../common/providers/graphql/apollo-driver.config";
import { setCookiesInterceptorProvider } from "../../common/interceptos/set-cookie-interceptor/set-cookies-interceptor.provider";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig),
    ClientsModule.register([
      {
        name: AUTH_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    AuthResolver,
    setCookiesInterceptorProvider,
    ...AUTH_COMMANDS_HANDLERS,
  ],
})
export class AuthModule {}
