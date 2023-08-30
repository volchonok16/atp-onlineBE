import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DirectoriesNotesViewModel } from '../../../features/order/models/catalogs.views/directoriesNotesView.model';

export function GetDirectoriesNotesSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDirectoriesNotes,
    }),
    ApiOkResponse({
      description: SwaggerConstants.success,
      isArray: true,
      type: DirectoriesNotesViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
