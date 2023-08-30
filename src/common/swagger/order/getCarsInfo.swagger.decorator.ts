import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { CarsInfoViewModel } from '../../../features/order/models/order.views/carsInfoView.model';

export function GetCarsInfoSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.carsInfo,
    }),
    ApiOkResponse({
      description: SwaggerConstants.carsInfoOk,
      isArray: true,
      type: CarsInfoViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.badReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
