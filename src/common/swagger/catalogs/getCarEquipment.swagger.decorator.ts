import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { CarEquipmentViewModel } from "../../../features/order/models/catalogs.views/carEquipmentView.model";

export function GetCarEquipmentSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getCarEquipment,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getCarEquipmentOk,
      isArray: true,
      type: CarEquipmentViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
