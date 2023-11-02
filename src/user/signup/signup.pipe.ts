import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class SignupPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  transform(value: User, metadata: ArgumentMetadata) {
    try {
      this.userService.validatePassword(value);
      /* encode password */
      const encodedPassword = this.userService.encodingPassword(
        value.email,
        value.password,
      );
      value.password = encodedPassword;
      return value;
    } catch (error) {
      // console.log('catch', error);
      throw new BadRequestException(error.message);
    } finally {
    }
  }
}
