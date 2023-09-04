import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { OrganizationSubunitViewModel } from "../../../features/order/models/order.views/organizationSubunitView.model";

export function GetOrganizationSubunitsSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.organizationSubunits,
    }),
    ApiOkResponse({
      description: SwaggerConstants.organizationSubunitsOk,
      isArray: true,
      type: OrganizationSubunitViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.organizationSubunitsBadReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
