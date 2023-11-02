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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseService } from '@src/api.response/api.response.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { CustomLoggerService } from '@src/logger/logger.service';
import { Role } from '@src/role/role.decorator';
import { RoleGuard } from '@src/role/role.guard';
import { UserService } from '@src/user/user.service';
import { BoardPipe } from './board.pipe';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@ApiTags('게시판 API')
@Controller('board')
export class BoardController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly logger: CustomLoggerService,
  ) {
    logger.setContext(BoardController.name);
  }

  @ApiOperation({
    summary: '게시판 전체 조회',
    description: '게시판 전체를 조회한다.',
  })
  @ApiOkResponse({
    status: '2XX',
    type: Board,
  })
  @Get()
  // @Role(['user', 'admin'])
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

  // @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async create(
    @Request() req,
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        transform: true,
        skipMissingProperties: true,
      }),
    )
    createBoardDto: CreateBoardDto,
  ) {
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
