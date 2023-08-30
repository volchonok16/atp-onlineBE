import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SwaggerConstants } from '../swagger.constants';
import { DirectoriesGoodsTypeViewModel } from '../../../features/order/models/catalogs.views/directoriesGoodsTypeView.model';

export function GetDirectoriesGoodsTypeSwaggerDecorator() {
  return applyDecorators(
    ApiCookieAuth(),
    ApiOperation({
      summary: SwaggerConstants.getDirectoriesGoodsType,
    }),
    ApiOkResponse({
      description: SwaggerConstants.success,
      isArray: true,
      type: DirectoriesGoodsTypeViewModel,
    }),
    ApiUnauthorizedResponse({
      description: SwaggerConstants.unauthorized,
    }),
  );
}
