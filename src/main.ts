import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/logger.service';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT', 5000);
  const logger = app.get(CustomLoggerService);
  app.setGlobalPrefix('api');
  app.useLogger(logger);

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

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://kkn1125.github.io',
    ],
  });

  await app.listen(port);

  logger.log('server listening on port ' + port);
}
bootstrap();
