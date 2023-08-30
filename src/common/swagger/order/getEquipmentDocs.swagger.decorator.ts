import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';

import { EquipmentsDocViewModel } from '../../../features/order/models/order.views/equipmentsDocView.model';

export function GetEquipmentDocsSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getEquipmentDocs,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getEquipmentDocsOk,
      isArray: true,
      type: EquipmentsDocViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.getEquipmentDocsBadReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
