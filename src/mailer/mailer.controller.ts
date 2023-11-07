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

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  // @UseGuards(AuthGuard)
  @Post('confirm')
  async emailConfirm(@Body('email') email: string) {
    // return this.mailerService.sendEmail(req.user.email);
    return this.mailerService.sendEmail(email);
  }

  @Get('check')
  async checkEncryptMessage(@Res() res: Response, @Query('q') q: string) {
    const token = decodeURIComponent(q);
    res.contentType('text/html');
    const isCheckSuccessed =
      await this.mailerService.checkEncryptMessage(token);
    switch (isCheckSuccessed) {
      case 'success':
        res.send(`
          <script>
            function closing(){
              window.close();
            }
          </script>
          <h3>✅ Check Success!</h3>
          <h5>인증이 완료되었습니다. 아래 닫기를 눌러 창을 닫아주세요.</h5>
          <div>
            <a href="javascript:void" onclick="closing()">닫기</a>
          </div>
        `);
        break;
      case 'token no exists':
        res.send(`
          <script>
            function closing(){
              window.close();
            }
          </script>
          <h3>❌ Check Fail!</h3>
          <h5>token invalid</h5>
          <div>
            <a href="javascript:void" onclick="closing()">닫기</a>
          </div>
        `);
        break;
      case 'expired':
        res.send(`
          <script>
            function closing(){
              window.close();
            }
          </script>
          <h3>✅ Check Fail!</h3>
          <h5>check time expired</h5>
          <div>
            <a href="javascript:void" onclick="closing()">닫기</a>
          </div>
        `);
        break;
      case 'no exists':
        res.send(`
          <script>
            function closing(){
              window.close();
            }
          </script>
          <h3>✅ Check Fail!</h3>
          <h5>no exists email in db!</h5>
          <div>
            <a href="javascript:void" onclick="closing()">닫기</a>
          </div>
        `);
        break;
      default:
        break;
    }
  }
}
