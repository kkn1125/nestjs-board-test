import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ApiResponseModule } from 'src/api.response/api.response.module';
// import { ApiResponseService } from 'src/api.response/api.response.service';
import { LoggerModule } from 'src/logger/logger.module';
// import { DatabaseModule } from 'src/database/database.module';
import { BoardController } from './board.controller';
// import { boardProviders } from './board.providers';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    /* DatabaseModule, */ TypeOrmModule.forFeature([Board]),
    LoggerModule,
    ApiResponseModule,
  ],
  controllers: [BoardController],
  providers: [
    /* ...boardProviders, */ BoardService,
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class BoardModule {}
