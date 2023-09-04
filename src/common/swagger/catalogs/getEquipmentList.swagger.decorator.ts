import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { EquipmentListViewModel } from "../../../features/order/models/catalogs.views/equipmentListView.model";

export function GetEquipmentListSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getEquipmentList,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getEquipmentListOk,
      isArray: true,
      type: EquipmentListViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
