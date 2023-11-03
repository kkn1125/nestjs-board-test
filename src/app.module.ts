import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BoardModule } from './board/board.module';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './libs/config/database.config';
import jwtConfig from './libs/config/jwt.config';
import privkeyConfig from './libs/config/privkey.config';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ViewModule } from './view/view.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [databaseConfig, jwtConfig, privkeyConfig],
    }),
    HttpModule.register({
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
      },
    }),
    DatabaseModule,
    AuthModule,
    BoardModule,
    UserModule,
    RoleModule,
    ViewModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
