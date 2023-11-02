import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

type ApiResponse = {
  ok?: boolean;
  code?: number;
  data?: any;
  message?: string;
  detail?: string | string[];
};

@Injectable()
export class ApiResponseService {
  output(data?: any) {
    if ('message' in data) {
      return {
        ok: data.ok ?? true,
        code: data.code || 200,
        message: data.message || '',
        detail: data.detail,
      };
    } else {
      return {
        ok: data.ok ?? true,
        code: data.code || 200,
        data: data.data,
      };
    }
  }

  static NOT_FOUND(
    message: string,
    details?: string | number | (string | number)[],
  ) {
    throw new HttpException(message, HttpStatus.NOT_FOUND, {
      cause: details,
    });
  }

  static BAD_REQUEST(
    message: string,
    details?: string | number | (string | number)[],
  ) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST, {
      cause: details,
    });
  }

  static UNAUTHORIZED(
    message: string,
    details?: string | number | (string | number)[],
  ) {
    throw new UnauthorizedException(message, {
      cause: details,
    });
  }
}
