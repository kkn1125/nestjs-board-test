import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BoardModule } from './board/board.module';
import { CustomLoggerService } from './logger/logger.service';
import { UserService } from './user/user.service';
import { ResponseFormInterceptor } from './user/response-form/response-form.interceptor';
import { ApiResponseService } from './api.response/api.response.service';
import { HttpExceptionFilter } from './libs/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT', 5000);
  const logger = new ConsoleLogger('System');
  // const logger = app.get(CustomLoggerService);

  app.setGlobalPrefix('api', {
    exclude: ['/', '/assets/*', '@vite/*', '@react-refresh', 'src/*'],
  });
  app.useGlobalFilters(
    new HttpExceptionFilter(app.get<ApiResponseService>(ApiResponseService)),
  );
  app.useGlobalInterceptors(
    new ResponseFormInterceptor(
      app.get<ApiResponseService>(ApiResponseService),
    ),
  );

  const config = new DocumentBuilder()
    .setTitle('board domain')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('board', 'board tag')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [BoardModule],
  });
  SwaggerModule.setup('docs', app, document);

  // app.useLogger(logger);

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
      'http://localhost:8000',
      'https://kkn1125.github.io',
    ],
  });

  await app.listen(port);

  logger.log('server listening on port ' + port);
}
bootstrap();
