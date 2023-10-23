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
    private readonly boardRepository: Repository<User>,
    private readonly apiResponse: ApiResponseService,
    private readonly logger: CustomLoggerService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let dto: CreateUserDto = null;
    const runner = this.boardRepository.manager.connection.createQueryRunner();
    try {
      dto = await this.boardRepository.save(createUserDto, {
        transaction: true,
      });
      await runner.commitTransaction();
    } catch (error) {
      await runner.rollbackTransaction();
    } finally {
      await runner.release();

      return this.apiResponse.data(dto).out();
    }
  }

  findAll() {
    this.logger.log('test findall in user');
    return this.boardRepository.find();
  }

  findOne(id: number) {
    return this.boardRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.boardRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
