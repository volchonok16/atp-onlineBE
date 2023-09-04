import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { OtherEquipmentViewModel } from "../../../features/order/models/order.views/otherEquipmentView.model";

export function GetOtherEquipmentSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getOtherEquipment,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getOtherEquipmentOk,
      isArray: true,
      type: OtherEquipmentViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
