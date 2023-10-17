// import { DataSource } from 'typeorm';
import { DataSource } from 'typeorm/data-source';
import { Board } from './entities/board.entity';

export const boardProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: async (dataSource: DataSource) =>
    dataSource.getRepository(Board),
    // useValue: Board.getRepository,
    inject: ['DATA_SOURCE'],
  },
];
