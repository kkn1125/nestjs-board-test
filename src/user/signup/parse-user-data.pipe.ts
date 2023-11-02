import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { USER_ROLES } from '@src/role/role.enum';

@Injectable()
export class ParseUserDataPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  transform(value: User, metadata: ArgumentMetadata) {
    Object.entries(value).forEach(([key, val]) => {
      switch (key) {
        case 'birth':
        case 'created_at':
        case 'updated_at':
        case 'deleted_at':
        case 'last_sign_in':
          try {
            if (val.includes('-')) {
              value[key] = new Date(val);
            } else {
              value[key] = new Date(
                val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8),
              );
            }
          } catch (error) {
            throw new TypeError(`[${key} type] must be Date.`);
          }
          break;
        case 'signed_in':
          value[key] = new Function(`return ${val}`)() as boolean;
          break;
        case 'id':
        case 'fail_sign_in_count':
          try {
            value[key] = +val;
          } catch (error) {
            throw new TypeError(`[${key} type] must be number.`);
          }
          break;
        case 'role':
          try {
            if (!(val.toUpperCase() in USER_ROLES)) {
              throw new Error();
            }
            value[key] = USER_ROLES[val.toUpperCase()];
          } catch (error) {
            throw new TypeError(
              `[${key} type] must be ${Object.values(USER_ROLES)}.`,
            );
          }
          break;
        default:
          break;
      }
    });
    // value.password = encodedPassword;
    return value;
  }
}
