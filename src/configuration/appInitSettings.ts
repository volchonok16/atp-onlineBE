import * as cookieParser from 'cookie-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../common/exeptions/exeption.filter';
import { AppModule } from '../app.module';
import { useContainer } from 'class-validator';

export const appInitSettings = (app: INestApplication) => {
  const options = {
    origin: '*',
    //origin: ['http://localhost:3000'], // Для локального запуска
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
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
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
};
