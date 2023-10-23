import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomLoggerService } from '@src/logger/logger.service';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLoggerService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    this.logger.debug('get user data', JSON.stringify(user, null, 2));
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };

    this.logger.debug('check value', email, password);
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
