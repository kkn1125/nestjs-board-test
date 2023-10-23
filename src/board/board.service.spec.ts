import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiResponseModule } from '@src/api.response/api.response.module';
import { LoggerModule } from '@src/logger/logger.module';
import { User } from '@src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

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
  user: { id: 2 } as User,
};

const mockBoardRepository = () => ({
  insert: jest.fn().mockImplementation((dto: CreateBoardDto) =>
    Promise.resolve(
      boards.push({
        id: 3,
        title: dto.title,
        content: dto.content,
        author: 2,
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

describe('BoardService', () => {
  let service: BoardService;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiResponseModule, LoggerModule],
      providers: [
        BoardService,
        {
          provide: getRepositoryToken(Board),
          useValue: mockBoardRepository(),
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
    boardRepository = module.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
  });

  afterAll(() => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(boardRepository).toBeDefined();
  });

  it('test find', async () => {
    const boards = await service.findAll({ page: 1 });
    expect(boards.data.length).toStrictEqual(2);
  });

  it('test findOne', async () => {
    const board = await service.findOne(2);
    expect(board.title).toStrictEqual('test2');
  });

  it('test create', async () => {
    /* const board =  */ await service.create(createdData);
    const boards = await service.findAll({ page: 1 });
    const found = boards.data.find(
      (board) => board.title === createdData.title,
    );
    expect(found.id).toStrictEqual(3);
  });
});
