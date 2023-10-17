import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, BoardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
