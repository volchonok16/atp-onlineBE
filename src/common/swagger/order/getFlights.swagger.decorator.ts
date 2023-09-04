import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { FlightsViewModel } from "../../../features/order/models/order.views/flightsView.model";

export function GetFlightsSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getFlights,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getFlightsOk,
      isArray: true,
      type: FlightsViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
