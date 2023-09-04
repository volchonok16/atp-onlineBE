import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { DriverHoldingViewModel } from "../../../features/order/models/catalogs.views/driverHoldingView.model";

export function GetDriverHoldingSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDriverHolding,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getDriverHoldingOk,
      isArray: true,
      type: DriverHoldingViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
