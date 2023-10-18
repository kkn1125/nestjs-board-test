import {
  Body,
  Controller,
  Delete,
  Get,
  // Patch,
  Param,
  Post,
  Put, ValidationPipe
} from '@nestjs/common';
import { CustomLoggerService } from 'src/logger/logger.service';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
// import { UpdateBoardDto } from './dto/update-board.dto';

// class CustomPipe extends ValidationPipe {
//   exceptionFactory = (errors) => {
//     console.log('errors', errors);
//     return new BadRequestException(errors);
//   };
// }

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private logger: CustomLoggerService,
  ) {
    logger.setContext(BoardController.name);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Post()
  create(@Body(new ValidationPipe({ stopAtFirstError: true,groups: ['create'] })) createBoardDto: CreateBoardDto) {
    this.logger.debug('test');
    return this.boardService.create(createBoardDto);
  }

  @Post('restore/:id')
  resotre(@Param('id') id: string) {
    return this.boardService.restore(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
