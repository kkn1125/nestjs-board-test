import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'boards',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};

// 사용 보류 2023-10-18 01:21:47
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(typeOrmConfig);

      return dataSource.initialize();
    },
  },
];
