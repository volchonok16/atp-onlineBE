import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { appInitSettings } from "./configuration/appInitSettings";
import { swaggerInitSettings } from "./common/swagger/swaggerInitSettings";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT");
  const clientPort = configService.get<number>("CLIENT_PORT");

  //turn on cookieParser, GlobalPipes, GlobalFilters
  appInitSettings(app, clientPort);
  // turn on swagger
  swaggerInitSettings(app);

  await app.listen(port, () => {
    Logger.log(`Swagger: http://localhost:${port}/swagger/order`);
  });
}

bootstrap();
