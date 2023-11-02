import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '@src/logger/logger.service';

@Injectable()
export class ViewService {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly configService: ConfigService,
  ) {}
}
