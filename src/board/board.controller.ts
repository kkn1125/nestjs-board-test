import {
  Body,
  Controller,
  Delete,
  Get,
  // Patch,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
// import { AuthGuard } from '@nestjs/passport';
import { CustomLoggerService } from '@src/logger/logger.service';
import { UserService } from '@src/user/user.service';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly logger: CustomLoggerService,
  ) {
    logger.setContext(BoardController.name);
  }

  @Get()
  findAll(@Query('page') page: number) {
    const boards = this.boardService.findAll({
      page,
    });
    return boards;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body(new ValidationPipe({ stopAtFirstError: true, groups: ['create'] }))
    createBoardDto: CreateBoardDto,
  ) {
    console.log(req.user, createBoardDto);
    createBoardDto.user = await this.userService.findOne(req.user.sub);
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
