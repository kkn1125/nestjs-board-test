import { User } from '@src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeleteDateColumn } from 'typeorm/decorator/columns/DeleteDateColumn';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: number;

  @DeleteDateColumn()
  deleted_at: string;

  @ManyToOne(() => User, (user) => user.boards, {
    cascade: true,
  })
  @JoinColumn({
    name: 'author',
  })
  user: User;
}
