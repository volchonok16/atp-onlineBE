import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { AdditionalInfoConservationViewModel } from "../../../features/order/models/catalogs.views/additionalInfoConservationView.model";

export function GetAdditionalInfoConservationSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getAdditionalInfoConservation,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getAdditionalInfoConservationOk,
      isArray: true,
      type: AdditionalInfoConservationViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
