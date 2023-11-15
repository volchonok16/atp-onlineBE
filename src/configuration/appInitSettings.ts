import * as cookieParser from "cookie-parser";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "../common/exeptions/exeption.filter";
import { AppModule } from "../app.module";
import { useContainer } from "class-validator";
import { ErrorRepository } from "../features/administration/error.repository";
import { ConfigService } from "@nestjs/config";

export const appInitSettings = (app: INestApplication, port: number) => {
  const options = {
    origin: [
      `http://localhost:${port}`,
      `http://adjnatec.ru:${port}`,
      `http://adjnatec.ru:${port}/auth`,
      `https://adjnatec.ru:${port}`,
      `https://adjnatec.ru:${port}/auth`,
      `www.adjnatec.ru:${port}`,
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
      "Authorization",
    ],
  };
  app.enableCors(options);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: false,
    })
  );
  const errorRepository = app.get(ErrorRepository);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(errorRepository, configService));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
