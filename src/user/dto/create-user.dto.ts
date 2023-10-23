import { IsIn, IsNotEmpty, Matches, Max, Min } from 'class-validator';

const GENDER_LIST = ['male', 'female', 'others', 'private'];

export class CreateUserDto {
  @IsNotEmpty()
  @Max(50)
  @Min(5)
  username: string;
  @IsNotEmpty()
  @Min(8)
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
}
