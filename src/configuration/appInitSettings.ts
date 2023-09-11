import * as cookieParser from "cookie-parser";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "../common/exeptions/exeption.filter";
import { AppModule } from "../app.module";
import { useContainer } from "class-validator";

export const appInitSettings = (app: INestApplication) => {
    const options = {
        origin: ["http://localhost:3000", "http://adjnatech.ru:3000"],
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true,
        allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
            'Authorization',
        ]
    };
  app.enableCors(options);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      // This is a list of fields that are allowed to be left or used when validating
      // and filtering input. It specifies which fields can be "safely" included in
      // the data object and which should be excluded or ignored.
      whitelist: false,
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
