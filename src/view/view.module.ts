import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { LoggerModule } from '@src/logger/logger.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, LoggerModule],
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
