import { USER_ROLES } from '@src/role/role.enum';
import {
  IsIn,
  IsNotEmpty,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { User } from '../entities/user.entity';

const GENDER_LIST = ['male', 'female', 'others', 'private'];

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(/\d{2,3}-\d{3,4}-\d{3,4}/g, {
    message: 'phone number is invalid format.',
  })
  phone_number: string;

  @IsNotEmpty()
  @IsIn(GENDER_LIST, {
    message: `You can only select either ${GENDER_LIST.join(' or ')}`,
  })
  gender: string;

  @IsNotEmpty()
  birth: Date;

  @IsIn(Object.values(USER_ROLES))
  role: USER_ROLES;
}
