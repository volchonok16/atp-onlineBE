import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { TechnicalCharacteristicViewModel } from "../../../features/order/models/catalogs.views/technicalCharacteristicView.model";

export function GetTechnicalCharacteristicByIdSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getTechnicalCharacteristicById,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getTechnicalCharacteristicByIdOk,
      type: TechnicalCharacteristicViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.getTechnicalCharacteristicByIdBadReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
