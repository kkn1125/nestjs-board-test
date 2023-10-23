import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { DataSource } from 'typeorm';
import { ApiResponseModule } from '@src/api.response/api.response.module';
import { LoggerModule } from '@src/logger/logger.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiResponseModule, LoggerModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get<DataSource>(DataSource); /* 추가된 코드 */

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/board (GET)', () => {
    it('resonse status', () => {
      return request(app.getHttpServer())
        .get('/board')
        .expect(200)
        .timeout(3000);
    });
    it('resonse data length', () => {
      return request(app.getHttpServer())
        .get('/board')
        .expect(200)
        .expect((res) => {
          return res.body.data.length === 3;
        });
    });
  });
});
