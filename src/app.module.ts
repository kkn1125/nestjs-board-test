import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [databaseConfig, jwtConfig],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
