import { Injectable /* Logger */ } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { CustomLoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private logger: CustomLoggerService,
  ) {
    logger.setContext(BoardService.name);
  }

  // private readonly logger = new Logger(BoardService.name);
  // private readonly mylogger = new CustomLoggerService();

  findAll() {
    this.logger.log('test');
    this.logger.log('test2');
    return this.boardRepository.find({
      withDeleted: false,
    });
  }

  findOne(id: number) {
    return this.boardRepository.findOne({ where: { id } });
  }

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.insert(createBoardDto);
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
