import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class PasswordStrategy extends PassportStrategy(Strategy) {
  constructor(private commandBus: CommandBus) {
    super();
  }

  async validate(username: string, password: string) {
    if (username === "admin" && password === "qwerty") return { id: 1 };
    throw new UnauthorizedException();

    //check username and password
    //const userId = await this.commandBus.execute(
    // new CheckCredentialsCommand(username, password),
    // );
    //if (!userId) {
    // throw new UnauthorizedException();
    //}
    // return userId;
  }
}
