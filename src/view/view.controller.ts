import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '@src/logger/logger.service';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class ViewController {
  readonly BASE_PATH: { DEV: string; PROD: string } = {
    DEV: 'http://localhost:8000',
    PROD: path.join(path.resolve(), 'view/build'),
  };
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get('')
  async home(@Res({ passthrough: true }) res: Response) {
    const spa = fs.readFileSync(this.BASE_PATH.PROD + '/index.html', 'utf8');
    return spa;
  }

  @Get('assets/*')
  assets(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // console.log('url', req.url);
    const extensionDict = {
      css: 'text/css; charset=utf-8',
      json: 'application/json; charset=utf-8',
      js: 'text/javascript; charset=utf-8F',
    };

    const resource = fs.readFileSync(this.BASE_PATH.PROD + req.url);
    const extension = req.url.split(/\./).at(-1);
    res.setHeader('Content-Type', extensionDict[extension]);
    const content = resource.toString('utf8');
    return content;
    // return this.httpService.get(this.BASE_PATH.PROD + req.url);
  }
}
