import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { StaffRefuelingCardsViewModel } from '../../../features/order/models/order.views/staffRefuelingCardsView.model';

export function GetRefuelingCardsSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.refuelingCards,
    }),
    ApiOkResponse({
      description: SwaggerConstants.refuelingCardsOk,
      type: StaffRefuelingCardsViewModel,
    }),
    ApiNotFoundResponse({
      description: SwaggerConstants.notFound,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
