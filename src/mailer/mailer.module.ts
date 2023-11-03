import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { LoggerModule } from '@src/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import mailerConfig from './mailer.config';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [mailerConfig],
    }),
    LoggerModule,
    UserModule,
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
