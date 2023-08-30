import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DirectoriesMechanismTypesViewModel } from '../../../features/order/models/catalogs.views/directoriesMechanismTypesView.model';

export function GetDirectoriesMechanismTypesSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDirectoriesMechanismTypes,
    }),
    ApiOkResponse({
      description: SwaggerConstants.success,
      isArray: true,
      type: DirectoriesMechanismTypesViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
