import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly apiResponseSerevice: ApiResponseService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    const detail = exception.cause;

    const hasMessage =
      typeof message === 'object' && 'message' in (message as any);

    response.status(status).json(
      this.apiResponseSerevice.output({
        ok: status === 200 || status === 201,
        code: status,
        message: hasMessage ? message['message'] : message,
        detail: detail,
        // path: request.url,
        // timestamp: new Date().toISOString(),
      }),
    );
  }
}
