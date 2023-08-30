import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { StaffAdditionalInfoViewModel } from '../../../features/order/models/order.views/staffAdditionalInfoView.model';

export function GetAdditionalInfoSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.additionalInfo,
    }),
    ApiOkResponse({
      description: SwaggerConstants.additionalInfoOk,
      type: StaffAdditionalInfoViewModel,
    }),
    ApiNotFoundResponse({
      description: SwaggerConstants.notFound,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
