import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { UserService } from '@src/user/user.service';
import * as mailer from 'nodemailer';
import * as cryptoJS from 'crypto-js';

const checkMailMap = new Map<
  string,
  {
    email: string;
    token: string;
    time: number;
    resolver: (value: unknown) => void;
  }
>();

@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async sendEmail(email: string) {
    let resolver: (value: unknown) => void;
    const promise = new Promise((resolve) => (resolver = resolve));
    const smtp = this.configService.get<string>('mailer.smtp');
    const smtpId = this.configService.get<string>('mailer.smtp_id');
    const smtpPw = this.configService.get<string>('mailer.smtp_pw');
    const smtpSsl = this.configService.get<string>('mailer.smtp_ssl');
    const smtpPort = this.configService.get<string>('mailer.smtp_port');
    const smtpFromName = this.configService.get<string>(
      'mailer.smtp_from_name',
    );
    const smtpFromEmail = this.configService.get<string>(
      'mailer.smtp_from_email',
    );

    const transforter = mailer.createTransport({
      // service: 'gmail',
      host: smtp,
      port: +smtpPort,
      auth: {
        user: smtpId,
        pass: smtpPw,
      },
      secure: false,
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2',
      },
    });

    const sendTime = +new Date();
    const token = this.makeToken(email, sendTime);
    // console.log(token);

    checkMailMap.set(token, { email, token, time: sendTime, resolver });

    const checkMailLink = `http://localhost:5000/api/mailer/check?q=${encodeURIComponent(
      token,
    )}`;

    const result = await transforter.sendMail({
      from: `${smtpFromName} <${smtpFromEmail}>`,
      to: `${email + 'qqq'}`,
      subject: '테스트 메일 서비스',
      // text: '헬로 월드?',
      html: `
        <h3>hello world!</h3>
        <div>
          <a href="${checkMailLink}">click this link.</a>
        </div>
      `,
    });

    // console.log('result', result);
    // console.log('Messagee sent: %s', result.messageId);

    if (result.accepted.length > 0) {
      console.log(`success send mail to ${email}`);
    } else {
      ApiResponseService.NOT_FOUND('email is not exists!', email + 'qqq');
    }

    await promise;
    return result;
  }

  async checkEncryptMessage(token: string) {
    const EXPIRED_TIME = 1000 * 10;
    const NOW = +new Date();
    const hasTokenInStore = checkMailMap.has(token);
    const tokenInfo = checkMailMap.get(token);

    if (hasTokenInStore) {
      const { email, token, time, resolver } = tokenInfo;

      const isExpired = NOW - time > EXPIRED_TIME;
      if (isExpired) {
        /* initialize */
        checkMailMap.delete(token);
        return 'expired';
      }

      // console.log('token is matched!');
      // console.log('checkMailMap', checkMailMap);
      const user = await this.userService.findOneByEmail(email);

      if (user) {
        console.log('found user!');
        /* initialize */
        checkMailMap.delete(token);
        resolver(true);
      } else {
        // ApiResponseService.NOT_FOUND('user not found.');
        /* initialize */
        checkMailMap.delete(token);
        return 'no exists';
      }
    } else {
      // ApiResponseService.FORBIDDEN('wrong token. token is not exists!');
      return 'token no exists';
    }
    // return tokenInfo.email;
    return 'success';
  }

  makeToken(email: string, sendTime: number) {
    return cryptoJS
      .HmacSHA256(
        'check:' + email + '|' + sendTime + '|' + 'localhost:5000',
        this.configService.get<string>('mailer.privkey'),
      )
      .toString();
  }
}
