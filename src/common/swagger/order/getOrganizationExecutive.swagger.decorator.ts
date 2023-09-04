import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { OrganizationExecuteViewModel } from "../../../features/order/models/order.views/organizationExecuteView.model";

export function GetOrganizationExecutiveSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.organizationExecutive,
    }),
    ApiOkResponse({
      description: SwaggerConstants.organizationExecutiveOk,
      isArray: true,
      type: OrganizationExecuteViewModel,
    }),
    ApiBadRequestResponse({
      description: SwaggerConstants.organizationExecutiveBadReq,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
