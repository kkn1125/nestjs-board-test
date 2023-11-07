import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { MailerService } from './mailer.service';
import { Response } from 'express';
import { MailerPage } from './mailer.page';

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailerPage: MailerPage,
  ) {}

  // @UseGuards(AuthGuard)
  @Post('confirm')
  async emailConfirm(@Body('email') email: string) {
    // return this.mailerService.sendEmail(req.user.email);
    return this.mailerService.sendEmail(email);
  }

  @Get('check')
  async checkEncryptMessage(@Res() res: Response, @Query('q') q: string) {
    const tokenQuery = decodeURIComponent(q);
    const tokenParams = new URLSearchParams(tokenQuery);
    res.contentType('text/html');
    const isCheckSuccessed =
      await this.mailerService.checkEncryptMessage(tokenParams);
    res.send(this.mailerPage.output(isCheckSuccessed));
  }
}
