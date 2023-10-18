import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLoggerService));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     // skipMissingProperties: true,
  //     // exceptionFactory: (errors) => {
  //     //   const result = errors.map((error) => ({
  //     //     property: error.property,
  //     //     message: error.constraints[Object.keys(error.constraints)[0]],
  //     //   }));
  //     //   return new BadRequestException(result);
  //     // },
  //     stopAtFirstError: true,
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
