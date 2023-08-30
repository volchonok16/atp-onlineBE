import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { NewPasswordInputDto } from '../../../features/authorization/dto/newPasswordInputDto';

export function NewPasswordSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.newPass,
    }),
    ApiBody({
      type: NewPasswordInputDto,
    }),
    ApiNoContentResponse({
      description: SwaggerConstants.newPassOk,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.badReq,
    }),
  );
}
