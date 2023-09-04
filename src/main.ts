import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { appInitSettings } from "./configuration/appInitSettings";
import { swaggerInitSettings } from "./common/swagger/swaggerInitSettings";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //turn on cookieParser, GlobalPipes, GlobalFilters
  appInitSettings(app);
  // turn on swagger
  swaggerInitSettings(app);
  await app.listen(4500);
}

bootstrap();
