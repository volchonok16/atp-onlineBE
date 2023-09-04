import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { ExtendedInformationViewModel } from "../../../features/order/models/catalogs.views/extendedInformationView.model";

export function GetExtendedInfoSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getExtendedInfo,
    }),
    ApiOkResponse({
      description: SwaggerConstants.getExtendedInfoOk,
      isArray: true,
      type: ExtendedInformationViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
