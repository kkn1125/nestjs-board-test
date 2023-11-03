import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  smtp: process.env.SMTP,
  smtp_id: process.env.SMTP_ID,
  smtp_pw: process.env.SMTP_PW,
  smtp_ssl: process.env.SMTP_SSL === 'true',
  smtp_port: process.env.SMTP_PORT,
  smtp_from_name: process.env.SMTP_FROM_NAME,
  smtp_from_email: process.env.SMTP_FROM_EMAIL,
  privkey: process.env.SMTP_PRIVKEY,
}));
