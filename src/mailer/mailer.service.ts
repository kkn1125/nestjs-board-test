import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { UserService } from '@src/user/user.service';
import * as mailer from 'nodemailer';
import * as cryptoJS from 'crypto-js';

type CheckMailType = {
  email: string;
  token: string;
  time: number;
  resolver: (value: boolean) => void;
  used: boolean;
};

const checkMailMap = new Map<string, CheckMailType>();

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

    checkMailMap.set(token.replace(/=+/g, ''), {
      email,
      token,
      time: sendTime,
      resolver,
      used: false,
    });

    const checkMailLink = `http://localhost:5000/api/mailer/check?q=${encodeURIComponent(
      `tkn=${token}&e=${email}`,
    )}`;

    const result = await transforter.sendMail({
      from: `${smtpFromName} <${smtpFromEmail}>`,
      to: `${email}`,
      subject: '본인인증 메일',
      // text: '헬로 월드?',
      html: `
        <h3>본인에 의한 메일 발송이 아니라면 아래 문의처로 연락주세요.</h3>
        <div>
          <a href="${checkMailLink}">click this link.</a>
        </div>
        <div>
          문의처: 02-1231-1231
        </div>
      `,
    });

    // console.log('result', result);
    // console.log('Messagee sent: %s', result.messageId);

    if (result.accepted.length > 0) {
      console.log(`success send mail to ${email}`);
    } else {
      ApiResponseService.NOT_FOUND('email is not exists!', email);
    }

    await promise;

    transforter.close();

    return result;
  }

  async checkEncryptMessage(queryParams: URLSearchParams) {
    const token = queryParams.get('tkn');
    const email = queryParams.get('e');
    const EXPIRED_TIME = 1000 * 30;
    const NOW = +new Date();
    const tokenInfo = checkMailMap.get(token);
    // const emailInfo = checkMailMap.get(token);
    let tokenStack = null;
    let flag: string = '';

    for (let i = EXPIRED_TIME; i >= 0; i -= 1000) {
      const compareToken = this.makeToken(
        email,
        Math.floor(NOW / 1000) * 1000 - i,
      );
      if (compareToken === token) {
        console.log('token matched!');
        tokenStack = compareToken;
        break;
      }
    }
    const hasTokenInServer = checkMailMap.has(token);
    const availableToken = checkMailMap.has(tokenStack);

    if (hasTokenInServer) {
      if (tokenInfo.used) {
        console.log('already used token');
        flag = 'already used';
      } else if (availableToken) {
        const { email, token, time, resolver } = tokenInfo;

        console.log('token is matched!');
        const user = await this.userService.findOneByEmail(email);

        if (user) {
          console.log('found user!');
          resolver(true);
          flag = 'success';
          checkMailMap.set(token, Object.assign(tokenInfo, { used: true }));
        } else {
          flag = 'not found user';
        }
      } else {
        // token expired
        const { time } = tokenInfo;
        const isExpired = NOW - time > EXPIRED_TIME;
        if (isExpired) {
          flag = 'expired';
        } else {
          flag = 'invalid token format';
        }
      }
    } else {
      flag = 'token no exists';
    }

    /* initialize */
    // checkMailMap.delete(token);
    return flag;
  }

  makeToken(email: string, sendTime: number) {
    return cryptoJS
      .HmacSHA256(
        'check:' +
          email +
          '|' +
          Math.floor(sendTime / 1000) * 1000 +
          '|' +
          'localhost:5000',
        this.configService.get<string>('mailer.privkey'),
      )
      .toString();
  }
}
