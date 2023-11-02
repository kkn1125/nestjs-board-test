import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponseService } from '@src/api.response/api.response.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    /* username field change from "username" to "email" */
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.signIn(email, password);
    if (!user) {
      ApiResponseService.UNAUTHORIZED('unauthorized exception.');
    }
    return user;
  }
}
