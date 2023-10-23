import { Board } from '@src/board/entities/board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  gender: string;

  @Column()
  birth: Date;

  @Column()
  signed_in: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  deleted_at: string;

  @Column()
  last_sign_in: string;

  @Column()
  fail_sign_in_count: number;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];
}
