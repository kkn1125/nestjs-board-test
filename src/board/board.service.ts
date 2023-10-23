import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { CustomLoggerService } from '@src/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  private readonly LIMIT: number = 3;

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly apiResponse: ApiResponseService,
    private readonly logger: CustomLoggerService,
  ) {
    // logger.setContext(BoardService.name);
  }

  // private readonly logger = new Logger(BoardService.name);
  // private readonly mylogger = new CustomLoggerService();

  async findAll({ page = 1 }: { page?: number }) {
    // this.logger.log('test', page);
    // console.log(this.apiResponse);
    const boards = await this.boardRepository.find({
      withDeleted: false,
      skip: (page - 1) * this.LIMIT,
      take: this.LIMIT,
    });
    return this.apiResponse.data(boards).output();
  }

  findOne(id: number) {
    return this.boardRepository.findOne({ where: { id } });
  }

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.update(id, updateBoardDto);
  }

  remove(id: number) {
    return this.boardRepository.softDelete({ id });
  }

  restore(id: number) {
    return this.boardRepository.restore({ id });
  }
}
