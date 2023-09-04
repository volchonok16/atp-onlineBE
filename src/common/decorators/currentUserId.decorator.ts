import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // return user id from password strategy
    return request.user.id;
  }
);
