import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { appInitSettings } from "./configuration/appInitSettings";
import { swaggerInitSettings } from "./common/swagger/swaggerInitSettings";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //turn on cookieParser, GlobalPipes, GlobalFilters
  appInitSettings(app);
  // turn on swagger
  swaggerInitSettings(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT");
  await app.listen(port, () => {
    Logger.log(`Swagger: http://localhost:${port}/swagger/order`);
  });
}

bootstrap();
