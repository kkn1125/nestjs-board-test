import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { CustomLoggerService } from '@src/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly apiResponse: ApiResponseService,
    private readonly logger: CustomLoggerService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let dto: CreateUserDto = null;
    const runner = this.userRepository.manager.connection.createQueryRunner();
    try {
      dto = await this.userRepository.save(createUserDto, {
        transaction: true,
      });
      await runner.commitTransaction();
    } catch (error) {
      await runner.rollbackTransaction();
    } finally {
      await runner.release();

      return this.apiResponse.data(dto).output();
    }
  }

  findAll() {
    this.logger.log('test findall in user' /* , this.hidePrivateOptions() */);
    return this.userRepository.find({
      select: this.hidePrivateOptions(),
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  hidePrivateOptions() {
    return Object.fromEntries([
      ['username', true],
      ['email', true],
      ['gender', true],
      ['birth', true],
      ['role', true],
    ]);
  }
}
