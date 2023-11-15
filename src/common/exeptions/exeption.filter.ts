import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorRepository } from "../../features/administration/error.repository";
import { ErrorEntity } from "../../providers/postgres/entities";
import { ConfigService } from "@nestjs/config";
import { EnvironmentEnum } from "../enums/environment.enum";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(
    private readonly errorRepository: ErrorRepository,
    private readonly configService: ConfigService
  ) {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const { method, params, body, query, url: path } = request;
      const req = { body, params, query };
      const errorMessage = exception.toString();
      const errorInfo = exception.stack;

      const error = ErrorEntity.create(
        method,
        path,
        JSON.stringify(req),
        errorMessage,
        errorInfo
      );
      await this.errorRepository.saveError(error);
      this.logger.error(`request method: ${method} request url: ${path}`, {
        errorMessage,
        errorInfo,
      });

      if (this.configService.get("NODE_ENV") === EnvironmentEnum.Development) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          errorMessage,
          errorInfo,
        });
      } else {
        response.status(HttpStatus.I_AM_A_TEAPOT).send("Something went wrong!");
      }
      return;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.getResponse(),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
