import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DirectoriesTransportationTypeViewModel } from '../../../features/order/models/catalogs.views/directoriesTransportationTypeView.model';

export function GetDirectoriesTransportationTypeSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDirectoriesTransportationType,
    }),
    ApiOkResponse({
      description: SwaggerConstants.success,
      isArray: true,
      type: DirectoriesTransportationTypeViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
