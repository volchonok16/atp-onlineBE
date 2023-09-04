import { applyDecorators } from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../swagger.constants";
import { OrganizationViewModel } from "../../../features/order/models/dataEditing.views/organizationView.model";

export function GetOrganizationByIdSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.organizationById,
    }),
    ApiOkResponse({
      description: SwaggerConstants.organizationByIdOk,
      type: OrganizationViewModel,
    }),
    ApiNotFoundResponse({
      description: SwaggerConstants.notFound,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    })
  );
}
