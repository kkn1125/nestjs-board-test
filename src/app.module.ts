import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';
import { ApiResponseModule } from './api.response/api.response.module';

@Module({
  imports: [HttpModule, DatabaseModule, BoardModule, ApiResponseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
