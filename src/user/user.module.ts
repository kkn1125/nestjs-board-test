import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiResponseModule } from '@src/api.response/api.response.module';
import { LoggerModule } from '@src/logger/logger.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    // DatabaseModule,
    TypeOrmModule.forFeature([User]),
    ApiResponseModule,
    LoggerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
