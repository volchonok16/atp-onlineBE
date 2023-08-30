import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DirectoriesCommunicationTypeViewModel } from '../../../features/order/models/catalogs.views/directoriesCommunicationTypeView.model';

export function GetDirectoriesCommunicationTypeSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDirectoriesCommunicationType,
    }),
    ApiOkResponse({
      description: SwaggerConstants.success,
      isArray: true,
      type: DirectoriesCommunicationTypeViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
