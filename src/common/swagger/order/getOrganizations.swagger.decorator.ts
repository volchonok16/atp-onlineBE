import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { OrganizationsViewModel } from "../../../features/order/models/order.views/organizationsView.model";

export function GetOrganizationsSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.organizations,
    }),
    ApiOkResponse({
      description: SwaggerConstants.organizationsOk,
      isArray: true,
      type: OrganizationsViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.badReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
