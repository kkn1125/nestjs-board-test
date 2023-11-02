import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { globalConstants } from '@src/global/global.constants';
import { CustomLoggerService } from '@src/logger/logger.service';
import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
  private readonly TRY_SIGN_IN_FAIL_LIMIT_COUNT: number = 5;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email, true);
    console.log(user);
    if (user === null) {
      ApiResponseService.NOT_FOUND('not found user.');
    }

    const encodedPassword = this.userService.comparePassword(
      user.password,
      email,
      password,
    );

    if (user.fail_sign_in_count > this.TRY_SIGN_IN_FAIL_LIMIT_COUNT) {
      ApiResponseService.BAD_REQUEST(
        'You have exceeded the maximum number of login attempts. Please try again later.',
      );
    } else {
      if (encodedPassword === false) {
        const triedCount = user.fail_sign_in_count + 1;
        const result = await this.userService.update(user.id, {
          fail_sign_in_count: triedCount,
        });
        if (result === null) {
          ApiResponseService.BAD_REQUEST('fail update user info.');
        }
        ApiResponseService.BAD_REQUEST(
          'Incorrect email or password. You have n attempts left. Please try again.',
          this.TRY_SIGN_IN_FAIL_LIMIT_COUNT - triedCount,
        );
      }
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      last_sign_in: user.last_sign_in,
    };

    const result = await this.userService.update(user.id, {
      signed_in: true,
      fail_sign_in_count: 0,
      last_sign_in: new Date(),
    });

    if (result === null) {
      ApiResponseService.BAD_REQUEST('fail update user info.');
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    if (user !== null) {
      delete user['password'];
    }

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signOut(token: string) {
    try {
      const verified = this.jwtService.verify(token, {
        ignoreExpiration: true,
        secret: this.configService.get<string>('jwt.secret'),
      });
      return verified;
    } catch (error) {
      ApiResponseService.UNAUTHORIZED('token invalid');
    }
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.userService.findOneByEmail(email, true);
  //   user && delete user['password'];
  //   this.logger.debug('get user data', JSON.stringify(user, null, 2), '');
  //   if (!user) {
  //     ApiResponseService.NOT_FOUND('user not found.');
  //   }

  //   const encodedPassword = this.userService.comparePassword(
  //     user.password,
  //     email,
  //     password,
  //   );

  //   if (!encodedPassword) {
  //     return null;
  //   }
  //   return user;
  // }
}
