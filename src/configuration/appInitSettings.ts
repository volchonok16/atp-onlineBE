import * as cookieParser from "cookie-parser";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "../common/exeptions/exeption.filter";
import { AppModule } from "../app.module";
import { useContainer } from "class-validator";
import { ErrorRepository } from "../features/administration/error.repository";

export const appInitSettings = (app: INestApplication) => {
  const options = {
    origin: [
      "http://localhost:3000",
      "http://adjnatec.ru:3000",
      "http://adjnatec.ru:3000/auth",
      "https://adjnatec.ru:3000",
      "https://adjnatec.ru:3000/auth",
      "www.adjnatec.ru:3000",
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
  app.useGlobalFilters(new AllExceptionsFilter(errorRepository));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
