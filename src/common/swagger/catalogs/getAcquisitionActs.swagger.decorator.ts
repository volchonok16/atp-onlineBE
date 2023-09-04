import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { AcquisitionActViewModel } from "../../../features/order/models/catalogs.views/acquisitionActView.model";

export function GetAcquisitionActsSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getAcquisitionActs,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getAcquisitionActsOk,
      isArray: true,
      type: AcquisitionActViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
