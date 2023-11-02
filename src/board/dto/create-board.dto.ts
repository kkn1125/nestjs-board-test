import { User } from '@src/user/entities/user.entity';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  // groups를 사용하려면 글로벌 pipe설정을 포기해야 함.
  // 때문에 각 단위별로 사용해야하는 번거로움이 있음.
  // 단, 그룹을 포기한다면 일괄처리 가능
  // 그룹 대체제로 custom validator 제작해서 분기분, validate메서드 등
  // 대체 가능
  @MinLength(1)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  author: number;

  @IsNumber()
  sequence: number;

  user: User;
}
