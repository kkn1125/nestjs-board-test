import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ApiResponseModule } from '@src/api.response/api.response.module';
import { LoggerModule } from '@src/logger/logger.module';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    LoggerModule,
    ApiResponseModule,
  ],
  controllers: [BoardController],
  providers: [BoardService, UserService],
})
export class BoardModule {}
