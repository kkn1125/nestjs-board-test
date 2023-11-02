import * as CryptoJS from 'crypto-js';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { CustomLoggerService } from '@src/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: CustomLoggerService,
    private readonly configService: ConfigService,
  ) {}

  findAll() {
    this.logger.log('test findall in user' /* , this.hidePrivateOptions() */);
    return this.userRepository.find({
      select: this.hidePrivateOptions(),
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: this.hidePrivateOptions(),
    });
    if (user) {
      return user;
    } else {
      ApiResponseService.NOT_FOUND('not found user.', +id);
    }
  }

  findOneByEmail(email: string, force: boolean = false) {
    return this.userRepository.findOne({
      where: { email },
      ...(!force && { select: this.hidePrivateOptions() }),
    });
  }

  async create(createUserDto: CreateUserDto) {
    const qr = this.userRepository.manager.connection.createQueryRunner();
    await qr.startTransaction();
    try {
      const dto = await this.userRepository.save(createUserDto, {
        transaction: true,
      });
      await qr.commitTransaction();
      await qr.release();
      return dto;
    } catch (error) {
      await qr.rollbackTransaction();
      await qr.release();
      ApiResponseService.BAD_REQUEST('user create was rollback.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const qr = this.userRepository.manager.connection.createQueryRunner();
    await qr.startTransaction();
    try {
      const dto = await this.userRepository.update(id, updateUserDto);
      await qr.commitTransaction();
      await qr.release();
      return dto;
    } catch (error) {
      await qr.rollbackTransaction();
      await qr.release();
      return null;
    }
  }

  remove(id: number) {
    return this.userRepository.softDelete({ id });
  }

  restore(id: number) {
    return this.userRepository.restore({ id });
  }

  hidePrivateOptions() {
    return Object.fromEntries([
      ['id', true],
      ['username', true],
      ['email', true],
      ['gender', true],
      ['birth', true],
      ['role', true],
      // ['deleted_at', true],
    ]);
  }

  validateFormEmail() {}

  validateFormPhoneNumber() {}

  validatePassword(user: User) {
    const originPassword = user.password;
    const isMin = originPassword.length >= 8;
    const isMax = originPassword.length <= 20;
    const isIncludeUsername = originPassword.includes(user.username);
    const isIncludeBirth = originPassword.includes(
      user.birth
        .toLocaleDateString('ko')
        .slice(0, -1)
        .replace(/\.\s/g, '-')
        .replace(/\-+/g, ''),
    );

    if (isMin === false) {
      throw new ReferenceError('password must be longer than or equal to 8.');
    }
    if (isMax === false) {
      throw new ReferenceError('password must be lower than or equal to 20.');
    }
    if (isIncludeUsername === true) {
      throw new ReferenceError('password must be not include username.');
    }
    if (isIncludeBirth === true) {
      throw new ReferenceError('password must be not include user birth.');
    }

    /* find duplicate specified word in password */
    for (let i = 0; i < originPassword.length ** 2; i++) {
      const moveIndex = i % originPassword.length;
      const moveLimit = Math.floor(i / originPassword.length);
      const wordRange = originPassword.slice(moveIndex, moveIndex + moveLimit);
      if (wordRange.length < 4) continue;
      if (
        originPassword.indexOf(wordRange) !==
        originPassword.lastIndexOf(wordRange)
      )
        throw new ReferenceError(
          'password must be not duplicated specified word that length must be longer than 4.',
        );
      // return false;
    }
  }

  encodingPassword(email: string, password: string) {
    const encodeKey = this.configService.get('privkey.encode');
    return CryptoJS.HmacSHA256(password + '|' + email, encodeKey).toString();
  }

  comparePassword(originPassword: string, email: string, password: string) {
    const encoded = this.encodingPassword(email, password);
    return originPassword === encoded;
  }
}
