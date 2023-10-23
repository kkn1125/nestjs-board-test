import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiResponseModule } from '@src/api.response/api.response.module';
import { LoggerModule } from '@src/logger/logger.module';
import { Repository } from 'typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
// import { ApiResponseModule } from '@/api.response/api.response.module';

const boards = [
  {
    id: 1,
    title: 'test1',
    content: 'test content',
    author: 1,
    deleted_at: null,
    created_at: '2023-10-23 12:53',
    updated_at: '2023-10-23 12:53',
  },
  {
    id: 2,
    title: 'test2',
    content: 'test2 content',
    author: 1,
    deleted_at: null,
    created_at: '2023-10-23 12:53',
    updated_at: '2023-10-23 12:53',
  },
];

const createdData = {
  title: 'test3',
  content: 'test3 content',
  author: 2,
};

const boardProvideValues = () => ({
  insert: jest.fn().mockImplementation((dto: CreateBoardDto) =>
    Promise.resolve(
      boards.push({
        id: 3,
        title: dto.title,
        content: dto.content,
        author: dto.user.id,
        deleted_at: null,
        created_at: '2023-10-23 12:53',
        updated_at: '2023-10-23 12:53',
      }),
    ),
  ),
  save: jest.fn(),
  find: jest.fn().mockResolvedValue(boards),
  findOne: jest
    .fn()
    .mockImplementation((id: { where: { id: number } }) =>
      Promise.resolve(boards.find((board) => board.id === id.where.id)),
    ),
  softDelete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BoardController', () => {
  let controller: BoardController;
  let service: BoardService;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiResponseModule, LoggerModule],
      controllers: [BoardController],
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useValue: boardProvideValues(),
        },
      ],
    }).compile();

    controller = module.get<BoardController>(BoardController);
    service = module.get<BoardService>(BoardService);
    boardRepository = module.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
    // app = module.createNestApplication();
    // const connection = app.get(Connection);
  });

  afterEach(async () => {});

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(boardRepository).toBeDefined();
  });

  it('findAll', async () => {
    const response = await controller.findAll(1);
    expect(await controller.findAll(1)).toStrictEqual(response);
  });
});
