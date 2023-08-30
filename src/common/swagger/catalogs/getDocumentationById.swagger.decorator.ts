import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DocumentationByIdViewModel } from '../../../features/order/models/catalogs.views/documentationByIdView.model';

export function GetDocumentationByIdSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDocumentationById,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getDocumentationByIdOk,
      type: DocumentationByIdViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.getDocumentationByIdBadReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
