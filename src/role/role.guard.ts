import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.decorator';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector?: Reflector,
    private readonly jwtService?: JwtService,
    private readonly configService?: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // return true;
    const roles = this.reflector.get(Role, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwt.secret'),
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    const user = request.user || {};
    // console.log('user', user);
    return matchRoles(roles, user.role);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

function matchRoles(roles: any, roles1: any): boolean {
  return roles.includes(roles1);
  // throw new Error('Function not implemented.');
}
