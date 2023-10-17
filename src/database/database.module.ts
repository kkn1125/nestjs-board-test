import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { typeOrmConfig, /* databaseProviders */ } from './database.providers';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders],
})
export class DatabaseModule {}
