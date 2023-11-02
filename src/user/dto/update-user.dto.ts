import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { globalConstants } from '@src/global/global.constants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  fail_sign_in_count?: number;

  @IsBoolean()
  signed_in?: boolean;

  @IsString()
  @Transform((value) =>
    globalConstants.features.getDateString(value as unknown as Date),
  )
  last_sign_in?: Date;
}
