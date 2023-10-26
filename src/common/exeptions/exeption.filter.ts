import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorRepository } from "../../features/administration/error.repository";
import { ErrorEntity } from "../../providers/postgres/entities";

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly errorRepository: ErrorRepository) {}

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status === 500) {
      const method = request.method;
      const path = request.url;
      const body = request.body;
      const params = request.params;
      const query = request.query;
      const req = { body, params, query };
      const error = ErrorEntity.create(method, path, JSON.stringify(req));
      await this.errorRepository.saveError(error);
      response.status(418).send("Something went wrong!");
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
