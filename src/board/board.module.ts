import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
// import { DatabaseModule } from 'src/database/database.module';
import { BoardController } from './board.controller';
// import { boardProviders } from './board.providers';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [/* DatabaseModule, */ TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [/* ...boardProviders, */ BoardService],
})
export class BoardModule {}
