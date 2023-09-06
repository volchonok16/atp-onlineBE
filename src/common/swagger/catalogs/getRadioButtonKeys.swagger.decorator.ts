import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { RadioButtonKeyViewModel } from "../../../features/order/models/catalogs.views/radioButtonKeyView.model";

export function GetRadioButtonKeysSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDirectoriesRadioButtonKeys,
    }),
    ApiOkResponse({
      description: SwaggerConstants.success,
      isArray: true,
      type: RadioButtonKeyViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
