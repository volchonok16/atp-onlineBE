import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { OrganizationsViewModel } from "../../../features/order/models/order.views/organizationsView.model";

export function GetOrganizationsListSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.organizationsList,
    }),
    ApiOkResponse({
      description: SwaggerConstants.organizationsListOk,
      isArray: true,
      type: OrganizationsViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
