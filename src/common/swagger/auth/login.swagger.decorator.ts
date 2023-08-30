import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { LoginInputDto } from '../../../features/authorization/dto/loginInput.dto';

export function LoginSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: SwaggerConstants.login,
    }),
    ApiBody({
      type: LoginInputDto,
    }),
    ApiOkResponse({
      description: SwaggerConstants.jwtOk,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.badReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.loginUnauthorized,
    }),
  );
}
