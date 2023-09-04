import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { DocumentationRefuelingCardsByIdViewModel } from "../../../features/order/models/catalogs.views/documentationRefuelingCardsByIdView.model";

export function GetDocumentationRefuelingCardsByIdSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDocumentationRefuelingCards,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getDocumentationRefuelingCardsOk,
      isArray: true,
      type: DocumentationRefuelingCardsByIdViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
