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
  private readonly LIMIT: number = 10;

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
    const boards = await this.boardRepository.find({
      skip: (page - 1) * this.LIMIT,
      take: this.LIMIT,
    });
    return boards;
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (board) {
      return board;
    } else {
      ApiResponseService.NOT_FOUND('not found board.', +id);
    }
  }

  async create(createBoardDto: CreateBoardDto) {
    const qr = this.boardRepository.manager.connection.createQueryRunner();
    let dto: CreateBoardDto;
    await qr.startTransaction();
    try {
      console.log(createBoardDto);
      dto = await this.boardRepository.save(createBoardDto, {
        transaction: true,
      });
      await qr.commitTransaction();
      await qr.release();
      return dto;
    } catch (error) {
      console.log('rollback!', error);
      await qr.rollbackTransaction();
      await qr.release();
      ApiResponseService.BAD_REQUEST('board create was rollback.');
    }
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
