import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { StaffInfoViewModel } from "../../../features/order/models/order.views/staffInfoViewModel";

export function GetStaffInfoSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.staffInfo,
    }),
    ApiOkResponse({
      description: SwaggerConstants.staffInfoOk,
      isArray: true,
      type: StaffInfoViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
