import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseFormInterceptor implements NestInterceptor {
  constructor(private readonly apiResponseService: ApiResponseService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    const excludePaths = ['/api'];
    const isExcludedPath = !excludePaths.some((paths) =>
      ctx.getRequest().route.path.startsWith(paths),
    );

    if (isExcludedPath) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) =>
        this.apiResponseService.output({
          ok: response.statusCode === 200 || response.statusCode === 201,
          code: response.statusCode,
          data,
        }),
      ),
    );
  }
}
