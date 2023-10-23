import { Module } from '@nestjs/common';
import { ApiResponseService } from './api.response.service';

@Module({
  providers: [
    { provide: ApiResponseService, useValue: new ApiResponseService() },
  ],
  exports: [ApiResponseService],
})
export class ApiResponseModule {}
