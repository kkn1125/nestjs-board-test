import { USER_ROLES } from '@src/role/role.enum';
import {
  IsIn,
  IsNotEmpty,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

const GENDER_LIST = ['male', 'female', 'others', 'private'];

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(5)
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Matches(/\d{2,3}-\d{3,4}-\d{3,4}/g, {
    message: 'phone number is not valid.',
  })
  phone_number: string;
  @IsNotEmpty()
  @IsIn(GENDER_LIST, {
    message: `You can only select either ${GENDER_LIST.join(' or ')}`,
  })
  gender: string;
  @IsNotEmpty()
  birth: string;
  @IsIn(Object.values(USER_ROLES))
  role: USER_ROLES;
}
