import { Module } from "@nestjs/common";
import { AUTH_COMMANDS_HANDLERS } from "./commands";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [],
  controllers: [AuthResolver],
  providers: [...AUTH_COMMANDS_HANDLERS],
})
export class AuthModule {}
