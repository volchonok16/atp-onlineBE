import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { AdditionalInfoNotInDemandViewModel } from "../../../features/order/models/catalogs.views/additionalInfoNotInDemandView.model";

export function GetAdditionalInfoNotInDemandSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getAdditionalInfoNotInDemand,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getAdditionalInfoNotInDemandOk,
      isArray: true,
      type: AdditionalInfoNotInDemandViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
