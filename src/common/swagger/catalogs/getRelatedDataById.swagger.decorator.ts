import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { RelatedDataViewModel } from "../../../features/order/models/catalogs.views/relatedDataView.model";

export function GetRelatedDataByIdSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getRelatedDataById,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getRelatedDataByIdOk,
      type: RelatedDataViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.getRelatedDataByIdBadReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
