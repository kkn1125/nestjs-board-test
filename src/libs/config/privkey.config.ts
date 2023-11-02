import { registerAs } from '@nestjs/config';

export default registerAs('privkey', () => ({
  encode: process.env.ENCODE_PRIVKEY,
}));
