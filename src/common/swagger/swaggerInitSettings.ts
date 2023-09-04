import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "../../features/authorization/auth.module";
import { OrderModule } from "../../features/order/order.module";

export const swaggerInitSettings = (app: INestApplication) => {
  //swagger for auth part
  const authOptions = new DocumentBuilder()
    .addCookieAuth("refreshToken")
    .setTitle("Authorization")
    .setDescription("Authorization API")
    .setVersion("1.0")
    .build();

  const authDocument = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });
  SwaggerModule.setup("swagger/authorization", app, authDocument);

  //swagger for order.views part
  const orderOptions = new DocumentBuilder()
    .addCookieAuth("refreshToken")
    .setTitle("Order")
    .setDescription("Order API")
    .setVersion("1.0")
    .build();

  const orderDocument = SwaggerModule.createDocument(app, orderOptions, {
    include: [OrderModule],
  });
  SwaggerModule.setup("swagger/order", app, orderDocument);
};
