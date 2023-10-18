import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
