import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoggerModule } from '@src/logger/logger.module';
import { ApiResponseModule } from '@src/api.response/api.response.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ApiResponseModule, LoggerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
