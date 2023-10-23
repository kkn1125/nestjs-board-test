import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DatabaseConfigurationService } from './database.configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigurationService,
    }),
  ],
})
export class DatabaseModule {}
