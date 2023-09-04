import { Response } from "express";
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { PasswordAuthGuard } from "../guards/password.guard";
import { CreateTokenCommand } from "../useCases/createToken.useCase";
import { CurrentUserId } from "../../../common/decorators/currentUserId.decorator";
import { RefreshTokenGuard } from "../guards/refreshToken.guard";
import { NewPasswordInputDto } from "../dto/newPasswordInputDto";
import { ChangePasswordCommand } from "../useCases/changePassword.useCase";
import { NewPasswordSwaggerDecorator } from "../../../common/swagger/auth/newPassword.swagger.decorator";
import { LoginSwaggerDecorator } from "../../../common/swagger/auth/login.swagger.decorator";
import { ApiTags } from "@nestjs/swagger";
import { LogoutSwaggerDecorator } from "../../../common/swagger/auth/logout.swagger.decorator";

@ApiTags("Auth")
@Controller("api/auth")
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post("login")
  @LoginSwaggerDecorator()
  @UseGuards(PasswordAuthGuard)
  @HttpCode(200)
  async login(
    @CurrentUserId() userId: number,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    const token = await this.commandBus.execute(new CreateTokenCommand(userId));
    response.cookie("refreshToken", token, {
      httpOnly: true,
      secure: true,
    });
    return;
  }

  @Post("logout")
  @LogoutSwaggerDecorator()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async logout(
    @CurrentUserId() userId: number,
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    response.clearCookie("refreshToken");
    return;
  }

  @Post("new-password")
  @NewPasswordSwaggerDecorator()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(204)
  async newPassword(
    @Body() newPasswordDto: NewPasswordInputDto,
    @CurrentUserId() userId: number
  ): Promise<void> {
    await this.commandBus.execute<ChangePasswordCommand>(
      new ChangePasswordCommand(userId, newPasswordDto.newPassword)
    );
    return;
  }
}
