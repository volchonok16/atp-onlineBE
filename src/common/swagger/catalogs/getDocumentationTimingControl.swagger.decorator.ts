import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DocumentationTimingControlViewModel } from '../../../features/order/models/catalogs.views/documentationTimingControlView.model';

export function GetDocumentationTimingControlSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDocumentationTimingControl,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getDocumentationTimingControlOk,
      isArray: true,
      type: DocumentationTimingControlViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
